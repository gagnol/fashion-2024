"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";
import {  Text } from "@radix-ui/themes";
import SigninTool from "./SigninTool";

const Navbar = () => {

  return (
    <div
      className="w-full h-[65px] top-0 z-1 px-10"
    >
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <div className="hidden xl:flex h-auto w-auto xl:flex-row items-center">
          <Text size="6"> Dashboard </Text>
        </div>
   
        <div className="hidden xl:flex xl:flex-row gap-5">
            <SigninTool/>
        </div>
      
</div>

    </div>
  );
};

export default Navbar;
