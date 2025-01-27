import { ReactElement, useEffect, useState } from "react";
import logo from "../images/logo.png";
import planning from '../images/planning.jpeg'
import { useUserSelector } from "../features/users/state/hooks";
import { useEventsSelector, useFetchEvents } from "../features/events/hooks";
import { formatDate } from "./MyEvents";
import BudgetManager from "./BudgetManager";

const Homepage = (): ReactElement => {
  const { loggedIn, user } = useUserSelector();
  const { events } = useEventsSelector();
  const getEvents = useFetchEvents();
  const [eventId, setEventId] = useState<string | number>("");
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; date: Date } | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    getEvents(user.id);
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      const interval = setInterval(() => {
        const eventDate = new Date(selectedEvent.date).getTime();
        const now = Date.now();
        const timeDiff = eventDate - now;

        if (timeDiff <= 0) {
          setCountdown("🎉 Event already behind! Hope you enjoyed!");
          clearInterval(interval);
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          setCountdown(`${days} days left to celebrate 🎉 !`);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount or event change
    }
  }, [selectedEvent]);

  const handleSelect = (eventId: string) => {
    setEventId(eventId);

    // Find the selected event
    const selected = events.find((event) => event.id.toString() === eventId);

    // Convert the date property to a string before setting state
    if (selected) {
      setSelectedEvent({
        name: selected.name,
        date: selected.date, // Convert Date to ISO string
      });
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <>
      <div>
        <img src={logo} alt="logo" className="w-full" />
      </div>
      {!loggedIn && (
        <div className="flex flex-col items-center justify-center h-screen -mt-40">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-4">
            Welcome to EventlyEasy
          </h1>
          <p className="text-lg text-gray-700 mb-4 text-center">
            <span className="font-semibold text-purple-800">EventlyEasy</span> is your go-to app for organizing events, whether they're big or small. It simplifies event planning with tools that are intuitive and easy to use.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            From managing guest lists to handling tasks and tracking locations, EventlyEasy helps you stay on top of every detail. Plus, with built-in budget management, you can plan your events without the stress of overspending.
          </p>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Make every event memorable by keeping everything in one place. Start your journey to effortless event planning today with EventlyEasy!
          </p>
          <div className="flex gap-4">
            <a
              href="/register"
              className="px-6 py-2 bg-purple-600 text-white text-lg font-medium rounded-md hover:bg-purple-700 transition"
            >
              Register
            </a>
            <a
              href="/login"
              className="px-6 py-2 bg-pink-600 text-white text-lg font-medium rounded-md hover:bg-pink-700 transition"
            >
              Login
            </a>
          </div>
        </div>
      )}

<div className="bg-pink-100 min-h-screen flex flex-col items-center pt-12">
  {/* Select Dropdown */}
  <div className="w-full max-w-sm">
    <label
      htmlFor="events"
      className="block text-xl font-semibold text-purple-700 mb-4 text-center"
    >
      Select an Event
    </label>
    <select
      name="events"
      id="events"
      value={eventId}
      onChange={(e) => handleSelect(e.target.value)}
      className="block w-full px-4 py-3 border border-purple-300 bg-white text-gray-700 text-lg rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500"
    >
      <option value="-1">Select an event</option>
      {events.map((event) => (
        <option value={event.id} key={event.id}>
          {event.name}
        </option>
      ))}
    </select>
  </div>

  {/* Event Details or Fallback */}
  {selectedEvent ? (
    <>
      <div className="mt-16 text-center">
        <h2 className="text-5xl font-bold text-purple-700">
          {selectedEvent.name}
        </h2>
        <p className="text-2xl text-gray-600 mt-4">
          {formatDate(new Date(selectedEvent.date))}
        </p>
        <div className="mt-6">
          <p className="text-3xl font-bold text-pink-500">{countdown}</p>
        </div>
      </div>

      <div>
        <BudgetManager eventId={eventId} />
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center mt-20 px-6 py-12 bg-white rounded-lg shadow-xl max-w-lg text-center">
      <h2 className="text-4xl font-bold text-purple-700 mb-4">
        No Event Selected
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Please select an event from the dropdown above to view its details and budget summary.
      </p>
      <img
        src={planning}
        alt="Placeholder illustration"
        className="w-72 h-auto mb-6"
      />
      <p className="text-gray-500 italic">
        "An event well planned is an event well celebrated!"
      </p>
    </div>
  )}
</div>
    </>
  );
};

export default Homepage;
