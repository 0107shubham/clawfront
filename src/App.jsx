import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />, // Redirect to sign-in page if not authenticated
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
