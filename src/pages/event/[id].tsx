// pages/event/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utils/api";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventDetail = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get(`/events/${id}`).then((response) => setEvent(response.data));
    }
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
    </div>
  );
};

export default EventDetail;
