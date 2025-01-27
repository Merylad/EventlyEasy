import { ReactElement, useEffect, useState } from "react";
import { useExpenseSelector, useFetchAddExpense, useFetchDeleteExpense, useFetchExpense, useFetchUpdateExpense, useSetError } from "../features/expenses/state/hooks";
import { NewExpenseI, ExpenseI } from "../features/expenses/state/expenseSlice";

type ExpenseProps = {
    eventId: string | number | undefined;
  };

const ExpensesManager = (props : ExpenseProps) : ReactElement => {
    const eventId = props.eventId
    //avoid typescript error if eventid is undefined
    if (!eventId){
        return (
            <>
            </>
        )
    }
    const {expenses, error} = useExpenseSelector()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentExpense, setCurrentExpense] = useState<ExpenseI | null>(null);
    const [formData, setFormData] = useState<NewExpenseI>({
        name : '',
        price : 0,
        event_id : eventId
        });

    const fetchExpenses = useFetchExpense()
    const addExpense = useFetchAddExpense()
    const deleteExpense = useFetchDeleteExpense()
    const updateExpense = useFetchUpdateExpense()
    const setError = useSetError()

    useEffect(()=> {
        fetchExpenses(eventId)
    }, [])

    const openModal = (expense?: ExpenseI) => {
        
        setIsModalOpen(true);
        if (expense) {
          setFormData(expense);
          setIsUpdating(true);
          setCurrentExpense(expense);
        } else {
          setFormData({ name : '',
            price : 0,
            event_id : eventId });
          setIsUpdating(false);
          setCurrentExpense(null);
        }
      };    

      const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(Number(formData.price)<0){
            setError('Cost per guest or additional fees can not be negatives')
            return
            
        }

        if(formData.name.trim() === ''){
            setError('Please provide a name')
            return
        }
      
        // Clear the error before attempting to submit
        setError('');

      
        if (isUpdating && currentExpense) {

          await updateExpense(formData, currentExpense.id, eventId);
      
          if (!error) {
            closeModal();
          }
        } else {
          await addExpense(formData, eventId);
      
          if (!error) {
            closeModal();
          }
        }
      };
      const closeModal = () => {
    
        setIsModalOpen(false);
        setFormData({
            name : '',
            price : 0,
            event_id : eventId
        });
        setCurrentExpense(null);
        setError('')
      };
      

    return (
        <>
        <h1 className="text-4xl font-bold text-center my-8">Expenses</h1>
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => openModal()}
          className="w-6/12 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
        >
          Add an Expense
        </button>
      </div>
      {expenses.length == 0 && (
        <div>
          <h1 className="text-3xl font-bold text-center my-8">You don't have any expense yet :)</h1>          
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
    {expenses.map((expense) => (
      <div
        key={expense.id}
        className="p-4 bg-white rounded shadow-md hover:shadow-lg transition"
      >
        <h3 className="text-lg font-bold text-gray-800">{expense.name}</h3>
        <p className="text-sm text-gray-600">Price: ILS {expense.price}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsUpdating(true);
              setCurrentExpense(expense);
              setFormData({ name: expense.name, price: expense.price, event_id: expense.event_id });
            }}
            className="px-4 py-2 bg-blue-100 text-blue-500 text-sm font-medium rounded-md hover:bg-blue-200"
          >
            Edit
          </button>
          <button
            onClick={() => deleteExpense(expense.id, eventId)}
            className="px-4 py-2 bg-red-100 text-red-500 text-sm font-medium rounded-md hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-10/12 sm:w-6/12">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {isUpdating ? "Edit Expense" : "Add an Expense"}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Expense name"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Expense price"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {isUpdating ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setFormData({ name: "", price: 0, event_id: eventId });
              setIsUpdating(false);
              setCurrentExpense(null);
            }}
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
    )
}

export default ExpensesManager