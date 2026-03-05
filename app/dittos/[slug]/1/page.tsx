"use client"

import "./ditto.css"
import Image from "next/image"
import { motion, type Variants } from "motion/react"
import { useState } from "react"


export default function Ditto1() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  const [likedFull, setLikedFull] = useState(false)
  const [likedSmall, setLikedSmall] = useState(false)

  return (
    <div
      className="ditto-1 min-h-screen w-full"
      style={{ background: "var(--c-bg)", fontFamily: "var(--f-body)" }}
    >
      <div className="min-h-screen py-8 rounded-md flex flex-col items-center justify-center">
        <div className="absolute bottom-4 left-4 text-xs text-gray-500">
          Photo by <a href="https://unsplash.com/@robertbye?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Robert Bye</a> on <a href="https://unsplash.com/photos/yellow-car-running-on-the-street-between-the-building-during-daytime-WTPp4wgourk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> and by <a href="https://unsplash.com/@gcmak?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Gordon Mak</a> on <a href="https://unsplash.com/photos/san-francisco-bridge-usa-rX2cj2FD4do?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </div>

        <div className="flex items-baseline gap-[60px]">

          {/* Card Full */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -6,
              scale: 1.015,
              boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.14), 0 28px 64px rgba(0,0,0,0.16), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 0 0 1.5px rgba(255,255,255,0.4)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex flex-col relative w-[330px] h-[560px] bg-white rounded-[40px]
              shadow-[0_2px_4px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.10),_0_20px_48px_rgba(0,0,0,0.12),_inset_0_1.5px_0_rgba(255,255,255,1),_inset_0_0_0_1.5px_rgba(255,255,255,0.4)]"
          >
            <motion.button
              onClick={() => setLikedFull(p => !p)}
              whileTap={{ scale: 0.85 }}
              className="absolute z-10 top-5 right-5 bg-white/10 backdrop-blur-sm rounded-full w-[50px] h-[50px] flex items-center justify-center border border-white/20"
              type="button"
            >
              <motion.svg
                animate={likedFull ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path
                    fill={likedFull ? "#ef4444" : "white"}
                    style={{ transition: "fill 0.2s ease" }}
                    d={likedFull
                      ? "M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62,62,0,0,1,128,48.14,62,62,0,0,1,240,94Z"
                      : "M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z"
                    }
                  />
                </svg>
              </motion.svg>
            </motion.button>

            <div className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] z-[0] rounded-[32px]">
              <Image alt="" src="/ditto1/robert-bye-nyc.jpg" fill={true} className="rounded-[32px]" />
              <div className="gradient-card absolute inset-0 w-full h-full rounded-b-[32px]"  />
            </div>
            <div className="relative z-[1] p-4 mt-auto ml-2 mr-2 mb-2 rounded-b-[32px] shadow-[inset_0px_-8px_24px_2px_rgba(255,255,255,0.6)]">
              <div className="absolute -top-10 bottom-0 left-0 right-0 z-[-1] blurred backdrop-blur-[4px] rounded-b-[32px]" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <motion.h2 variants={fadeUp} className="font-bold text-3xl">New York</motion.h2>
                <motion.p variants={fadeUp} className="text-base text-gray-400">Economy</motion.p>
                <motion.ul variants={fadeUp} className="flex items-center gap-5 mt-4 text-base">
                  <li className="flex gap-2.5">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path className="fill-[#d3d2d2]" d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path></svg>
                    <span>from <span className="font-semibold">$120</span></span></li>
                  <li className="flex gap-2.5">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path className="fill-[#d3d2d2]" d="M185.33,114.21l29.14-27.42.17-.17a32,32,0,0,0-45.26-45.26c0,.06-.11.11-.17.17L141.79,70.67l-83-30.2a8,8,0,0,0-8.39,1.86l-24,24a8,8,0,0,0,1.22,12.31l63.89,42.59L76.69,136H56a8,8,0,0,0-5.65,2.34l-24,24A8,8,0,0,0,29,175.42l36.82,14.73,14.7,36.75.06.16a8,8,0,0,0,13.18,2.47l23.87-23.88A8,8,0,0,0,120,200V179.31l14.76-14.76,42.59,63.89a8,8,0,0,0,12.31,1.22l24-24a8,8,0,0,0,1.86-8.39Zm-.07,97.23-42.59-63.88A8,8,0,0,0,136.8,144c-.27,0-.53,0-.79,0a8,8,0,0,0-5.66,2.35l-24,24A8,8,0,0,0,104,176v20.69L90.93,209.76,79.43,181A8,8,0,0,0,75,176.57l-28.74-11.5L59.32,152H80a8,8,0,0,0,5.66-2.34l24-24a8,8,0,0,0-1.22-12.32L44.56,70.74l13.5-13.49,83.22,30.26a8,8,0,0,0,8.56-2L180.78,52.6A16,16,0,0,1,203.4,75.23l-32.87,30.93a8,8,0,0,0-2,8.56l30.26,83.22Z"></path></svg>
                    <span><span className="font-semibold">JFK</span></span></li>
                </motion.ul>
              </motion.div>
              <motion.button variants={fadeUp} type="button" className="cursor-pointer w-full bg-gradient-to-b from-[#FCFCFC] to-[#F0F0F0] text-[#010101] h-[48px] text-center text-sm rounded-full shadow-sm font-semibold">
                Search flight
              </motion.button>
            </div>
          </motion.div>

          {/* Card Small */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -6,
              scale: 1.015,
              boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.14), 0 28px 64px rgba(0,0,0,0.16), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 0 0 1.5px rgba(255,255,255,0.4)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex flex-col relative w-[330px] h-[560px] bg-white rounded-[40px]
              shadow-[0_2px_4px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.10),_0_20px_48px_rgba(0,0,0,0.12),_inset_0_1.5px_0_rgba(255,255,255,1),_inset_0_0_0_1.5px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute inset-[8px] w-[calc(100%-16px)] h-[325px] z-[0] rounded-[32px]">
              <Image alt="" src="/ditto1/gordon-mak-sf.jpg" fill={true} className="rounded-[32px]" />
            </div>
            <div className="relative z-[1] p-4 mt-auto ml-2 mr-2 mb-2 rounded-b-[32px] shadow-[inset_0px_-8px_24px_2px_rgba(255,255,255,0.6)]">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <motion.h2 variants={fadeUp} className="font-bold text-3xl text-[#212121]">San Francisco</motion.h2>
                <motion.p variants={fadeUp} className="text-base text-gray-400">Premium economy</motion.p>
                <motion.ul variants={fadeUp} className="flex items-center gap-5 mt-4 text-base">
                  <li className="flex gap-2.5 text-black">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path className="fill-[#acacac]" d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path></svg>
                    <span>from <span className="font-semibold">$240</span></span></li>
                  <li className="flex gap-2.5 text-black">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path className="fill-[#acacac]" d="M185.33,114.21l29.14-27.42.17-.17a32,32,0,0,0-45.26-45.26c0,.06-.11.11-.17.17L141.79,70.67l-83-30.2a8,8,0,0,0-8.39,1.86l-24,24a8,8,0,0,0,1.22,12.31l63.89,42.59L76.69,136H56a8,8,0,0,0-5.65,2.34l-24,24A8,8,0,0,0,29,175.42l36.82,14.73,14.7,36.75.06.16a8,8,0,0,0,13.18,2.47l23.87-23.88A8,8,0,0,0,120,200V179.31l14.76-14.76,42.59,63.89a8,8,0,0,0,12.31,1.22l24-24a8,8,0,0,0,1.86-8.39Zm-.07,97.23-42.59-63.88A8,8,0,0,0,136.8,144c-.27,0-.53,0-.79,0a8,8,0,0,0-5.66,2.35l-24,24A8,8,0,0,0,104,176v20.69L90.93,209.76,79.43,181A8,8,0,0,0,75,176.57l-28.74-11.5L59.32,152H80a8,8,0,0,0,5.66-2.34l24-24a8,8,0,0,0-1.22-12.32L44.56,70.74l13.5-13.49,83.22,30.26a8,8,0,0,0,8.56-2L180.78,52.6A16,16,0,0,1,203.4,75.23l-32.87,30.93a8,8,0,0,0-2,8.56l30.26,83.22Z"></path></svg>
                    <span><span className="font-semibold">SFO</span></span></li>
                </motion.ul>
              </motion.div>

              <div className="flex items-center gap-2">
                <motion.button variants={fadeUp} type="button" className="flex-1 cursor-pointer w-full h-[48px] text-center text-sm rounded-full text-white text-center text-sm rounded-full font-semibold border border-[rgba(255,255,255,0.06)] bg-gradient-to-t from-[#2a2a2a] to-[#0a0a0a] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,_0_-1px_0_rgba(0,0,0,0.5)_inset,_0_4px_12px_rgba(0,0,0,0.25),_0_8px_24px_rgba(0,0,0,0.15)]">
                  Search flight
                </motion.button>

                <motion.button
                  onClick={() => setLikedSmall(p => !p)}
                  whileTap={{ scale: 0.85 }}
                  className="shrink-0 bg-white rounded-full w-[48px] h-[48px] flex items-center justify-center border border-gray-800/10"
                  type="button"
                >
                  <motion.svg
                    animate={likedSmall ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <path
                        fill="#ef4444"
                        style={{ transition: "fill 0.2s ease" }}
                        d={likedSmall
                          ? "M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62,62,0,0,1,128,48.14,62,62,0,0,1,240,94Z"
                          : "M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z"
                        }
                      />
                    </svg>
                  </motion.svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
