import { ReactElement, useEffect, useMemo, useState } from "react";
import {
  useFetchAddGuests,
  useFetchDeleteGuest,
  useFetchGuests,
  useFetchToggleGuest,
  useGuestSelector,
  useFetchUpdateGuest,
  useSetError
} from "../features/guests/state/hooks";
import { NewGuestI, GuestI } from "../features/guests/state/guestsSlice";

type GuestsProps = {
  eventId: string | number | undefined;
};

const GuestsManager = ({ eventId }: GuestsProps): ReactElement => {
  if (!eventId) return <div>No event</div>;

  const { guests, error } = useGuestSelector();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<GuestI | null>(null);
  
  const [formData, setFormData] = useState<NewGuestI>({
    name: "",
    email: "",
    is_attending: false,
    event_id: eventId,
  });

  const fetchGuests = useFetchGuests();
  const addGuest = useFetchAddGuests();
  const deleteGuest = useFetchDeleteGuest();
  const toggleGuest = useFetchToggleGuest();
  const updateGuest = useFetchUpdateGuest();
  const setError = useSetError()

  useEffect(() => {
    fetchGuests(eventId);
    setError('');
  }, [eventId]);

  const openModal = (guest?: GuestI) => {
    setError('')
    setIsModalOpen(true);
    if (guest) {
      setFormData(guest);
      setIsEditMode(true);
      setCurrentGuest(guest);
    } else {
      setFormData({ name: "", email: "", is_attending: false, event_id: eventId });
      setIsEditMode(false);
      setCurrentGuest(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      is_attending: false,
      event_id: eventId,
    });
    setCurrentGuest(null);
  };

  const sortedGuests = useMemo(
    () => [...guests].sort((a, b) => Number(b.is_attending) - Number(a.is_attending)),
    [guests]
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear the error before attempting to submit
    setError('');
  
    if (isEditMode && currentGuest) {
      await updateGuest(formData, currentGuest.id, eventId);
      console.log(error ,'error')
  
      if (!error) {
        closeModal();
      }
    } else {
      await addGuest(formData, eventId);
  
      if (!error) {
        closeModal();
      }
    }
  };

  const deleteGuestHandler = (id: number | string) => deleteGuest(id, eventId);

  const toggleGuestHandler = (id: number | string) => toggleGuest(id, eventId);

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">Guests</h1>
      {guests.length === 0 && (
        <div className="text-center text-gray-600">No guests at the moment! :)</div>
      )}
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => openModal()}
          className="w-6/12 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
        >
          Add a Guest
        </button>
      </div>
      <div className="p-6 bg-gray-100 rounded shadow-lg">
        {sortedGuests.length === 0 && !error && (
          <p className="text-gray-500">No guests yet. Add a guest to get started.</p>
        )}
        <div className="space-y-4">
          {sortedGuests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{guest.name}</p>
                <p className="text-sm text-gray-600">{guest.email || "No email provided"}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleGuestHandler(guest.id)}
                  className={`px-4 py-2 rounded text-white ${
                    guest.is_attending
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  aria-label={`Mark ${guest.name} as ${
                    guest.is_attending ? "not attending" : "attending"
                  }`}
                >
                  {guest.is_attending ? "Attending" : "Not Attending"}
                </button>
                <button
                  onClick={() => {
                    openModal(guest);
                  }}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  aria-label={`Edit ${guest.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGuestHandler(guest.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  aria-label={`Delete ${guest.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-10/12 sm:w-6/12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isEditMode ? "Edit Guest" : "Add a Guest"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value, event_id: eventId })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Guest's name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email (optional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value, event_id: eventId })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Guest's email"
                />
              </div>
              <div>
                <label htmlFor="is_attending" className="block text-sm font-medium text-gray-700">
                  Attending
                </label>
                <select
                  id="is_attending"
                  value={formData.is_attending ? "yes" : "no"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_attending: e.target.value === "yes",
                      event_id: eventId,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  {isEditMode ? "Update Guest" : "Add Guest"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-4"
                >
                  Cancel
                </button>
                
              </div>
              {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestsManager;