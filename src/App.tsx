import { Routes, Route, Outlet, Navigate, HashRouter } from 'react-router-dom'
import { createContext, useState, useEffect } from "react";
import Layout from './pages/Layout'
import Register from './pages/Register'
import Data from './pages/Data';
import Choices from './pages/Choice';

export type User = {
  // type declaration for User details
  isAuthenticated?: boolean,
  username: string
}

export type UserContext = [
  // type declaration for user Context
  User,
  React.Dispatch<React.SetStateAction<User>>
]

// AuthContext for getting authentication details in the application.
export const AuthContext = createContext<UserContext>([{
  isAuthenticated: undefined,
  username: ""
}, () => {}])

// PrivateWrapper for preventing the unauthorized user from accessing restricted pages.
const PrivateWrapper = ({user}: {user: User}) => (
  user.isAuthenticated ? <Outlet /> : <Navigate to={'/register'} />
);


function App() {
  const [user, setUser] = useState<User>({
    isAuthenticated: undefined,
    username: ""
  });

  // Get the user authentication details after the 'setUser' function is loaded.
  useEffect(() => {
    // Check in local storage for user details.
    // If found make user authorized else unauthorized.
    if (localStorage.getItem('name') && localStorage.getItem('email') && localStorage.getItem('phone')) {
      setUser({
        isAuthenticated: true,
        username: (localStorage.getItem('name') || "")
      })
    }
    else setUser({
      isAuthenticated: false,
      username: ""
    })
  }, [setUser]);

  // If the authentication is undefined, Prevent the user from entering the app.
  if (user.isAuthenticated === undefined) {
    return(
      <h1>Loading...</h1>
    )
  }
  // If authentication details are found
  return (
    // Make the AuthContext available to whole application
    <AuthContext.Provider value={[user, setUser]}>
      {/* Using React-Router-Dom routing*/}
      <HashRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='register' element={<Register />} />
              <Route element={<PrivateWrapper user={user} />}>
                {/* Wrapping the pages to prevent unauthorized Users. */}
                <Route index element={<Data/>} />
                <Route path='checkbox' element={<Choices />} />
              </Route>
            </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App;
