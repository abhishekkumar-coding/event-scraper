"use client"
import useSWR from "swr";
import EventCard from "./components/EventCard";
import EventSkeleton from "./components/EventSkeleton";

const fetcher = () => fetch("/api/events").then((res) => res.json());

interface Event {
  _id: string;
  img: string;
  title: string;
  date: string;
  link: string;
}

export default function Home() {
  const { data: events, error } = useSWR<Event[]>("/api/events", fetcher);

  if (error) return <div className="text-red-500 text-center mt-5">Error loading events.</div>;
  if (!events) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center my-6">Sydney Events</h1>
        <div className="grid grid-cols-1 w-[100vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-full">
              <EventSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className=" bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Sydney Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
