"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EventProps {
  event: {
    img: string;
    title: string;
    date: string;
    link: string;
  };
}

export default function EventCard({ event }: EventProps) {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("")
  const [number, setNumber] = useState("");
  const [numberCode, setNumberCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = Enter email & number, 2 = Enter OTP
  const router = useRouter(); // Use Next.js router

  const handleSendOtp = async () => {
    if (!email.trim() || !number.trim()) {
      alert("Email and Number are required.");
      return;
    }

    console.log(date)
    
    setLoading(true);

    try {
      const response = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, number: `${numberCode}${number}` }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep(2);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      alert("Please enter OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      router.push(event.link); // Navigate using Next.js router
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="event-card bg-white shadow-md rounded-lg p-4">
      <Image
        src={event.img}
        alt={event.title}
        width={400}
        height={300}
        className="w-full h-60 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{event.title}</h2>
      <p className="text-gray-600">{event.date}</p>

      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mt-3 rounded"
          />

          <div className="mt-3 flex gap-2">
            <select
              value={numberCode}
              onChange={(e) => setNumberCode(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="number"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
          </div>
          <div>
          <input type="date"
           value={date}
           onChange={(e)=>setDate(e.target.value)}
           className="border py-2 px-5"/>
           </div>

          <button
            onClick={handleSendOtp}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading || !email || !number}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full mt-3 rounded"
          />

          <button
            onClick={handleVerifyOtp}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
            disabled={loading || !otp}
          >
            {loading ? "Verifying..." : "Verify & Get Tickets"}
          </button>
        </>
      )}
    </div>
  );
}
