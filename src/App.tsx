import type { ReactNode } from "react";
import { Hero } from "./components/sections/Hero";
import { StaircaseShowcase } from "./components/sections/StaircaseShowcase";
import { Benefits } from "./components/sections/Benefits";
import { Process } from "./components/sections/Process";
import { StairPriceCalculator } from "./components/sections/StairPriceCalculator";
import { LeadForm } from "./components/sections/LeadForm";
import { TrustProof } from "./components/sections/TrustProof";
import { FinalCta } from "./components/sections/FinalCta";
import { PrivacyNotice } from "./components/sections/PrivacyNotice";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingZalo } from "./components/overlays/FloatingZalo";
import { MobileCtaBar } from "./components/overlays/MobileCtaBar";
import { FadeUp } from "./components/motion";

type SectionItem = { key: string; delayMs: number; node: ReactNode };

const SECTIONS: SectionItem[] = [
  { key: "hero", delayMs: 0, node: <Hero /> },
  { key: "gallery", delayMs: 90, node: <StaircaseShowcase /> },
  { key: "benefits", delayMs: 105, node: <Benefits /> },
  { key: "process", delayMs: 150, node: <Process /> },
  { key: "trust", delayMs: 165, node: <TrustProof /> },
  { key: "final-cta", delayMs: 180, node: <FinalCta /> },
  { key: "calculator", delayMs: 200, node: <StairPriceCalculator /> },
  { key: "lead", delayMs: 210, node: <LeadForm variant="page" /> },
  { key: "privacy", delayMs: 220, node: <PrivacyNotice /> },
];

export function App() {
  return (
    <div className="page-shell">
      <a href="#main-content" className="skip-link">
        Bỏ qua điều hướng
      </a>

      <Header />

      <main id="main-content">
        {SECTIONS.map(({ key, delayMs, node }) => (
          <FadeUp key={key} delayMs={delayMs}>
            {node}
          </FadeUp>
        ))}
      </main>

      <Footer />
      <FloatingZalo />
      <MobileCtaBar />
    </div>
  );
}
