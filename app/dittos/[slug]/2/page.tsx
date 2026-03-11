"use client";

import "./ditto.css";
import { motion, type Variants } from "motion/react";

type Stat = {
  value: string;
  label: string;
  extra?: boolean;
};

const stats: Stat[] = [
  { value: "312", label: "Members", extra: true },
  { value: "84", label: "Articles" },
  { value: "156", label: "Studies" },
  { value: "89", label: "Active/week" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  hover: {
    y: -4,
    boxShadow:
      "0 12px 24px rgba(40,70,200,0.25), 0 36px 80px rgba(40,70,200,0.38)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: 0.15 + i * 0.07 },
  }),
};

export default function Ditto2() {
  return (
    <div
      className="ditto-2 min-h-screen w-full p-6"
      style={{ background: "var(--c-bg)", fontFamily: "Inter" }}
    >
      <div className="min-h-screen py-8 rounded-md flex flex-col items-center justify-center">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="w-full sm:w-6/10 p-10 rounded-[48px] card"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            className="text-[2.5rem] mb-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            Strategy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.92 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 text-white/80 text-lg max-w-[80%]"
          >
            A community focused on strategic planning, vision, long-term goals
            and decision-making processes. We discuss new approaches, framework
            and real practice.
          </motion.p>

          <dl className="flex flex-wrap gap-10 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`flex flex-col-reverse ${i === 1 || i === 2 ? `lg:mr-20` : null}`}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
              >
                <dt
                  className="text-xs flex items-center gap-1 flex-1"
                  style={{ opacity: 0.85 }}
                >
                  {stat.label}
                  {stat.extra && (
                    <>
                      <span className="w-0.5 h-0.5 rounded-full bg-white"></span>
                      <motion.button
                        type="button"
                        className="underline underline-offset-2"
                        whileHover={{ opacity: 1 }}
                        style={{
                          opacity: 0.85,
                          transition: "opacity 0.15s",
                          cursor: "pointer",
                        }}
                      >
                        Show members
                      </motion.button>
                    </>
                  )}
                </dt>
                <dd className="text-3xl font-bold mb-0.5 tracking-tight">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>

          <motion.div
            className="flex flex-col sm:flex-row items-end gap-3 sm=gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.45 }}
          >
            <motion.button
              type="button"
              aria-pressed="true"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="w-full sm:w-auto cursor-pointer flex items-center gap-2 font-medium rounded-xl px-5 py-2.5 text-black bg-white border-[0.5px] border-[rgba(18,74,192,1)]"
            >
              <svg
                className="w-5 h-5 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              Following
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.22)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ backgroundColor: "rgba(255,255,255,0.14)" }}
              animate={{ backgroundColor: "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.15 }}
              className="w-full sm:w-auto cursor-pointer flex items-center gap-2 font-medium rounded-xl bg-white/[.14] px-5 py-2.5"
            >
              <svg
                className="w-5 h-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"></path>
              </svg>
              Share
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.22)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ backgroundColor: "rgba(255,255,255,0.14)" }}
              animate={{ backgroundColor: "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.15 }}
              className="w-full sm:w-auto cursor-pointer flex items-center gap-2 font-medium rounded-xl bg-white/[.14] px-5 py-2.5"
            >
              <svg
                className="w-5 h-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
              </svg>
              Invite
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
