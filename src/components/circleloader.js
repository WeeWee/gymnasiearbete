import React from "react";
import { motion } from "framer-motion";

export default function Circleloader() {
  return (
    <div className="pt-16 h-screen w-full justify-center items-center flex">
      <div className="relative w-20 h-20 ">
        <motion.div
          className="block w-20 h-20 border-8 border-gray-100 border-t-8 border-t-blue-600 rounded-full absolute box-border top-0 left-0 "
          animate={{ rotate: 360 }}
          transition={{ loop: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
      </div>
    </div>
  );
}
