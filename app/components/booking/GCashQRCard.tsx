"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Download,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { generateQRMatrix } from "../../lib/qr-code";
import { GCASH_ACCOUNT } from "../../lib/booking-data";

interface GCashQRCardProps {
  amount: number;
  paymentLabel: string;
  customerName?: string;
  bookingCode?: string;
}

export default function GCashQRCard({
  amount,
  paymentLabel,
  customerName,
  bookingCode,
}: GCashQRCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const formattedAmount = useMemo(
    () =>
      amount.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [amount]
  );

  const payload = useMemo(() => {
    const ref = bookingCode || "BDHS";

    return (
      `gcash://pay?account=${GCASH_ACCOUNT.rawNumber}` +
      `&amount=${amount.toFixed(2)}` +
      `&merchant=${encodeURIComponent(GCASH_ACCOUNT.shortName)}` +
      `&ref=${encodeURIComponent(ref)}` +
      `&name=${encodeURIComponent(customerName || "Customer")}`
    );
  }, [amount, customerName, bookingCode]);

  const matrix = useMemo(() => {
    try {
      return generateQRMatrix(payload);
    } catch {
      return generateQRMatrix(
        `GCASH:${GCASH_ACCOUNT.rawNumber}:${amount.toFixed(2)}`
      );
    }
  }, [payload, amount]);

  const matrixSize = matrix.length;

  /*
   * Keep the QR geometry deliberately simple.
   *
   * The actual QR modules remain perfectly square while the
   * surrounding card provides the visual styling.
   */
  const cellSize = 8;
  const quietZone = 24;

  const qrSize = matrixSize * cellSize;
  const vbSize = qrSize + quietZone * 2;

  const center = Math.floor(matrixSize / 2);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_ACCOUNT.rawNumber);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const downloadQR = async () => {
    if (!svgRef.current || downloading) return;

    setDownloading(true);

    try {
      const svgString = new XMLSerializer().serializeToString(
        svgRef.current
      );

      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          try {
            const scale = 3;

            const width = 900;
            const height = 1120;

            const canvas = document.createElement("canvas");

            canvas.width = width * scale;
            canvas.height = height * scale;

            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(new Error("Canvas unavailable"));
              return;
            }

            ctx.scale(scale, scale);

            /*
             * ----------------------------------------------------
             * Background
             * ----------------------------------------------------
             */

            ctx.fillStyle = "#0A0A0A";
            ctx.fillRect(0, 0, width, height);

            /*
             * ----------------------------------------------------
             * Header
             * ----------------------------------------------------
             */

            ctx.fillStyle = "#111111";
            roundRect(ctx, 0, 0, width, 170, 0);
            ctx.fill();

            // Gold accent line.
            ctx.fillStyle = "#C9A24D";
            ctx.fillRect(0, 166, width, 4);

            /*
             * GCash mark
             */

            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(78, 82, 31, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#005CFE";
            ctx.font = "900 34px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("G", 78, 83);

            /*
             * Header text
             */

            ctx.textAlign = "left";

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "800 30px Arial";
            ctx.fillText("GCash PAYMENT", 125, 72);

            ctx.fillStyle = "#C9A24D";
            ctx.font = "700 16px Arial";
            ctx.fillText("SCAN TO PAY", 125, 105);

            /*
             * ----------------------------------------------------
             * Amount
             * ----------------------------------------------------
             */

            ctx.fillStyle = "#151515";
            roundRect(ctx, 50, 205, 800, 175, 26);
            ctx.fill();

            ctx.strokeStyle = "rgba(201,162,77,0.25)";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.textAlign = "center";

            ctx.fillStyle = "#A3A3A3";
            ctx.font = "700 17px Arial";
            ctx.fillText(paymentLabel.toUpperCase(), 450, 252);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "900 54px Arial";
            ctx.fillText(`₱${formattedAmount}`, 450, 325);

            /*
             * ----------------------------------------------------
             * QR container
             * ----------------------------------------------------
             */

            ctx.fillStyle = "#FFFFFF";
            roundRect(ctx, 100, 420, 700, 700, 30);
            ctx.fill();

            ctx.drawImage(img, 170, 490, 560, 560);

            /*
             * ----------------------------------------------------
             * Merchant information
             * ----------------------------------------------------
             */

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "700 18px Arial";
            ctx.fillText(GCASH_ACCOUNT.name, 450, 1155);

            ctx.fillStyle = "#C9A24D";
            ctx.font = "800 21px Arial";
            ctx.fillText(GCASH_ACCOUNT.formattedNumber, 450, 1190);

            /*
             * ----------------------------------------------------
             * Download
             * ----------------------------------------------------
             */

            const pngUrl = canvas.toDataURL("image/png");

            const anchor = document.createElement("a");

            anchor.href = pngUrl;
            anchor.download = `GCash_Payment_${amount.toFixed(0)}${
              bookingCode ? `_${bookingCode}` : ""
            }.png`;

            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);

            resolve();
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => {
          reject(new Error("Unable to render QR"));
        };

        img.src = url;
      });

      URL.revokeObjectURL(url);
    } catch {
      // Keep UI stable if export fails.
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      aria-label="GCash payment"
      className="
        relative w-full min-w-0 overflow-hidden
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--bg-elevated)]
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      "
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div
        className="
          relative overflow-hidden
          border-b border-[var(--border)]
          bg-[#0A0A0A]
          px-4 py-4
          sm:px-5
        "
      >
        {/* subtle gold glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-16 -top-20
            h-40 w-40
            rounded-full
            bg-[#C9A24D]/10
            blur-3xl
          "
        />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {/* GCash mark */}
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-lg font-black
                text-[#005CFE]
                shadow-sm
              "
            >
              G
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-serif text-base font-semibold text-white">
                  GCash Payment
                </h3>

                <span
                  className="
                    hidden rounded-full
                    border border-[#C9A24D]/30
                    bg-[#C9A24D]/10
                    px-2 py-0.5
                    text-[8px] font-bold
                    uppercase tracking-wider
                    text-[#E5C77A]
                    sm:inline-flex
                  "
                >
                  QR
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-white/50">
                Complete your payment securely
              </p>
            </div>
          </div>

          <div
            className="
              flex shrink-0 items-center gap-1.5
              text-[9px] font-semibold
              uppercase tracking-wider
              text-[#C9A24D]
            "
          >
            <ShieldCheck size={13} />
            <span className="hidden sm:inline">Secure payment</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative p-4 sm:p-5">
        {/* =======================================================
            PAYMENT AMOUNT
        ======================================================= */}

        <div
          className="
            relative overflow-hidden
            rounded-xl
            border border-[#C9A24D]/20
            bg-[#C9A24D]/[0.045]
            px-4 py-4
            text-center
          "
        >
          {/* tiny decorative gold line */}
          <div
            aria-hidden="true"
            className="
              absolute left-1/2 top-0
              h-px w-16
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#C9A24D]
              to-transparent
            "
          />

          <p
            className="
              text-[9px] font-bold
              uppercase tracking-[0.18em]
              text-[var(--text-muted)]
            "
          >
            {paymentLabel}
          </p>

          <div className="mt-1 flex items-baseline justify-center">
            <span className="mr-1 text-sm font-bold text-[#C9A24D]">
              ₱
            </span>

            <span
              className="
                font-serif
                text-[32px]
                font-semibold
                leading-none
                tracking-tight
                text-[var(--text)]
                sm:text-[38px]
              "
            >
              {formattedAmount}
            </span>
          </div>

          {customerName && (
            <p className="mt-2 truncate text-[10px] text-[var(--text-muted)]">
              Payment for{" "}
              <span className="font-semibold text-[var(--text)]">
                {customerName}
              </span>
            </p>
          )}
        </div>

        {/* =======================================================
            QR INTRO
        ======================================================= */}

        <div className="mt-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[var(--border)]" />

            <span
              className="
                text-[9px] font-bold
                uppercase tracking-[0.18em]
                text-[#C9A24D]
              "
            >
              Scan to pay
            </span>

            <span className="h-px w-8 bg-[var(--border)]" />
          </div>

          <h4 className="mt-2 font-serif text-base font-semibold text-[var(--text)] sm:text-lg">
            Scan this QR with GCash
          </h4>

          <p className="mx-auto mt-1 max-w-sm text-[10px] leading-relaxed text-[var(--text-muted)] sm:text-[11px]">
            Scan the code using the GCash app and verify the recipient and
            amount before confirming your payment.
          </p>
        </div>

        {/* =======================================================
            QR CODE
        ======================================================= */}

        <div className="mt-5 flex justify-center">
          <div
            className="
              relative
              rounded-2xl
              border border-[var(--border)]
              bg-white
              p-3
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              sm:p-4
            "
          >
            {/* Gold corner brackets */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-2 top-2
                h-6 w-6
                rounded-tl-lg
                border-l-2 border-t-2
                border-[#C9A24D]
              "
            />

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-2 top-2
                h-6 w-6
                rounded-tr-lg
                border-r-2 border-t-2
                border-[#C9A24D]
              "
            />

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-2 left-2
                h-6 w-6
                rounded-bl-lg
                border-b-2 border-l-2
                border-[#C9A24D]
              "
            />

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-2 right-2
                h-6 w-6
                rounded-br-lg
                border-b-2 border-r-2
                border-[#C9A24D]
              "
            />

            <svg
              ref={svgRef}
              viewBox={`0 0 ${vbSize} ${vbSize}`}
              className="
                block
                h-[min(72vw,300px)]
                w-[min(72vw,300px)]
                max-w-full
                sm:h-[320px]
                sm:w-[320px]
              "
              shapeRendering="crispEdges"
              role="img"
              aria-label={`GCash payment QR for ₱${formattedAmount}`}
            >
              <rect
                width={vbSize}
                height={vbSize}
                rx="10"
                fill="#FFFFFF"
              />

              {matrix.map((row, r) =>
                row.map((cell, c) => {
                  if (!cell) return null;

                  /*
                   * Reserve a small central area for the GCash mark.
                   */
                  if (
                    r >= center - 3 &&
                    r <= center + 3 &&
                    c >= center - 3 &&
                    c <= center + 3
                  ) {
                    return null;
                  }

                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={quietZone + c * cellSize}
                      y={quietZone + r * cellSize}
                      width={cellSize}
                      height={cellSize}
                      fill="#071A36"
                    />
                  );
                })
              )}

              {/* Center GCash mark */}
              <g
                transform={`translate(
                  ${vbSize / 2 - 17},
                  ${vbSize / 2 - 17}
                )`}
              >
                <circle
                  cx="17"
                  cy="17"
                  r="17"
                  fill="#005CFE"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />

                <text
                  x="17"
                  y="23"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="Arial, sans-serif"
                  fontSize="19"
                  fontWeight="900"
                >
                  G
                </text>
              </g>
            </svg>

            <div
              className="
                mt-2
                flex items-center
                justify-center gap-1.5
                text-[9px]
                font-medium
                text-slate-500
              "
            >
              <Smartphone size={11} />
              <span>Scan using the GCash app</span>
            </div>
          </div>
        </div>

        {/* =======================================================
            PAYMENT DETAILS
        ======================================================= */}

        <div
          className="
            mt-5 overflow-hidden
            rounded-xl
            border border-[var(--border)]
            bg-[var(--bg-alt)]
          "
        >
          <div
            className="
              flex items-center justify-between
              border-b border-[var(--border-light)]
              px-3.5 py-2.5
            "
          >
            <span
              className="
                text-[9px] font-bold
                uppercase tracking-[0.16em]
                text-[var(--text-muted)]
              "
            >
              Payment details
            </span>

            <ShieldCheck
              size={13}
              className="text-emerald-500"
            />
          </div>

          <div className="divide-y divide-[var(--border-light)]">
            {/* Account */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                Account name
              </span>

              <span className="min-w-0 truncate text-right text-xs font-bold text-[var(--text)]">
                {GCASH_ACCOUNT.name}
              </span>
            </div>

            {/* Number */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                GCash number
              </span>

              <span className="font-mono text-xs font-bold tracking-wide text-[#005CFE]">
                {GCASH_ACCOUNT.formattedNumber}
              </span>
            </div>

            {/* Reference */}
            {bookingCode && (
              <div className="flex items-center justify-between gap-3 px-3.5 py-3">
                <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                  Reference
                </span>

                <span
                  className="
                    rounded-md
                    bg-[var(--bg)]
                    px-2 py-1
                    font-mono
                    text-[10px]
                    font-bold
                    text-[var(--text)]
                  "
                >
                  {bookingCode}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            ACTIONS
        ======================================================= */}

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          {/* Copy */}
          <button
            type="button"
            onClick={copyNumber}
            aria-label="Copy GCash number"
            className="
              group
              inline-flex min-h-[44px]
              items-center justify-center gap-2
              rounded-xl
              border border-[#C9A24D]/50
              bg-[#C9A24D]/10
              px-3
              text-[10px]
              font-bold
              uppercase tracking-wider
              text-[#C9A24D]
              transition-all duration-200
              hover:border-[#C9A24D]
              hover:bg-[#C9A24D]/15
              active:scale-[0.98]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C9A24D]
              focus-visible:ring-offset-2
            "
          >
            {copied ? (
              <>
                <Check
                  size={15}
                  className="text-emerald-500"
                />

                <span className="text-emerald-500">
                  Number copied
                </span>
              </>
            ) : (
              <>
                <Copy size={15} />

                <span>
                  Copy GCash number
                </span>
              </>
            )}
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={downloadQR}
            disabled={downloading}
            aria-label="Save QR code"
            title="Save QR code"
            className="
              inline-flex min-h-[44px] min-w-[44px]
              items-center justify-center gap-2
              rounded-xl
              border border-[var(--border)]
              bg-[var(--bg)]
              px-3
              text-[10px]
              font-bold
              uppercase tracking-wider
              text-[var(--text-secondary)]
              transition-all duration-200
              hover:border-[#C9A24D]/50
              hover:bg-[#C9A24D]/5
              hover:text-[#C9A24D]
              active:scale-[0.98]
              disabled:cursor-wait
              disabled:opacity-50
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C9A24D]
              focus-visible:ring-offset-2
            "
          >
            <Download
              size={15}
              className={downloading ? "animate-pulse" : ""}
            />

            <span className="hidden sm:inline">
              {downloading ? "Saving…" : "Save QR"}
            </span>
          </button>
        </div>

        {/* =======================================================
            MOBILE PAYMENT GUIDE
        ======================================================= */}

        <div
          className="
            mt-4
            rounded-xl
            border border-[var(--border)]
            bg-[var(--bg-alt)]
            p-3
          "
        >
          <div className="flex items-start gap-2.5">
            <div
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-lg
                bg-[#C9A24D]/10
                text-[#C9A24D]
              "
            >
              <Smartphone size={14} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[var(--text)]">
                Paying from this phone?
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-relaxed
                  text-[var(--text-muted)]
                "
              >
                Save the QR, then open GCash → Pay QR → Upload from
                Gallery. Verify the recipient and amount before sending.
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            FINAL SAFETY NOTE
        ======================================================= */}

        <div
          className="
            mt-3
            flex items-center
            justify-center gap-1.5
            text-center
            text-[9px]
            text-[var(--text-faint)]
          "
        >
          <span
            className="
              h-1.5 w-1.5
              rounded-full
              bg-emerald-500
            "
          />

          <span>
            Verify the recipient name before confirming payment.
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Canvas helper used when exporting the payment QR.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(
    radius,
    width / 2,
    height / 2
  );

  ctx.beginPath();

  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + r
  );

  ctx.lineTo(
    x + width,
    y + height - r
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - r,
    y + height
  );

  ctx.lineTo(x + r, y + height);

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - r
  );

  ctx.lineTo(x, y + r);

  ctx.quadraticCurveTo(
    x,
    y,
    x + r,
    y
  );

  ctx.closePath();
}
