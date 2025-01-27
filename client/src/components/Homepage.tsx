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
        const eventDate = new Date(selectedEvent.date).setHours(0, 0, 0, 0); // Midnight of the event date
        const now = new Date().setHours(0, 0, 0, 0); // Midnight of today
  
        const timeDiff = eventDate - now;
  
        if (timeDiff < 0) {
          // Event is in the past
          setCountdown("🎉 Event already behind! Hope you enjoyed!");
          clearInterval(interval);
        } else if (timeDiff === 0) {
          // Today is the event day
          setCountdown("🎉 D-Day! Have an amazing party 🎉🎊");
          clearInterval(interval); // No need to update further
        } else {
          // Future event
          const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Round up to the nearest whole day
          setCountdown(`${days} day${days > 1 ? "s" : ""} left to celebrate 🎉 !`);
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
      {/* Logo Section */}
      <div>
        <img src={logo} alt="logo" className="w-full" />
      </div>
  
      {!loggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-4 text-center">
            Welcome to EventlyEasy
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-4 text-center">
            <span className="font-semibold text-purple-800">EventlyEasy</span> is your go-to app for organizing events, whether they're big or small. It simplifies event planning with tools that are intuitive and easy to use.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-4 text-center">
            From managing guest lists to handling tasks and tracking locations, EventlyEasy helps you stay on top of every detail. Plus, with built-in budget management, you can plan your events without the stress of overspending.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-6 text-center">
            Make every event memorable by keeping everything in one place. Start your journey to effortless event planning today with EventlyEasy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href="/register"
              className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white text-base sm:text-lg font-medium rounded-md hover:bg-purple-700 transition text-center"
            >
              Register
            </a>
            <a
              href="/login"
              className="w-full sm:w-auto px-6 py-2 bg-pink-600 text-white text-base sm:text-lg font-medium rounded-md hover:bg-pink-700 transition text-center"
            >
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-pink-100 min-h-screen flex flex-col items-center pt-12 px-4 sm:px-8">
          {/* Event Selection Dropdown */}
          <div className="w-full max-w-sm">
            <label
              htmlFor="events"
              className="block text-lg sm:text-xl font-semibold text-purple-700 mb-4 text-center"
            >
              Select an Event
            </label>
            <select
              name="events"
              id="events"
              value={eventId}
              onChange={(e) => handleSelect(e.target.value)}
              className="block w-full px-4 py-3 border border-purple-300 bg-white text-gray-700 text-base sm:text-lg rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="-1">Select an event</option>
              {Array.isArray(events) &&
                events.map((event) => (
                  <option value={event.id} key={event.id}>
                    {event.name}
                  </option>
                ))}
            </select>
          </div>
  
          {/* Event Details */}
          {selectedEvent ? (
            <>
              <div className="mt-12 text-center px-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-purple-700">
                  {selectedEvent.name}
                </h2>
                <p className="text-lg sm:text-2xl text-gray-600 mt-4">
                  {formatDate(new Date(selectedEvent.date))}
                </p>
                <div className="mt-6">
                  <p className="text-xl sm:text-3xl font-bold text-pink-500">{countdown}</p>
                </div>
              </div>
  
              <div className="mt-8 w-full px-4 sm:px-0">
                <BudgetManager eventId={eventId} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-16 px-6 py-12 bg-white rounded-lg shadow-xl max-w-lg text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">
                No Event Selected
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                Please select an event from the dropdown above to view its details and budget summary.
              </p>
              <img
                src={planning}
                alt="Placeholder illustration"
                className="w-56 sm:w-72 h-auto mb-6"
              />
              <p className="text-gray-500 italic">
                "An event well planned is an event well celebrated!"
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Homepage;
