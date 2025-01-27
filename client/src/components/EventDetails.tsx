import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Event } from "../features/events/state/eventsSlice";
import { formatDate } from "./MyEvents";
import Places from "./Places";
import Todo from "./Todo";
import GuestsManager from "./GuestsManager";
import CateringManager from "./CateringManager";
import ExpensesManager from "./ExpensesManager";

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
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 px-2 sm:px-4 text-center">
          <li>
            <a
              href="#locations"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Locations
            </a>
          </li>
          <li>
            <a
              href="#tasks"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Tasks
            </a>
          </li>
          <li>
            <a
              href="#guests"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Guests
            </a>
          </li>
          <li>
            <a
              href="#catering"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Catering
            </a>
          </li>
          <li>
            <a
              href="#expenses"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Expenses
            </a>
          </li>
        </ul>
      </nav>
  
      {/* Event Details */}
      <div className="flex flex-col items-center bg-gray-100 py-6 px-4 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-purple-800 mb-3 sm:mb-4">
          {currentEvent?.name}
        </h1>
        <h2 className="text-lg sm:text-2xl font-medium text-pink-600">
          {formatDate(currentEvent.date)}
        </h2>
      </div>
  
      {/* Sections */}
      <div id="locations" className="px-4 sm:px-6 py-6">
        <Places eventId={eventId} />
      </div>
  
      <div id="tasks" className="px-4 sm:px-6 py-6">
        <Todo eventId={eventId} />
      </div>
  
      <div id="guests" className="px-4 sm:px-6 py-6">
        <GuestsManager eventId={eventId} />
      </div>
  
      <div id="catering" className="px-4 sm:px-6 py-6">
        <CateringManager eventId={eventId} />
      </div>
  
      <div id="expenses" className="px-4 sm:px-6 py-6">
        <ExpensesManager eventId={eventId} />
      </div>
    </>
  );
};

export default EventDetails;