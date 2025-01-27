import { ReactElement, useEffect, useState } from "react";
import { useCateringSelector, useFetchCatering, useSetError, useFetchAddCatering, useFetchUpdateCatering, useFetchDeleteCatering } from "../features/catering/state/hooks";
import { cateringI, NewCateringI } from "../features/catering/state/cateringSlice";

type CateringProps = {
    eventId: string | number | undefined;
  };

const CateringManager = (props : CateringProps) : ReactElement => {
    const eventId = props.eventId 
    
    //avoid typescript error if eventid is undefined
    if (!eventId){
        return (
            <>
            </>
        )
    }
    
    const {catering, error} = useCateringSelector()
    const getCatering = useFetchCatering()
    const setError = useSetError()
    const addCatering = useFetchAddCatering()
    const updateCatering = useFetchUpdateCatering()
    const deleteCatering = useFetchDeleteCatering()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCatering, setCurrentCatering] = useState<cateringI | null>(null);
    const [formData, setFormData] = useState<NewCateringI>({
        name : '',
        cost_per_guest : 0,
        additional_fees : 0,
        is_final_choice : false,
        notes : '',
        event_id : eventId
      });

    useEffect(()=> {
        getCatering(eventId)
    }, [])

    const openModal = (catering?: cateringI) => {
        
        setIsModalOpen(true);
        if (catering) {
          setFormData(catering);
          setIsUpdating(true);
          setCurrentCatering(catering);
        } else {
          setFormData({ name : '',
            cost_per_guest : 0,
            additional_fees : 0,
            is_final_choice : false,
            notes : '',
            event_id : eventId });
          setIsUpdating(false);
          setCurrentCatering(null);
        }
      };

      const closeModal = () => {
    
        setIsModalOpen(false);
        setFormData({
            name : '',
            cost_per_guest : 0,
            additional_fees : 0,
            is_final_choice : false,
            notes : '',
            event_id : eventId
        });
        setCurrentCatering(null);
        setError('')
      };

      const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(formData.additional_fees<0 || formData.cost_per_guest<0){
            setError('Cost per guest or additional fees can not be negatives')
            return
            
        }

        if(formData.name.trim() === ''){
            setError('Please provide a name')
            return
        }
      
        // Clear the error before attempting to submit
        setError('');

      
        if (isUpdating && currentCatering) {

          await updateCatering(formData, currentCatering.id, eventId);
      
          if (!error) {
            closeModal();
          }
        } else {
          await addCatering(formData, eventId);
      
          if (!error) {
            closeModal();
          }
        }
      };

      const handleDelete = (id: number | string) => deleteCatering(id, eventId);

    

      return (
        <>
          <h1 className="text-4xl font-bold text-center my-8">Catering</h1>
          <div className="flex justify-center items-center mb-8 px-4">
            <button
              onClick={() => openModal()}
              className="w-full sm:w-6/12 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
            >
              Add a Catering
            </button>
          </div>
          {catering.length == 0 && (
            <div>
              <h1 className="text-3xl font-bold text-center my-8">You don't have any catering yet :)</h1>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {catering.map((cater: cateringI) => {
              return (
                <div
                  key={cater.id}
                  className={`p-6 bg-white shadow-lg rounded-lg border ${
                    cater.is_final_choice ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{cater.name}</h2>
                  <div className="mt-4">
                    <h3 className="font-bold text-gray-800">Price per guest:</h3>
                    <p className="text-gray-600"> ILS {cater.cost_per_guest}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-gray-800">Additional fees:</h3>
                    <p className="text-gray-600"> ILS {cater.additional_fees}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-gray-800">Notes:</h3>
                    <p className="text-gray-600"> {cater.notes}</p>
                  </div>
                  <div className="mt-4">
                    {cater.is_final_choice && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Final Choice
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2 flex-wrap">
                    <button
                      onClick={() => openModal(cater)}
                      className="px-4 py-2 bg-blue-100 text-blue-500 text-sm font-medium rounded-md hover:bg-blue-200 w-full sm:w-auto mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cater.id)}
                      className="px-4 py-2 bg-red-100 text-red-500 text-sm font-medium rounded-md hover:bg-red-200 w-full sm:w-auto mb-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-10/12 sm:w-6/12 lg:w-4/12">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {isUpdating ? "Edit Catering" : "Add a Catering"}
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
                      placeholder="Catering name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cost_per_guest" className="block text-sm font-medium text-gray-700">
                      Cost per Guest
                    </label>
                    <input
                      id="cost_per_guest"
                      type="number"
                      value={formData.cost_per_guest}
                      onChange={(e) =>
                        setFormData({ ...formData, cost_per_guest: parseFloat(e.target.value) })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Cost per guest"
                    />
                  </div>
                  <div>
                    <label htmlFor="additional_fees" className="block text-sm font-medium text-gray-700">
                      Additional Fees
                    </label>
                    <input
                      id="additional_fees"
                      type="number"
                      value={formData.additional_fees}
                      onChange={(e) =>
                        setFormData({ ...formData, additional_fees: parseFloat(e.target.value) })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Additional fees"
                    />
                  </div>
                  <div>
                    <label htmlFor="is_final_choice" className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        id="is_final_choice"
                        type="checkbox"
                        checked={formData.is_final_choice}
                        onChange={(e) =>
                          setFormData({ ...formData, is_final_choice: e.target.checked })
                        }
                        className="mr-2"
                      />
                      Final Choice
                    </label>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Additional notes"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                      {isUpdating ? "Update Catering" : "Add Catering"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-4 mb-2"
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
}

export default CateringManager