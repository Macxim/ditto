"use client";

import "./ditto.css";
import { motion, type Variants } from "motion/react";

const features = [
  {
    id: "row-detail",
    title: "Row detail spaces",
    description: "Render content between rows, including expanded detail panels or nested relationships.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <line x1="3" y1="4" x2="21" y2="4"/>
          <polyline points="3,9 6,12 3,15"/>
          <line x1="10" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="20" x2="21" y2="20"/>
        </g>
      </svg>
    )
  },
  {
    id: "dynamic-heights",
    title: "Dynamic row heights",
    description: "Choose fixed or variable row heights to match the content you want to display.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <line x1="3" y1="2" x2="21" y2="2"/>
          <rect x="3" y="7.5" width="18" height="9" rx="2"/>
          <line x1="9" y1="8" x2="9" y2="16" strokeWidth="1.2"/>
          <line x1="15" y1="8" x2="15" y2="16" strokeWidth="1.2"/>
          <line x1="3" y1="22" x2="21" y2="22"/>
        </g>
      </svg>
    )
  },
  {
    id: "pagination",
    title: "Row pagination",
    description: "Use pagination instead of displaying all rows in a single scrollable container.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="m3 10l-2 2l2 2"/>
          <path d="m21 10l2 2l-2 2"/>
          <rect width="10" height="10" x="7" y="7" rx="3"/>
        </g>
      </svg>
    )
  },
  {
    id: "full-width",
    title: "Full width rows",
    description: "Special rows spanning the entire viewport to highlight specific grid sections easily.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <line x1="3" y1="3" x2="3" y2="21"/>
          <line x1="21" y1="3" x2="21" y2="21"/>
          <line x1="6" y1="12" x2="18" y2="12"/>
          <polyline points="9,9 6,12 9,15"/>
          <polyline points="15,9 18,12 15,15"/>
        </g>
      </svg>
    )
  },
  {
    id: "pinning",
    title: "Row and column pinning",
    description: "Pin rows and columns to keep important data visible while scrolling through large datasets.",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256"><path d="M235.32,81.37,174.63,20.69a16,16,0,0,0-22.63,0L98.37,74.49c-10.66-3.34-35-7.37-60.4,13.14a16,16,0,0,0-1.29,23.78L85,159.71,42.34,202.34a8,8,0,0,0,11.32,11.32L96.29,171l48.29,48.29A16,16,0,0,0,155.9,224c.38,0,.75,0,1.13,0a15.93,15.93,0,0,0,11.64-6.33c19.64-26.1,17.75-47.32,13.19-60L235.33,104A16,16,0,0,0,235.32,81.37ZM224,92.69h0l-57.27,57.46a8,8,0,0,0-1.49,9.22c9.46,18.93-1.8,38.59-9.34,48.62L48,100.08c12.08-9.74,23.64-12.31,32.48-12.31A40.13,40.13,0,0,1,96.81,91a8,8,0,0,0,9.25-1.51L163.32,32,224,92.68Z"></path></svg>
    )
  },
  {
    id: "floating-header",
    title: "Floating header row",
    description: "Keep the header row always visible as users scroll through long datasets.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="2" width="22" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="1" y1="8" x2="23" y2="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1 5 Q1 2 6 2 L18 2 Q23 2 23 5 L23 8 L1 8 Z" fill="currentColor" fillOpacity="0.5"/>
      </svg>
    )
  },
];

export default function Ditto3() {
  return (
    <div className="ditto-3 min-h-[calc(100vh-12rem)] w-full p-6" style={{ background: "var(--c-bg)" }}>
      <div className="py-8 flex flex-col items-center justify-center">
        <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
          <defs>
            <pattern id="hatch" width="12" height="12" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="12" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hatch)"/>
        </svg>

        <div className="w-full max-w-4xl grid grid-cols-2 relative z-1 border border-dashed border-[rgba(255,255,255,0.12)]">
          {features.map((feature, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const isLastRow = row === Math.floor((features.length - 1) / 2);

            return (
              <motion.div
                key={feature.id}
                className="px-10 py-8 bg-[#070b0f] transition-transform duration-300 ease-in-out"
                style={{
                  borderRight: col === 0 ? "1px dashed rgba(255,255,255,0.12)" : "none",
                  borderBottom: !isLastRow ? "1px dashed rgba(255,255,255,0.12)" : "none",
                  position: "relative",
                }}
                initial="idle"
                whileHover="hovered"
              >
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-base text-white/70">{feature.description}</p>

                <motion.div
                  className="highlight"
                  variants={{
                    idle:    { opacity: 0 },
                    hovered: { opacity: 1 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
