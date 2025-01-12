import { useState } from "react";
import Booking from "../components/bookings/Booking";
import { useGetData } from "../hooks/useGetData";
import UpdateModal from "../components/bookings/UpdateModal";
import DeleteModal from "../components/bookings/DeleteModal";
import { IBooking } from "../interfaces/bookingInterface";
import Pagination from "../components/pagination/Pagination";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const ITEMS_PER_PAGE = 50; // Number of items per page

function Bookings() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isPending } = useGetData("bookingsList", "bookings");
  const bookings: IBooking[] = data?.data || [];

  // Pagination logic
  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedBookings = bookings.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const openDeleteModal = (id: number) => {
    setIsDeleteModal(true);
    setId(id);
  };

  const openUpdateModal = (id: number, status: string) => {
    setIsUpdateModal(true);
    setStatus(status);
    setId(id);
  };

  return (
    <>
      {!bookings && isPending ? (
        <CardSkeleton cards={20} />
      ) : bookings?.length ? (
        <div className="p-2 md:p-5">
          <div className="md:mx-10 lg:mx-1 xl:mx-20 flex justify-between">
            <h1 className="text-[35px] font-bold pb-5">Bookings</h1>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
            {paginatedBookings.map((booking) => (
              <Booking
                booking={booking}
                key={booking?.id}
                handleUpdate={openUpdateModal}
                handleDelete={openDeleteModal}
              />
            ))}
          </div>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh] text-[#AFAFAF] w-full">
          No Booking Found
        </div>
      )}

      {id && isUpdateModal && (
        <UpdateModal
          status={status}
          isOpen={isUpdateModal}
          close={() => setIsUpdateModal(false)}
          id={id}
        />
      )}
      {id && isDeleteModal && (
        <DeleteModal
          isOpen={isDeleteModal}
          close={() => setIsDeleteModal(false)}
          id={id}
        />
      )}
    </>
  );
}

export default Bookings;
