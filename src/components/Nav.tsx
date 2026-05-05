"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Bike, Car, ChevronRight, LogOut, Menu, Truck, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { setUserData } from "@/redux/slices/userSlice";

const NavItems = ["Home", "Bookings", "Contact Us", "About Us"];

const Nav = () => {
  const pathName = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    dispatch(setUserData(null));
    setProfileOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-xl shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Image src={logo} height={44} width={44} priority alt="logo" />
          <div className="md:flex gap-10 items-center hidden">
            {NavItems.map((item, idx) => {
              let href;
              if (item === "Home") {
                href = "/";
              } else {
                href = `/${item.toLowerCase()}`;
              }
              const active = href == pathName;
              return (
                <Link
                  className={`text-sm font-medium transition ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  key={idx}
                  href={href}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div className="hidden md:block relative">
            {!userData ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-1.5 rounded-full bg-white text-black text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-11 h-11 rounded-full bg-white text-black text-xl font-bold"
              >
                {userData.name.charAt(0).toLowerCase()}
              </button>
            )}

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-14 right-0 w-[300px] bg-white text-black rounded-2xl shadow-xl border"
                >
                  <div className="p-5">
                    <p className="font-semibold text-lg">{userData?.name}</p>
                    <p className="text-xs uppercase text-gray-500 mb-4">
                      {userData?.role}
                    </p>
                    {userData?.role != "partner" && (
                      <div className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                            <Bike size={14} />
                          </div>
                          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                            <Car size={14} />
                          </div>
                          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                            <Truck size={14} />
                          </div>
                        </div>
                        Become a Partner
                        <ChevronRight className="ml-auto" size={16} />
                      </div>
                    )}

                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2"
                    >
                      <LogOut />
                      LogOut
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className=" md:hidden relative flex items-center gap-3">
            {!userData ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-1.5 rounded-full bg-white text-black text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-11 h-11 rounded-full bg-white text-black text-xl font-bold"
              >
                {userData.name.charAt(0).toLowerCase()}
              </button>
            )}

            <button onClick={() => setMenuOpen((p) => !p)}>
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[85px] left-1/2 -translate-x-1/2 w-[92%]
            bg-[#0B0B0B] rounded-2xl shadow-2xl z-40 md:hidden overflow-hidden
            "
            >
              <div className="flex flex-col divide-y divide-white/10">
                {NavItems.map((item, idx) => {
                  let href;
                  if (item === "Home") {
                    href = "/";
                  } else {
                    href = `/${item.toLowerCase()}`;
                  }
                  const active = href == pathName;
                  return (
                    <Link
                      className="px-6 py-4 text-gray-300 hover:bg-white/5"
                      key={idx}
                      href={href}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && userData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden"
            >
              <div className="p-5">
                <p className="font-semibold text-lg">{userData?.name}</p>
                <p className="text-xs uppercase text-gray-500 mb-4">
                  {userData?.role}
                </p>
                {userData?.role != "partner" && (
                  <div className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Bike size={14} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Car size={14} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Truck size={14} />
                      </div>
                    </div>
                    Become a Partner
                    <ChevronRight className="ml-auto" size={16} />
                  </div>
                )}

                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2"
                >
                  <LogOut />
                  LogOut
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;
