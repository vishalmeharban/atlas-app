import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/Layout/AppLayout";
import CounterDeatils from "./pages/CounterDeatils";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/details/:code",
          element: <CounterDeatils />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
