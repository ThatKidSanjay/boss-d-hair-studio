import Header from "@/app/components/sections/Header";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Services from "@/app/components/sections/Services";
import Pricelist from "@/app/components/sections/Pricelist";
import Gallery from "@/app/components/sections/Gallery";
import Shop from "@/app/components/sections/Shop";
import Testimonials from "@/app/components/sections/Testimonials";
import Booking from "@/app/components/sections/Booking";
import Footer from "@/app/components/sections/Footer";
import MapSection from "@/app/components/sections/MapSection";
import FloatingActions from "@/app/components/FloatingActions";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <Hero />
      <About />
      <Services />
      <Pricelist />
      <Gallery />
      <Shop />
      <Testimonials />
      <Booking />
      <MapSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}