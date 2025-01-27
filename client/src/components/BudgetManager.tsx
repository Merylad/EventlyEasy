import { ReactElement, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useExpenseSelector } from "../features/expenses/state/hooks";
import { useCateringSelector } from "../features/catering/state/hooks";
import { useGuestSelector } from "../features/guests/state/hooks";
import { useTodoSelector } from "../features/todos/state/hooks";

import { useFetchCatering } from "../features/catering/state/hooks";
import { useFetchGuests } from "../features/guests/state/hooks";
import { useFetchExpense } from "../features/expenses/state/hooks";
import { useFetchTodos } from "../features/todos/state/hooks";
import axios from "axios";

import { PlacesT } from "./Places";
import { ExpenseI } from "../features/expenses/state/expenseSlice";
import { GuestI } from "../features/guests/state/guestsSlice";
import { cateringI } from "../features/catering/state/cateringSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

type BudgetProps = {
  eventId: string | number | undefined;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const BudgetManager = (props: BudgetProps): ReactElement => {
  const eventId = props.eventId;

  const [location, setLocation] = useState<PlacesT[]>([]);
  const { expenses } = useExpenseSelector();
  const { catering } = useCateringSelector();
  const { guests } = useGuestSelector();
  const { todos } = useTodoSelector();

  if (!eventId) return <></>;

  const getCatering = useFetchCatering();
  const getGuests = useFetchGuests();
  const getExpenses = useFetchExpense();
  const getTodos = useFetchTodos();

  useEffect(() => {
    getCatering(eventId);
    getGuests(eventId);
    getExpenses(eventId);
    getTodos(eventId);
    fetchPlaces();
  }, [eventId]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/events/places/byevent/${eventId}`
      );
      setLocation(response.data.places); // Update state with fetched locations
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalExpenses = (expenses: ExpenseI[]) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += Number(expense.price);
    });
    return total;
  };

  const getNumberOfGuests = (guests: GuestI[]) => {
    const guestsAttending = guests.filter(
      (guest) => guest.is_attending === true
    );
    return guestsAttending.length;
  };

  const getFinalCatering = (catering: cateringI[]) => {
    let finalCostPerGuest = 0;
    let finalAdditionalFees = 0;

    const finalCater = catering.filter(
      (cater) => cater.is_final_choice === true
    );
    finalCater.forEach((cater) => {
      finalCostPerGuest += Number(cater.cost_per_guest);
      finalAdditionalFees += Number(cater.additional_fees);
    });

    return { finalCostPerGuest, finalAdditionalFees };
  };

  const getFinalLocations = (location: PlacesT[]) => {
    let total = 0;
    const finalLocations = location.filter(
      (place) => place.final_choice === true
    );
    finalLocations.forEach((place) => {
      total += Number(place.price);
    });
    return total;
  };

  const totalExpenses = getTotalExpenses(expenses);
  const numGuestsAttending = getNumberOfGuests(guests);
  const { finalCostPerGuest, finalAdditionalFees } = getFinalCatering(catering);
  const finalLocationPrice = getFinalLocations(location);
  const finalCateringPrice =
    finalCostPerGuest * numGuestsAttending + finalAdditionalFees;

  const todosToDo = todos.filter((todo) => todo.is_completed === false);

  const totalEventCost =
    totalExpenses + finalLocationPrice + finalCateringPrice;

  // Data for the Pie Chart
  const pieData = {
    labels: ["Other expenses", "Location", "Catering"],
    datasets: [
      {
        data: [totalExpenses, finalLocationPrice, finalCateringPrice],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384CC", "#36A2EBCC", "#FFCE56CC"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const renderTodosByPriority = (priority: string) => {
    const filteredTodos = todosToDo.filter(
      (todo) => todo.priority === priority
    );

    return filteredTodos.length ? (
      <ul className="list-disc pl-4">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <span className="font-semibold">{todo.title}:</span> {todo.description}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No {priority} priority tasks.</p>
    );
  };

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Budget Manager</h1>
      <div className="flex flex-col items-center bg-pink-200 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Event Cost Breakdown</h2>
        <div className="w-96 h-96 mb-6">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <h3 className="text-l font-medium mt-4 text-gray-600">
          Total People Attending: <span className="text-gray-900 font-bold">{numGuestsAttending}</span>
        </h3>
        <h3 className="text-xl font-medium mt-4 text-gray-600">
          Total Event Cost: <span className="text-gray-900 font-bold">ILS {totalEventCost.toFixed(2)}</span>
        </h3>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Tasks To Do</h2>
        {todosToDo.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-red-600">High Priority</h3>
              {renderTodosByPriority("high")}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-yellow-600">Medium Priority</h3>
              {renderTodosByPriority("medium")}
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">Low Priority</h3>
              {renderTodosByPriority("low")}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Nothing to do.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;
