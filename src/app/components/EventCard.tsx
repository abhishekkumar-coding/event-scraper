"use client"
import Image from "next/image";
import { useState } from "react";

interface EventProps {
  event: {
    img: string;
    title: string;
    date: string;
    link: string;
  };
}

export default function EventCard({ event }: EventProps) {
  const [email, setEmail] = useState<string>("");
  console.log(email)

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        window.location.href = event.link; // Redirect to event page
      } else {
        console.error("Subscription failed");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
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
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mt-3 rounded"
      />
      <button
        onClick={handleSubscribe}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        GET TICKETS
      </button>
    </div>
  );
}
