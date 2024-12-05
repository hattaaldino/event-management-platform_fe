// pages/dashboard/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import Navbar from "@/components/Navbar";

// Define the type for event data
interface Event {
  id: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch {
        router.push("/auth/login");
      }
    };

    fetchEvents();
  }, [router]);

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button onClick={() => router.push(`/event/${event.id}`)}>Detail</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
