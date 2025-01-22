import { ReactElement, useEffect, useState } from "react";
import axios from "axios";

type PlacesProps = {
  eventId: string | number | undefined;
};

type PlacesT = {
  id: string | number;
  name: string;
  url?: string;
  price?: number | string ;
  final_choice: boolean;
  description?: string;
  pros?: string[];
  cons?: string[];
  event_id: string | number;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Places = (props: PlacesProps): ReactElement => {
  const eventId = props.eventId;
  const [eventPlaces, setEventPlaces] = useState<PlacesT[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<PlacesT | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    price: "",
    description: "",
    pros: "",
    cons: "",
    final_choice : false
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = (place: PlacesT | null = null) => {
    setIsModalOpen(true);
    if (place) {
      setIsUpdating(true);
      setCurrentPlace(place);
      setFormData({
        name: place.name,
        url: place.url || "",
        price: place.price?.toString() || "",
        description: place.description || "",
        pros: place.pros?.join(", ") || "",
        cons: place.cons?.join(", ") || "",
        final_choice: place.final_choice
      });
    } else {
      setIsUpdating(false);
      setFormData({
        name: "",
        url: "",
        price: '',
        description: "",
        pros: "",
        cons: "",
        final_choice: false
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isUpdating && currentPlace) {
        try {
          await axios.put(`${apiBaseUrl}/api/events/places/update/${currentPlace.id}`, {
          ...formData,
          pros: formData.pros.split(",").map((pro) => pro.trim()),
          cons: formData.cons.split(",").map((con) => con.trim()),
        });

        getPlaces()
        } catch (error) {
          console.error(error);
        }
        
      } else {
        try {
          await axios.post(`${apiBaseUrl}/api/events/places/addPlace`, {
          ...formData,
          pros: formData.pros.split(",").map((pro) => pro.trim()),
          cons: formData.cons.split(",").map((con) => con.trim()),
          event_id: eventId,
        });

        getPlaces()
        } catch (error) {
          console.error(error);
        }
        
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/events/places/delete/${id}`);
      getPlaces()
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaces = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/events/places/byevent/${eventId}`
      );
      setEventPlaces(response.data.places);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getPlaces();
  }, []);



  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">Locations</h1>
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => openModal()}
          className="w-6/12 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
        >
          Add a Location
        </button>
      </div>

      {eventPlaces?.length == 0 && (
        <div>
          <h1 className="text-3xl font-bold text-center my-8">You don't have any location yet :)</h1>          
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventPlaces?.map((place: PlacesT) => (
          <div
            key={place.id}
            className={`p-6 bg-white shadow-lg rounded-lg border ${
              place.final_choice ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-800">{place.name}</h2>
            <p className="text-gray-600 mt-2">{place.description}</p>
            <div className="mt-4">
              <h3 className="font-bold text-gray-800">Price:</h3>
              <p className="text-gray-600"> {place.price !== '' ? `ILS ${place.price}` : 'No price'}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-gray-800">Pros:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {place.pros?.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-gray-800">Cons:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {place.cons?.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <a
                href={place.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Visit Website
              </a>
              {place.final_choice && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Final Choice
                </span>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => openModal(place)}
                className="px-4 py-2 bg-blue-100 text-blue-500 text-sm font-medium rounded-md hover:bg-blue-200"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(place.id)}
                className="px-4 py-2 bg-red-100 text-red-500 text-sm font-medium rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isUpdating ? "Update Place" : "Add New Place"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-gray-700 font-medium">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div>
                <label htmlFor="pros" className="block text-gray-700 font-medium">
                  Pros (comma-separated)
                </label>
                <input
                  type="text"
                  id="pros"
                  name="pros"
                  value={formData.pros}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="cons" className="block text-gray-700 font-medium">
                  Cons (comma-separated)
                </label>
                <input
                  type="text"
                  id="cons"
                  name="cons"
                  value={formData.cons}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
          <label htmlFor="finalChoice" className="inline-flex items-center">
            <input
              type="checkbox"
              id="finalChoice"
              name="final_choice"
              checked={formData.final_choice}
              onChange={(e) =>
                setFormData({ ...formData, final_choice: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="ml-2 text-gray-700">Mark as Final Choice</span>
          </label>
        </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                >
                  {isUpdating ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Places;