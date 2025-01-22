import { ReactElement, useState } from "react";
import { useEffect } from "react";
import { useEventsSelector, useFetchEvents , useFetchAddEvents, useFetchDeleteEvents, useFetchUpdateEvent} from "../features/events/hooks";
import { useUserSelector } from "../features/users/state/hooks";
import { Event } from "../features/events/state/eventsSlice";
import { Link } from "react-router-dom";

export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


const MyEvents = (): ReactElement => {
  const { loggedIn, user, status, error } = useUserSelector();
  const { events } = useEventsSelector();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const getEvents = useFetchEvents();
  const addEvent = useFetchAddEvents();
  const deleteEvent = useFetchDeleteEvents();
  const updateEvent = useFetchUpdateEvent();



  useEffect(() => {
    getEvents(user.id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentEvent) {
      
      updateEvent(currentEvent.id, name, date);
      getEvents(user.id);
     
    } else {
      
      addEvent(user.id, name, date);
      getEvents(user.id);
      
    }

    setIsModalOpen(false);
    
  };

  const handleDeleteEvent = (id: number | string) => {
     deleteEvent(id);
    getEvents(user.id);
  };

  const handleUpdateEvent = (event: Event) => {
    setCurrentEvent(event); 
    setName(event.name); 

    //tranlating the date to display in the form
    const eventDate = new Date(event.date);
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, '0');
    const day = String(eventDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    setIsModalOpen(true); 
  };

  

 

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        My Events
      </h1>

      <button
        onClick={() => {
          setCurrentEvent(null); // Reset for adding new event
          setName(""); // Clear form fields
          setDate("");
          setIsModalOpen(true);
        }}
        className="w-full py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
      >
        Add an Event
      </button>

      {events?.length == 0 && (
      <div>
        <h1 className="text-3xl font-bold text-center my-8">You don't have any event yet :)</h1>          
      </div>
  )}

      <div className="space-y-6">
        {events.map((event : Event) => {
          return (
            <div
              key={event.id}
              className="relative p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {event.name}
              </h3>
              <h4 className="text-lg text-gray-600">
                {formatDate(event.date)}
              </h4>

              <button
                className="absolute top-4 right-6 px-4 py-2 bg-pink-400 text-white text-sm font-medium rounded-md hover:bg-pink-500 transition w-28"
                onClick={() => handleUpdateEvent(event)}
              >
                Update
              </button>

              <div className="mt-4 flex justify-between items-center">
              <Link
              to={`/event/${event.id}`}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition w-28"
            >
              View Details
            </Link>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition w-28"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {currentEvent ? "Update Event" : "Add New Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="eventName"
                  className="block text-gray-700 font-medium"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-gray-700 font-medium"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentEvent ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;