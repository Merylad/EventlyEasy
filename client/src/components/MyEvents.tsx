import { ReactElement, useState } from "react";
import { useEffect } from "react";
import { useEventsSelector, useFetchEvents , useFetchAddEvents, useFetchDeleteEvents} from "../features/events/hooks";
import { useUserSelector } from "../features/users/state/hooks";


const MyEvents = ():ReactElement => {
    const { loggedIn, user, status, error } = useUserSelector()
    const {events} = useEventsSelector()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const getEvents = useFetchEvents()
    const addEvent = useFetchAddEvents()
    const deleteEvent = useFetchDeleteEvents()
    

    const formatDate = (date: Date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };

    useEffect(() => {
        getEvents(user.id)
    },[])

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault()
        addEvent(user.id, name, date)
        
        setIsModalOpen(false)
        getEvents(user.id)
    }

    const handleDeleteEvent = (id : number | string) => {
        deleteEvent(id)
        getEvents(user.id)
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">

          <h1 className="text-3xl font-semibold text-center text-gray-800">My Events</h1>

          <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
      >
        Add an Event
      </button>
    
          <div className="space-y-6">
            {events.map((event) => {
              return (
                <div key={event.id} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                  <h4 className="text-lg text-gray-600">{formatDate(event.date)}</h4>
                  <div className="mt-2 flex items-center justify-between">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
                    onClick={()=>handleDeleteEvent(event.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form
              onSubmit={handleAddEvent}
              className="space-y-4"
            >
              <div>
                <label htmlFor="eventName" className="block text-gray-700 font-medium">
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
                <label htmlFor="eventDate" className="block text-gray-700 font-medium">
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
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      );
}

export default MyEvents