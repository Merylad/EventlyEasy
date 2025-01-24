import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Event } from "../features/events/state/eventsSlice";
import { formatDate } from "./MyEvents";
import Places from "./Places";
import Todo from "./Todo";
import GuestsManager from "./GuestsManager";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const EventDetails = (): ReactElement => {
  const { eventId } = useParams();
  const [currentEvent, setCurrentEvent] = useState<Event | null>();

  const getCurrentEvent = async () => {
    try {
      const event = await axios.get(`${apiBaseUrl}/api/events/event/${eventId}`);
      setCurrentEvent(event.data.event);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentEvent();
  }, []);

  if (!currentEvent) {
    return <div></div>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-violet-800 text-white py-4">
        <ul className="flex justify-center gap-8">
          <li>
            <a
              href="#locations"
              className="text-lg font-medium hover:underline"
            >
              Locations
            </a>
          </li>
          <li>
            <a
              href="#tasks"
              className="text-lg font-medium hover:underline"
            >
              Tasks
            </a>
          </li>
          <li>
            <a
              href="#guests"
              className="text-lg font-medium hover:underline"
            >
              Guests
            </a>
          </li>
        </ul>
      </nav>

      {/* Event Details */}
      <div className="flex flex-col items-center bg-gray-100 py-8">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-4">
          {currentEvent?.name}
        </h1>
        <h2 className="text-2xl font-medium text-center text-pink-600">
          {formatDate(currentEvent.date)}
        </h2>
      </div>

      {/* Sections */}
      <div id="locations">
        <Places eventId={eventId} />
      </div>

      <div id="tasks">
        <Todo eventId={eventId} />
      </div>

      <div id="guests">
        <GuestsManager eventId={eventId} />
      </div>
    </>
  );
};

export default EventDetails;