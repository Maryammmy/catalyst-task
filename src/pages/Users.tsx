import { useState } from "react";
import User from "../components/users/User";
import { useGetData } from "../hooks/useGetData";
import DeleteModal from "../components/users/DeleteModal";
import UpdateModal from "../components/users/UpdateModal";
import Button from "../components/ui/Button";
import AddModal from "../components/users/AddModal";
import { IUser } from "../interfaces/userInterface";
import Pagination from "../components/pagination/Pagination";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const ITEMS_PER_PAGE = 50;

export default function Users() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState(""); // State for the filter

  const { data, isPending } = useGetData("usersList", "users");
  const users: IUser[] = data?.data;

  // Filter logic
  const filteredUsers = filter
    ? users?.filter((user) => user.role.toLowerCase() === filter.toLowerCase())
    : users;

  // Pagination logic
  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers?.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredUsers?.length / ITEMS_PER_PAGE);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const openDeleteModal = (id: number) => {
    setIsDeleteModal(true);
    setId(id);
  };

  const openUpdateModal = (id: number) => {
    setIsUpdateModal(true);
    setId(id);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setCurrentPage(0);
  };
  const filterOptions = ["All Users", "Owner", "Admin", "Client"];
  return (
    <>
      {!users && isPending ? (
        <CardSkeleton cards={20} />
      ) : filteredUsers?.length ? (
        <div className="p-2 md:p-5">
          <div className="md:mx-10 lg:mx-1 xl:mx-20 flex justify-between gap-10">
            <h1 className="text-[35px] font-bold pb-5">Users</h1>
            <div>
              <div className="flex flex-col items-end md:items-start md:flex-row gap-4 py-3 md:py-0 md:pt-2">
                <Button
                  onClick={() => setIsAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-400 font-medium text-white py-1 w-[100px] md:w-[200px] rounded-md"
                >
                  Add User
                </Button>
                <div className="relative">
                  <select
                    onChange={handleFilterChange}
                    className="bg-gray-400 text-white rounded-md px-4 py-1 w-[150px] focus:outline-none"
                  >
                    {filterOptions.map((option) => (
                      <option
                        key={option}
                        value={option === "All Users" ? "" : option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
            {paginatedUsers?.map((user) => (
              <User
                user={user}
                key={user?.id}
                handleDelete={openDeleteModal}
                handleUpdate={openUpdateModal}
              />
            ))}
          </div>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh] text-[#AFAFAF] w-full">
          No Users Found
        </div>
      )}
      {id && isUpdateModal && (
        <UpdateModal
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
      <AddModal isOpen={isAddModal} close={() => setIsAddModal(false)} />
    </>
  );
}
