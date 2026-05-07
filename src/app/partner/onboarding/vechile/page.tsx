"use client";
import { ArrowLeft, Bike, Car, Package, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VECHILE = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 Wheeler" },
  { id: "auto", label: "Auto", icon: Car, desc: "3 Wheeler" },
  { id: "car", label: "Car", icon: Car, desc: "4 Wheeler" },
  { id: "loading", label: "Loading", icon: Package, desc: "Small goods" },
  { id: "truck", label: "Truck", icon: Truck, desc: "Heavy transport" },
];

const VechileOnBoarding = () => {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("")
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-300 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-xs text-gray-500 font-medium"> step 1 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Vehicle Details</h1>
          <p className="text-sm text-gray-500 mt-2">
            Add Your Vehicle Information
          </p>
          <div className="mt-8 space-y-6">

            <div>
                <p className="text-xs font-semibold text-gray-500 mb-3">Vehicle Type</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {VECHILE.map((v,i) => {
                        const Icon = v.icon;
                        const isActive = vehicleType === v.id;
                        return (
                            <motion.div
                            whileHover={{ scale: 1.05}}
                            whileTap={{ scale: 0.96}}
                            onClick={() => setVehicleType(v.id)}
                            className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition 
                            ${isActive ? "bg-black text-white border-black": "border-gray-200 hover:border-black"}    
                            `}
                            key={i}>

                                <div className={`w-11 h-11 rounded-full flex justify-center items-center
                                ${
                                    isActive ? "bg-white text-black" : "bg-black text-white"
                                    }    
                                `}>
                                    <Icon/>
                                </div>

                                <div className="text-sm font-semibold">
                                    {v.label}
                                </div>

                                <p className={`text-xs ${isActive ? "text-gray-300" : "text-gray-500"}`}>{v.desc}</p>

                            </motion.div>
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VechileOnBoarding;
