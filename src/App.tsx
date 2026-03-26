import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Hero } from "./components/sections/Hero";
import { StaircaseShowcase } from "./components/sections/StaircaseShowcase";
import { Process } from "./components/sections/Process";
import { StairPriceCalculator } from "./components/sections/StairPriceCalculator";
import { LeadForm } from "./components/sections/LeadForm";
import { Footer } from "./components/layout/Footer";
import { FloatingZalo } from "./components/overlays/FloatingZalo";
import { MobileCtaBar } from "./components/overlays/MobileCtaBar";
import { Button } from "./components/ui/Button";
import { SectionBackdrop } from "./components/layout/SectionBackdrop";
import { scrollToId } from "./lib/scroll";

function FadeUp({
  children,
  reduceMotion,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  reduceMotion: boolean;
  delayMs?: number;
  className?: string;
}) {
  const delaySec = delayMs / 1000;
  return (
    <motion.div
      className={className}
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
    <div className="relative overflow-hidden bg-white pb-24 md:pb-0">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-white"
        aria-hidden
      />

      <main className="relative">
        {/* 1) HERO */}
        <FadeUp reduceMotion={reduce ?? false}>
          <Hero />
        </FadeUp>

        {/* 2) LEAD FORM (trên fold) */}
        <div className="relative border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <FadeUp reduceMotion={reduce ?? false} delayMs={60}>
              <div className="mx-auto max-w-2xl">
                <LeadForm variant="sidebar" />
              </div>
            </FadeUp>
          </div>
        </div>

        {/* 3) STAIRCASE SHOWCASE */}
        <div className="relative border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <FadeUp reduceMotion={reduce ?? false} delayMs={90}>
              <StaircaseShowcase embedded />
            </FadeUp>
          </div>
        </div>

        {/* 4) STAIR PRICE CALCULATOR (interactive) */}
        <div className="relative border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <FadeUp reduceMotion={reduce ?? false} delayMs={120}>
              <StairPriceCalculator embedded />
            </FadeUp>
          </div>
        </div>

        {/* 5) PROCESS */}
        <div className="relative border-t border-gray-200 bg-gradient-to-b from-emerald-50/20 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <FadeUp reduceMotion={reduce ?? false} delayMs={150}>
              <Process embedded />
            </FadeUp>
          </div>
        </div>

        {/* 6) CTA lặp lại cuối trang */}
        <div className="relative border-t border-gray-200 bg-white">
          <FadeUp reduceMotion={reduce ?? false} delayMs={180}>
            <section
              id="final-cta"
              className="relative isolate overflow-hidden"
              aria-label="Nhận báo giá miễn phí"
            >
              <SectionBackdrop variant="lead" />
              <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                    Ưu đãi theo yêu cầu
                  </p>
                  <h2 className="font-display mt-2 text-heading font-bold text-balance text-charcoal">
                    Nhận báo giá miễn phí
                  </h2>
                  <p className="mt-3 text-base leading-[1.7] text-text-secondary">
                    Để lại thông tin, chúng tôi sẽ phản hồi qua Zalo trong 5 phút.
                  </p>

                  <div className="mt-8 flex items-center justify-center">
                    <Button
                      href="#contact"
                      tone="orange"
                      className="w-full max-w-xs rounded-card px-8 py-3.5"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("contact", reduce ?? false);
                      }}
                    >
                      Nhận báo giá miễn phí
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </FadeUp>
        </div>
      </main>

      <Footer />
      <FloatingZalo />
      <MobileCtaBar />
    </div>
  );
}
