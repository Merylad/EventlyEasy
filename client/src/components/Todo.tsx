import { ReactElement, useEffect, useState } from "react";
import { useTodoSelector, useFetchTodos, useFetchAddTodos, useFetchUpdateTodo, useFetchToggleTodo } from "../features/todos/state/hooks";
import { TodoI, NewTodoI } from "../features/todos/state/todoSlice";


type TodoProps = {
    eventId: string | number | undefined;
  };

const Todo = (props : TodoProps) :ReactElement => {
    const {todos} = useTodoSelector()
    const eventId = props.eventId

    if(eventId ===undefined){
      return <div>No event Id</div>
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoI | null>(null);
    const [formData, setFormData] = useState<NewTodoI>({
    title: "",
    description: "",
    priority: "low",
    is_completed : false,
    event_id: eventId
  });

  const addTodo = useFetchAddTodos()
  const updateTodo = useFetchUpdateTodo()
  const toggleTodo = useFetchToggleTodo()
    
    

    const getTodos = useFetchTodos()

    useEffect(()=> {
        if(eventId){
            getTodos(eventId)
        }      
    },[])

    const openModal = (todo: TodoI | null = null) => {
        setIsModalOpen(true);
        if (todo) {
          setIsUpdating(true);
          setCurrentTodo(todo);
          setFormData({
            title: todo.title,
            description: todo.description,
            priority: todo.priority || "low", 
            is_completed: todo.is_completed ?? false, 
            event_id : eventId
          });
        } else {
          setIsUpdating(false);
          setFormData({
            title: "",
            description: "",
            priority: "low",
            is_completed: false,
            event_id : eventId
          });
        }
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTodo(null);
        setFormData({
          title: "",
          description: "",
          priority: "low",
          is_completed: false,
          event_id : eventId
        });
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isUpdating && currentTodo) {
          updateTodo(formData, currentTodo.id)
          getTodos(eventId)
          console.log("Updating todo:", { ...currentTodo, ...formData });
        } else {
          addTodo(formData)
          getTodos(eventId)
        }
        closeModal();
      };
    
      const handleDelete = (id: number | string) => {
        // Call delete API here
        console.log("Deleting todo with ID:", id);
      };
    
      const toggleCompletion = (id: number | string, isCompleted: boolean) => {
        // Call toggle completion API here
        console.log("Toggling completion for ID:", id, "to", !isCompleted);
      };

    return (
        <>
          <h1 className="text-4xl font-bold text-center my-8">Tasks</h1>
      {todos.length === 0 && (
        <div className="text-center text-gray-600">Nothing to do at the moment! :)</div>
      )}
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => openModal()}
          className="w-6/12 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
        >
          Add a Task
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo: TodoI) =>
    <div
      key={todo.id}
      className={`p-6 bg-white shadow-lg rounded-lg border ${
        todo.is_completed ? "border-gray-100" : "border-gray-400"
      }`}
    >
      <h1
        className={`text-2xl font-semibold text-gray-800 ${
          todo.is_completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </h1>
      <p className="text-gray-600 mt-2">{todo.description}</p>
      <span
        className={`inline-block mt-4 px-3 py-1 text-sm font-medium rounded-full ${
          todo.priority === "high"
            ? "bg-red-100 text-red-800"
            : todo.priority === "medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {todo.priority}
      </span>
      <div className="mt-6 flex justify-between items-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.is_completed}
            onChange={() => toggleCompletion(todo.id!, todo.is_completed)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span>Completed</span>
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => openModal(todo)}
            className="px-4 py-2 bg-blue-100 text-blue-500 text-sm font-medium rounded-md hover:bg-blue-200"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(todo.id!)}
            className="px-4 py-2 bg-red-100 text-red-500 text-sm font-medium rounded-md hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
)}
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {isUpdating ? "Update Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleInputChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="is_completed"
            id="is_completed"
            checked={formData.is_completed}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                is_completed: !prev.is_completed,
              }))
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="is_completed"
            className="ml-2 block text-sm text-gray-900"
          >
            Mark as Completed
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        </>
      );
}

export default Todo