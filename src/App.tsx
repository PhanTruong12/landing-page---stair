import { motion, useReducedMotion } from "framer-motion";
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

function FadeUp({
  children,
  reduceMotion,
  delayMs = 0,
}: {
  children: ReactNode;
  reduceMotion: boolean;
  delayMs?: number;
}) {
  const delaySec = delayMs / 1000;
  return (
    <motion.div
      initial={
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : delaySec,
      }}
    >
      {children}
    </motion.div>
  );
}

export function App() {
  const reduce = useReducedMotion();
  return (
    <div className="page-shell">
      <a href="#main-content" className="skip-link">
        Bỏ qua điều hướng
      </a>

      <Header />

      <main id="main-content">
        <FadeUp reduceMotion={reduce ?? false}>
          <Hero />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={60}>
          <LeadForm variant="sidebar" />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={90}>
          <StaircaseShowcase embedded />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={105}>
          <Benefits />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={120}>
          <StairPriceCalculator embedded />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={150}>
          <Process embedded />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={165}>
          <TrustProof />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={180}>
          <FinalCta />
        </FadeUp>

        <FadeUp reduceMotion={reduce ?? false} delayMs={200}>
          <PrivacyNotice />
        </FadeUp>
      </main>

      <Footer />
      <FloatingZalo />
      <MobileCtaBar />
    </div>
  );
}
