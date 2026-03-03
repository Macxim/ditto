"use client"

import "./ditto.css"
import { useEffect, useState } from "react";
import Card from "./Card";
import { colors, logos, salaryRanges, tags, titles } from "./data";
import { motion, useMotionValue, animate } from "motion/react";

type Mode = "stack" | "shuffle" | "grid";

type DataItem = {
  id: number;
  logo: string;
  title: string;
  salaryRange: string;
  tags: string[];
  color: string;
  postedAt: number;
  resetKey?: number;
};

function generateOffsets(count: number) {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 450,
    y: (Math.random() - 0.5) * 350,
    rotation: (Math.random() - 0.5) * 20,
  }));
}

function DraggableCard({
  item,
  targetX,
  targetY,
  targetRotate,
  index,
  resetKey,
  mode,
}: {
  item: DataItem;
  targetX: number;
  targetY: number;
  targetRotate: number;
  index: number;
  resetKey: number;
  mode: Mode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (mode === "grid") return;
    animate(x, targetX, {
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: index * 0.05,
    });
    animate(y, targetY, {
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: index * 0.05,
    });
  }, [targetX, targetY, resetKey, mode]);

  return (
    <motion.div
      layout
      className="cursor-grab active:cursor-grabbing"
      style={
        mode === "grid"
          ? { rotate: 0 }
          : {
              position: "absolute",
              inset: 0,
              x,
              y,
              rotate: targetRotate,
              zIndex: index,
            }
      }
      drag
      dragMomentum={false}
      dragElastic={0}
      whileDrag={{ scale: 1.02, zIndex: 100 }}
    >
      <Card
        logo={item.logo}
        title={item.title}
        salary={item.salaryRange}
        tags={item.tags}
        color={item.color}
        postedAt={item.postedAt.toString()}
      />
    </motion.div>
  );
}

export default function Ditto0() {
  const [mode, setMode] = useState<Mode>("stack");

  const [data, setData] = useState<DataItem[]>(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: titles[Math.floor(Math.random() * titles.length)],
      tags: Array.from(
        { length: 2 },
        () => tags[Math.floor(Math.random() * tags.length)],
      ),
      salaryRange:
        salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      postedAt: Math.floor(Math.random() * 90) + 1,
      logo: logos[Math.floor(Math.random() * logos.length)],
    })),
  );

  const [offsets, setOffsets] = useState(() => generateOffsets(data.length));
  const [resetKey, setResetKey] = useState(0);

  function handleGrid() {
    setMode("grid");
    setResetKey((k) => k + 1);
  }

  function handleStack() {
    setMode("stack");
    setResetKey((k) => k + 1);
  }

  function handleShuffle() {
    setData((prev) => [...prev].sort(() => Math.random() - 0.5));
    setOffsets(generateOffsets(data.length));
    setMode("shuffle");
    setResetKey((k) => k + 1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleShuffle();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const buttonClass =
    "rounded-sm px-2 py-1 text-sm font-semibold text-violet-50";

  return (
    <div
      className="ditto-0 min-h-screen w-full"
      style={{ background: "var(--c-bg)", fontFamily: "var(--f-body)" }}
    >
      <div
      className={`m-4 rounded-md flex flex-col items-center justify-center bg-violet-100 relative border border-violet-800/5 ${
        mode === "grid"
          ? "min-h-screen py-8"
          : "w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]"
      }`}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button type="button" className={`bg-violet-500 hover:bg-violet-600 ${buttonClass}`} onClick={handleGrid}>
          Grid
        </button>
        <button type="button" className={`bg-violet-600 hover:bg-violet-700 ${buttonClass}`} onClick={handleStack}>
          Stack
        </button>
        <button type="button" className={`bg-violet-700 hover:bg-violet-800 ${buttonClass}`} onClick={handleShuffle}>
          Shuffle
        </button>
      </div>

      <div
        className={
          mode === "grid"
            ? "grid grid-cols-3 gap-4 p-4"
            : "relative w-96 h-[28rem]"
        }
      >
        {data.map((item, i) => (
          <DraggableCard
            key={item.id}
            item={item}
            index={i}
            mode={mode}
            targetX={mode === "shuffle" ? offsets[i].x : 0}
            targetY={mode === "shuffle" ? offsets[i].y : 0}
            targetRotate={mode === "shuffle" ? offsets[i].rotation : 0}
            resetKey={resetKey}
          />
        ))}
      </div>
    </div>
    </div>
  )
}
