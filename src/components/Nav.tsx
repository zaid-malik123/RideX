"use client";
import { motion } from "motion/react";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ["Home", "Bookings", "Contact Us", "About Us"];

const Nav = () => {
  const pathName = usePathname()
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-xl shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Image src={logo} height={44} width={44} priority alt="logo" />
      </div>

      <div>
        {NavItems.map((item, idx) => {
          const href = `/${item.toLowerCase()}`
          const active = href == pathName
          return  <Link className={`text-sm font-medium transition ${
            active ? "text-white" : "text-gray-400 hover:text-white"
          }`} key={idx} href={href}>
            {item}
          </Link>
        })}
      </div>
    </motion.div>
  );
};

export default Nav;
