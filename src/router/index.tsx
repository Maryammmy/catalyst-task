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
import User from "../pages/user";
import Property from "../pages/property";
import NewBooking from "../pages/NewBooking";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/properties/:id" element={<Property />} />
        <Route path="/booking" element={<NewBooking />} />
      </Route>
      {/* Page Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
