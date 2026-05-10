"use client";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  CreditCard,
  Landmark,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const BankDetails = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-300 shadow-[0_25px_70px_rgba(0,0,0,0.15) p-6 sm:p-8]"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-xs text-gray-500 font-medium"> step 3 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Bank & Payout Setup</h1>
          <p className="text-sm text-gray-500 mt-2">Used for Partner Payouts</p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="ahn"
            >
              Acount holder Name
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <BadgeCheck />
              </div>
              <input
                id="ahn"
                className="flex-1 border-b pb-2 text-sm focus:outline-0 border-gray-300 focus:border-black"
                placeholder="As per Bank Records"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="an">
              Acount Name
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <CreditCard />
              </div>
              <input
                id="an"
                className="flex-1 border-b pb-2 text-sm focus:outline-0 border-gray-300 focus:border-black"
                placeholder="As per Bank Records"
                type="text"
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="ifsc"
            >
              IFSC Code
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Landmark />
              </div>
              <input
                id="ifsc"
                className="flex-1 border-b pb-2 text-sm focus:outline-0 border-gray-300 focus:border-black"
                placeholder="As per Bank Records"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="mn">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Phone />
              </div>
              <input
                id="mn"
                className="flex-1 border-b pb-2 text-sm focus:outline-0 border-gray-300 focus:border-black"
                placeholder="As per Bank Records"
                type="text"
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="ahn"
            >
              UPI ID (optional)
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="ahn"
                className="flex-1 border-b pb-2 text-sm focus:outline-0 border-gray-300 focus:border-black"
                placeholder="As per Bank Records"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
          <CheckCircle size={16} className="mt-[0.5]" />
          <p>
            {" "}
            Bank details are verified before first payout. This usually takes
            24-48 hrs.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center disabled:opacity-40 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BankDetails;
