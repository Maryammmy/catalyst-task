import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layouts";
import NotFoundPage from "../pages/NotFoundPage";
import ErrorHandler from "../components/errors/ErrorHandler";
import Properties from "../pages/Properties";
import Bookings from "../pages/Bookings";
import Users from "../pages/Users";
import Home from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/bookings" element={<Bookings />} />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
