"use client";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Updates"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Help Center", "Guides", "API"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-wide">RYDEX</h2>
            <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-sm">
              Book any vehicle from bikes to trucks. Reliable, affordable, and built for modern transport needs.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6">
              {[FaFacebook, FaInstagram, FiTwitter, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -4 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} RYDEX. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;