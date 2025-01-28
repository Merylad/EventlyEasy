import { ReactElement, useEffect, useState } from "react";
import { useTodoSelector, useFetchTodos, useFetchAddTodos, useFetchUpdateTodo, useFetchToggleTodo, useFetchDeleteTodo } from "../features/todos/state/hooks";
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
  const deleteTodo = useFetchDeleteTodo()
    
    

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
          updateTodo(formData, currentTodo.id, eventId)
          
          console.log("Updating todo:", { ...currentTodo, ...formData });
        } else {
          addTodo(formData, eventId)
          
        }
        closeModal();
      };
    
      const handleDelete = (id: number | string) => {
        deleteTodo(id, eventId)
      };
    
      const toggleCompletion = (id: number | string) => {
        toggleTodo(id, eventId)
      };

      return (
        <>
          <h1 className="text-4xl font-bold text-center my-8">Tasks</h1>
      
          {/* Show message and button when no tasks are available */}
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h1 className="text-3xl font-bold text-center my-8">
                Nothing to do at the moment :)
              </h1>
              <div className="flex justify-center items-center mb-8 px-4 w-full">
                <button
                  onClick={() => openModal()}
                  className="w-full max-w-md py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
                >
                  Add a Task
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center mb-8 px-4">
                <button
                  onClick={() => openModal()}
                  className="w-full max-w-md py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition"
                >
                  Add a Task
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                {/* Left column: Incomplete tasks */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Incomplete Tasks
                  </h2>
                  {todos
                    .filter((todo: TodoI) => !todo.is_completed)
                    .sort((a, b) => {
                      const priorityOrder: Record<string, number> = {
                        high: 1,
                        medium: 2,
                        low: 3,
                      };
                      const priorityA = a.priority ?? "low";
                      const priorityB = b.priority ?? "low";
                      return priorityOrder[priorityA] - priorityOrder[priorityB];
                    })
                    .map((todo: TodoI) => (
                      <div
                        key={todo.id}
                        className="p-6 bg-white shadow-lg rounded-lg border border-gray-400"
                      >
                        <h1 className="text-2xl font-semibold text-gray-800">
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
                              onChange={() => toggleCompletion(todo.id)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span>Completed</span>
                          </label>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => openModal(todo)}
                              className="px-4 py-2 bg-blue-100 text-blue-500 text-sm font-medium rounded-md hover:bg-blue-200"
                            >
                              Edit
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
                    ))}
                </div>
      
                {/* Right column: Completed tasks */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Completed Tasks
                  </h2>
                  {todos
                    .filter((todo: TodoI) => todo.is_completed)
                    .map((todo: TodoI) => (
                      <div
                        key={todo.id}
                        className="p-6 bg-white shadow-lg rounded-lg border border-gray-100"
                      >
                        <h1 className="text-2xl font-semibold text-gray-500 line-through">
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
                              onChange={() => toggleCompletion(todo.id)}
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
                    ))}
                </div>
              </div>
            </>
          )}
      
          {/* Modal */}
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
                      value={formData.priority || "low"}
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
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
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