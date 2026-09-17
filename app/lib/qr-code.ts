// Pure TypeScript QR-code matrix generator (Byte mode, ECC level M).
// No external packages — generates a boolean[][] ready for SVG rendering.

interface QRConfig {
  size: number;
  totalBytes: number;
  dataBytes: number;
  ecBytes: number;
  alignPos: number[];
}

const CONFIGS: QRConfig[] = [
  { size: 25, totalBytes: 44,  dataBytes: 28,  ecBytes: 16, alignPos: [6, 18] },
  { size: 29, totalBytes: 70,  dataBytes: 44,  ecBytes: 26, alignPos: [6, 22] },
  { size: 33, totalBytes: 100, dataBytes: 64,  ecBytes: 36, alignPos: [6, 26] },
  { size: 37, totalBytes: 134, dataBytes: 86,  ecBytes: 48, alignPos: [6, 30] },
  { size: 41, totalBytes: 172, dataBytes: 108, ecBytes: 64, alignPos: [6, 34] },
];

// Galois-field tables
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(function buildGF() {
  let v = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = v; EXP[i + 255] = v; LOG[v] = i;
    v = (v << 1) ^ (v & 0x80 ? 0x11d : 0);
  }
})();

function gfMul(a: number, b: number): number {
  return a && b ? EXP[LOG[a] + LOG[b]] : 0;
}

function rsGenerator(n: number): Uint8Array {
  let p = new Uint8Array([1]);
  for (let i = 0; i < n; i++) {
    const f = new Uint8Array([1, EXP[i]]);
    const q = new Uint8Array(p.length + 1);
    for (let j = 0; j < p.length; j++) {
      for (let k = 0; k < f.length; k++) {
        q[j + k] ^= gfMul(p[j], f[k]);
      }
    }
    p = q;
  }
  return p;
}

function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = rsGenerator(ecCount);
  const buf = new Uint8Array(data.length + ecCount);
  buf.set(data);
  for (let i = 0; i < data.length; i++) {
    const c = buf[i];
    if (c) for (let j = 0; j < gen.length; j++) buf[i + j] ^= gfMul(gen[j], c);
  }
  return buf.slice(data.length);
}

export function generateQRMatrix(text: string): boolean[][] {
  const raw = new TextEncoder().encode(text);
  const cfg = CONFIGS.find((c) => c.dataBytes - 3 >= raw.length) ?? CONFIGS[CONFIGS.length - 1];
  const N = cfg.size;

  const mat: (boolean | null)[][] = Array.from({ length: N }, () => Array(N).fill(null));
  const rsv: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));

  function set(r: number, c: number, v: boolean, mark = true) {
    if (r >= 0 && r < N && c >= 0 && c < N) { mat[r][c] = v; if (mark) rsv[r][c] = true; }
  }

  function finder(tr: number, tc: number) {
    for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
      const r = tr + dr, c = tc + dc;
      if (r < 0 || r >= N || c < 0 || c >= N) continue;
      set(r, c,
        (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) ||
        (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6)) ||
        (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4)
      );
    }
  }

  finder(0, 0); finder(0, N - 7); finder(N - 7, 0);

  // Timing
  for (let i = 8; i < N - 8; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }

  // Alignment
  for (const ar of cfg.alignPos) for (const ac of cfg.alignPos) {
    if ((ar === 6 && ac === 6) || (ar === 6 && ac === N - 7) || (ar === N - 7 && ac === 6)) continue;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      set(ar + dr, ac + dc, Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0));
    }
  }

  // Dark module + format reservations
  set(N - 8, 8, true);
  for (let i = 0; i < 9; i++) {
    set(8, i, false, true); set(i, 8, false, true);
    set(8, N - 1 - i, false, true); set(N - 1 - i, 8, false, true);
  }

  // Encode data (byte mode)
  const bits: number[] = [];
  function push(v: number, len: number) { for (let i = len - 1; i >= 0; i--) bits.push((v >> i) & 1); }

  push(0b0100, 4); push(raw.length, 8);
  for (const b of raw) push(b, 8);
  const maxBits = cfg.dataBytes * 8;
  for (let i = 0; i < Math.min(4, maxBits - bits.length); i++) bits.push(0);
  while (bits.length % 8) bits.push(0);
  const pads = [0xec, 0x11]; let pi = 0;
  while (bits.length < maxBits) { push(pads[pi++ % 2], 8); }

  const dataBytes = new Uint8Array(cfg.dataBytes);
  for (let i = 0; i < cfg.dataBytes; i++) {
    let bv = 0; for (let b = 0; b < 8; b++) bv = (bv << 1) | bits[i * 8 + b]; dataBytes[i] = bv;
  }

  const ec = rsEncode(dataBytes, cfg.ecBytes);
  const all = new Uint8Array(cfg.totalBytes);
  all.set(dataBytes); all.set(ec, dataBytes.length);

  const stream: number[] = [];
  for (const byt of all) for (let b = 7; b >= 0; b--) stream.push((byt >> b) & 1);

  // Place data bits (zigzag, mask 0)
  let idx = 0, up = true;
  for (let rc = N - 1; rc > 0; rc -= 2) {
    if (rc === 6) rc--;
    const rows = up ? Array.from({ length: N }, (_, i) => N - 1 - i) : Array.from({ length: N }, (_, i) => i);
    for (const r of rows) for (const off of [0, 1]) {
      const c = rc - off;
      if (!rsv[r][c]) {
        let bit = idx < stream.length ? stream[idx++] : 0;
        if ((r + c) % 2 === 0) bit ^= 1;
        mat[r][c] = !!bit;
      }
    }
    up = !up;
  }

  // Format info (ECC=M, Mask=0 → 0x5412)
  const fmt = [1,0,1,0,1,0,0,0,0,0,1,0,0,1,0];
  const tl: [number,number][] = [
    [8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],
    [7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8],
  ];
  for (let i = 0; i < 15; i++) { const [r,c] = tl[i]; mat[r][c] = fmt[i] === 1; }
  for (let i = 0; i < 7; i++) mat[N - 1 - i][8] = fmt[i] === 1;
  for (let i = 0; i < 8; i++) mat[8][N - 8 + i] = fmt[7 + i] === 1;

  return mat.map((row) => row.map((cell) => cell === true));
}
