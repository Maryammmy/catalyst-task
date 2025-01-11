import Booking from "../components/bookings/Booking";
import { useGetData } from "../hooks/useGetData";
import { IBooking } from "../interfaces";

function Bookings() {
  const { data } = useGetData("bookingsList", "bookings");
  const bookings: IBooking[] = data?.data?.slice(0, 50);
  console.log(bookings);

  return (
    <div className="p-2 md:p-5 ">
      <h1 className="text-[35px] font-bold pb-5">Bookings</h1>
      <div className="flex flex-col md:flex-row flex-wrap  justify-center items-center gap-10">
        {bookings?.map((booking) => (
          <Booking booking={booking} key={booking?.id} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;
