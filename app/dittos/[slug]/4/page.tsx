"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Color from "color";
import "./ditto.css";

const steps = [
  {
    label: "$100K",
    value: 0,
    color: "#105fe6",
    dotSize: 8,
    segment: { from: "#cedcfc", to: "#5e90ff" },
    segmentH: 6,
  },
  {
    label: "$1M",
    value: 1,
    color: "#1160e6",
    dotSize: 10,
    segment: { from: "#5f90fe", to: "#7129ff" },
    segmentH: 8,
  },
  {
    label: "$5M",
    value: 2,
    color: "#7426fd",
    dotSize: 12,
    segment: { from: "#7425fd", to: "#fa5f63" },
    segmentH: 10,
  },
  {
    label: "$10M",
    value: 3,
    color: "#fd6362",
    dotSize: 14,
    segment: { from: "#fd6361", to: "#ffc825" },
    segmentH: 12,
  },
  {
    label: "$10M+",
    value: 4,
    color: "#fecd2e",
    dotSize: 20,
    segment: null,
    segmentH: 0,
  },
];

export default function Ditto4() {
  const [value, setValue] = useState(2);

  const activeColor = steps[value].color;

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="ditto-4 min-h-[calc(100vh-12rem)] w-full p-6 flex flex-col items-center justify-center"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="max-w-2xl bg-[#fefefe] px-6 py-4 sm:px-12 sm:py-10 rounded-3xl border border-[#e2e4e8] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
        <h3 className="text-xl text-[#0f0f0f] font-semibold mb-3">
          Minimum trading volume
        </h3>
        <p className="text-base text-[#0f0f0f]/60">
          Select your minimum trading value to find opportunities that match
          your investment goals.
        </p>

        {/* Track container */}
        <div
          className="relative z-10 rounded-full border border-[#e4e6ea] mt-5 px-6 py-5 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={steps.length - 1}
          aria-valuenow={value}
          aria-valuetext={steps[value].label}
          tabIndex={0}
        >
          <div className="flex items-center gap-2">
            {steps.map((step, i) => {
              const isActive = i === value;
              const isFuture = i > value;
              const isSegmentActive = i > value - 1;

              const ringSize = step.dotSize + 12;

              return (
                <div
                  key={step.value}
                  className="flex flex-1 items-center gap-2"
                  style={{ flex: i < steps.length - 1 ? "1" : "0" }}
                >
                  {/* Dot */}
                  <motion.div
                    className="relative flex items-center justify-center shrink-0 rounded-full cursor-pointer"
                    style={{
                      width: step.dotSize,
                      height: step.dotSize,
                      backgroundColor: isFuture ? "#e1e3e6" : step.color,
                    }}
                    onClick={() => setValue(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: hovered === i ? 1.1 : isActive ? 1.05 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 1000,
                      damping: 200,
                    }}
                  >
                    {/* Dotted ring */}
                    {isActive && (
                      <motion.div
                        layoutId="active-ring"
                        className="absolute rounded-full border-2 border-dotted animate-spin-slow pointer-events-none"
                        style={{
                          width: ringSize,
                          height: ringSize,
                          borderColor: step.color,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 1000,
                          damping: 100,
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Segment */}
                  {step.segment && (
                    <div
                      className="flex-1 rounded-full mx-1 transition-all duration-300"
                      style={{
                        height: step.segmentH,
                        background: isSegmentActive
                          ? "#e4e6ea"
                          : `linear-gradient(to right, ${step.segment.from}, ${step.segment.to})`,
                        transition: "background 0.4s ease",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Labels */}
        <div className="flex items-center mt-3 px-6">
          {steps.map((step, i) => {
            const isActive = i === value;
            return (
              <div
                key={step.value}
                className="relative z-1 text-sm flex-1 last:flex-none cursor-pointer transition-colors duration-300"
                style={{
                  color:
                    isActive && step.value === 4
                      ? Color(step.color).darken(0.4).string()
                      : isActive
                        ? step.color
                        : "#6b6e76",
                  fontWeight: 400,
                  fontFamily: '"Geist Mono", monospace',
                  fontStyle: "normal",
                }}
                onClick={() => setValue(i)}
              >
                {step.label}

                {isActive ? (
                  <motion.div
                    layoutId="glow"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30px] w-[400px] h-[200px] rounded-[200px/100px] blur-[20px]"
                    style={{ background: `${activeColor}10` }}
                    transition={{ duration: 0.3 }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
