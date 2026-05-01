"use client";
import axios from "axios";
import { Loader2, Lock, Mail, User, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type props = {
  open: boolean;
  onClose: () => void;
};

type StepType = "login" | "signUp" | "otp";
const AuthModal = ({ open, onClose }: props) => {
  const [step, setStep] = useState<StepType>("login");

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const {data} = await axios.post("/api/auth/register", {
        name,
        email,
        password
      })

      console.log(data)

      setLoading(false)
    } catch (error: unknown) {
      setLoading(false)
      if(error instanceof Error) {
        console.log(error)
      }
      console.log(error)
    }
  }

  return (
    <>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                <div
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-500 hover:text-black transition"
                >
                  <X size={20} />
                </div>

                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">
                    RYDEX
                  </h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Primum Vechile Booking
                  </p>
                </div>

                <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition">
                  <Image
                    height={20}
                    width={20}
                    src={"/google.png"}
                    alt="google"
                  />
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-xs text-gray-500">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>

                <div>
                  {step === "login" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Welcome back</h1>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-0 text-sm" type="email" placeholder="Email" />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent outline-0 text-sm" type="password" placeholder="Password" />
                        </div>

                        <button className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">Login</button>
                      </div>

                      <p className="text-gray-500 mt-6 text-center text-sm">{"Don't have an account"} <span onClick={() => setStep("signUp")} className="text-black font-medium hover:underline">SignUp</span></p>
                    </motion.div>
                  )}
                  {step === "signUp" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Create Account</h1>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User size={18} className="text-gray-500" />
                          <input onChange={(e) => setName(e.target.value)} className="w-full bg-transparent outline-0 text-sm" type="text" placeholder="FullName" />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-0 text-sm" type="email" placeholder="Email" />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent outline-0 text-sm" type="password" placeholder="Password" />
                        </div>

                        <button onClick={handleSignUp} className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center">{loading ? <Loader2/> : "Sing Up" }</button>
                      </div>

                      <p className="text-gray-500 mt-6 text-center text-sm">Already have an account <span onClick={() => setStep("login")} className="text-black font-medium hover:underline">Login</span></p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AuthModal;
