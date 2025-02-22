import { ReactElement, useEffect, useState } from "react";
import { useUserSelector } from "../features/users/state/hooks";
import { useFetchLogin, useSetError } from "../features/users/state/hooks";
import { useNavigate } from "react-router-dom";

const Login = (): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { loggedIn, error } = useUserSelector()

    const navigate = useNavigate()
    const login = useFetchLogin()
    const setError = useSetError()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

       login(email,password)
    };

    useEffect(()=> {
      if(loggedIn === true){
        
        navigate('/')
       }
     }, [loggedIn])

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Sign in</h2>
    
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="absolute left-4 top-3.5 h-5 w-5 text-purple-500">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            </div>
    
            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="absolute left-4 top-3.5 h-5 w-5 text-purple-500">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
    
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-300">
              Login
            </button>
    
            {/* Error Message */}
            {error && (
              <div className="mt-4 text-center text-sm text-red-500">
                {error}
              </div>
            )}
          </form>
        </div>
      );
}

export default Login;
