import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { TrustProof } from "./components/sections/TrustProof";
import { StaircaseShowcase } from "./components/sections/StaircaseShowcase";
import { Benefits } from "./components/sections/Benefits";
import { Process } from "./components/sections/Process";
import { LeadForm } from "./components/sections/LeadForm";
import { FinalCta } from "./components/sections/FinalCta";
import { Footer } from "./components/layout/Footer";
import { FloatingZalo } from "./components/overlays/FloatingZalo";
import { MobileCtaBar } from "./components/overlays/MobileCtaBar";

export function App() {
  return (
    <div className="relative overflow-hidden bg-page pb-24 md:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(74,93,115,0.12)_0%,transparent_60%),radial-gradient(55%_40%_at_20%_20%,rgba(31,41,55,0.05)_0%,transparent_55%)]"
      />

      <Header />

      <main>
        <Hero />
        <TrustProof />
        <StaircaseShowcase />
        <Benefits />
        <Process />
        <LeadForm />
        <FinalCta />
      </main>

      <Footer />
      <FloatingZalo />
      <MobileCtaBar />
    </div>
  );
}

