"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import "./ditto.css";

const CARD_NUMBER = "4485199620577516";
const MASK_CHAR = "\u00D7"; // ×
const REVEAL_DURATION = 5; // seconds the number stays visible
const SLOT_STAGGER = 0.08; // delay between each digit's slot animation
const SLOT_DURATION = 0.16; // duration of each digit's slot roll

// Split card number into groups
const GROUPS = [
  CARD_NUMBER.slice(0, 4),
  CARD_NUMBER.slice(4, 8),
  CARD_NUMBER.slice(8, 12),
  CARD_NUMBER.slice(12, 16),
];

// Which digit indices (0-15) are masked
const MASKED_INDICES = Array.from({ length: 8 }, (_, i) => i + 4); // indices 4-11

type Phase = "hidden" | "revealing" | "visible" | "copied" | "hiding";


function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]" viewBox="0 0 56 56" fill="currentColor">
      <path d="M28.01 46.403C44.556 46.403 56 33.017 56 28.844c0-4.193-11.465-17.558-27.99-17.558C11.588 11.286 0 24.651 0 28.844c0 4.173 11.671 17.559 28.01 17.559m0-6.053c-6.445 0-11.526-5.226-11.567-11.506C16.422 22.4 21.565 17.34 28.01 17.34c6.404 0 11.547 5.06 11.547 11.505c0 6.28-5.143 11.506-11.547 11.506m0-7.354c2.293 0 4.194-1.88 4.194-4.152c0-2.293-1.9-4.172-4.194-4.172c-2.313 0-4.214 1.88-4.214 4.172c0 2.273 1.9 4.152 4.214 4.152" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" viewBox="0 0 24 24"><path fill="currentColor" d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2"/><path fill="currentColor" d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Single digit with slot-machine animation
function SlotDigit({
  digit,
  masked,
  revealing,
  hiding,
  delay,
  hidingDelay,
  shineDelay,
  isShining,
}: {
  digit: string;
  masked: boolean;
  revealing: boolean;
  hiding: boolean;
  delay: number;
  hidingDelay: number;
  shineDelay: number;
  isShining: boolean;
}) {
  const [showDigit, setShowDigit] = useState(!masked);

  useEffect(() => {
    if (revealing) {
      const timer = setTimeout(() => setShowDigit(true), delay * 1000);
      return () => clearTimeout(timer);
    }
    if (hiding) {
      const timer = setTimeout(() => setShowDigit(false), hidingDelay * 1000);
      return () => clearTimeout(timer);
    }
    if (masked) {
      setShowDigit(false);
    }
  }, [revealing, hiding, masked, delay, hidingDelay]);

  return (
    <span className="digit-slot overflow-hidden" style={{ position: "relative", display: "inline-block", width: "0.62em", textAlign: "center" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {showDigit ? (
          <motion.span
            key={`digit-${digit}`}
            className="digit-char"
            initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{ y: 24, opacity: 0, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 35,
              mass: 0.8,
            }}
            style={{ display: "inline-block" }}
          >
            <span
              className={isShining ? "shine-digit" : ""}
              style={{
                animationDelay: isShining ? `${shineDelay}s` : undefined,
              }}
            >
              {digit}
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="mask"
            className="mask-char"
            initial={revealing || hiding ? { y: -24, opacity: 0, filter: "blur(2px)" } : false}
            animate={{ y: 0, opacity: 0.85, filter: "blur(0px)" }}
            exit={{ y: 24, opacity: 0, filter: "blur(2px)" }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 35,
              mass: 0.8,
            }}
            style={{ display: "inline-block", color: "#000" }}
          >
            {MASK_CHAR}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Rounded-rect countdown border that traces the button shape
function CountdownBorder({ duration, running, onComplete }: { duration: number; running: boolean; onComplete: () => void }) {
  const size = 40;
  const strokeWidth = 2.5;
  const r = 12; // matches rounded-xl (12px)
  const inset = strokeWidth / 2;
  const w = size - strokeWidth;
  const h = size - strokeWidth;

  // Perimeter of a rounded rect = 2*(w - 2r) + 2*(h - 2r) + 2*π*r
  const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;

  const [scope, animate] = useAnimate();
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (running && scope.current) {
      animRef.current = animate(
        scope.current,
        { strokeDashoffset: perimeter },
        { duration, ease: "linear" }
      );
      animRef.current.then(() => {
        onComplete();
      });
    }

    return () => {
      if (animRef.current) {
        animRef.current.cancel();
      }
    };
  }, [running]);

  return (
    <svg
      className="countdown-border"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      <rect
        ref={scope}
        x={inset}
        y={inset}
        width={w}
        height={h}
        rx={r}
        ry={r}
        fill="none"
        stroke="#3daa5c"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={perimeter}
        strokeDashoffset={0}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}


export default function Ditto5() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [isShining, setIsShining] = useState(false);
  const countdownOnComplete = useRef<() => void>(() => {});

  const handleReveal = useCallback(() => {
    if (phase !== "hidden") return;
    setPhase("revealing");
    setIsShining(false);

    const totalRevealTime = (MASKED_INDICES.length * SLOT_STAGGER + SLOT_DURATION) * 1000;

    setTimeout(() => {
      setIsShining(true);
      setPhase((prev) => (prev === "revealing" ? "visible" : prev));
      setTimeout(() => setIsShining(false), 1200);
    }, totalRevealTime);
  }, [phase]);


  const handleCountdownComplete = useCallback(() => {
    setPhase("hiding");
    setTimeout(() => setPhase("hidden"), 800);
  }, []);

  const handleCopy = useCallback(() => {
    if (phase !== "visible" && phase !== "revealing") return;
    navigator.clipboard.writeText(CARD_NUMBER.replace(/(.{4})/g, "$1 ").trim());
    setPhase("copied");

    // Automatically return to hidden state after a short delay
    setTimeout(() => {
      handleCountdownComplete();
    }, 1200);
  }, [phase, handleCountdownComplete]);


  countdownOnComplete.current = handleCountdownComplete;

  const isMasked = phase === "hidden" || phase === "hiding" || phase === "copied";
  const isRevealing = phase === "revealing";
  const isHiding = phase === "hiding" || phase === "copied";
  const showCopyButton = phase === "revealing" || phase === "visible" || phase === "copied";
  const showCountdown = phase === "revealing" || phase === "visible";

  return (
    <div
      className="ditto-5 min-h-[calc(100vh-12rem)] w-full p-6 flex flex-col items-center justify-center"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="card-container max-w-2xl bg-white p-1.5 pl-5 rounded-2xl border-2 border-[#e4e3ee] text-xl text-black flex items-center justify-between gap-x-10">
        <div
          className="card-number flex items-center font-medium"
          style={{ fontFamily: '"Geist Mono", monospace' }}
        >
          <p className="flex items-center gap-x-2.5">
            {GROUPS.map((group, groupIndex) => {
              return (
                <span key={groupIndex} className="digit-group flex">
                  {group.split("").map((digit, index) => {
                    const globalIndex = groupIndex * 4 + index;
                    const isMaskedDigit = MASKED_INDICES.includes(globalIndex);

                    let delay = 0;
                    let hidingDelay = 0;
                    let shineDelay = 0;
                    if (isMaskedDigit) {
                      const positionInGroup = globalIndex % 4;
                      delay = positionInGroup * SLOT_STAGGER;
                      hidingDelay = positionInGroup * (SLOT_STAGGER * 0.6);
                      shineDelay = globalIndex * 0.04;
                    } else {
                      shineDelay = globalIndex * 0.04;
                    }

                    return (
                      <SlotDigit
                        key={`${groupIndex}-${index}`}
                        digit={digit}
                        masked={isMaskedDigit && isMasked}
                        revealing={isMaskedDigit && isRevealing}
                        hiding={isMaskedDigit && isHiding}
                        delay={delay}
                        hidingDelay={hidingDelay}
                        shineDelay={shineDelay}
                        isShining={isShining && (phase === "visible" || phase === "revealing")}
                      />
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>

        {/* Action button */}
        <div className="relative flex-shrink-0">
          <motion.button
            className="action-button relative w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            onClick={phase === "hidden" ? handleReveal : (phase === "visible" || phase === "revealing") ? handleCopy : undefined}
            style={{
              background:
                phase === "copied"
                  ? "#34c55a"
                  : showCopyButton
                    ? "#d0f9db"
                    : "#eeedf8",
              color:
                phase === "copied"
                  ? "#ffffff"
                  : showCopyButton
                    ? "#34c55a"
                    : "#5e56d6",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {phase === "copied" ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                >
                  <CheckIcon />
                </motion.span>
              ) : showCopyButton ? (
                <motion.span
                  key="copy"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                >
                  <CopyIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="eye"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                >
                  <EyeIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Countdown border overlay */}
          {showCountdown && (
            <CountdownBorder
              duration={REVEAL_DURATION}
              running={showCountdown}
              onComplete={() => countdownOnComplete.current()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
