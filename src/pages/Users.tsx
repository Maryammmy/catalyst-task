import { useState } from "react";
import User from "../components/users/User";
import { useGetData } from "../hooks/useGetData";
import { IUser } from "../interfaces";
import DeleteModal from "../components/users/DeleteModal";
import UpdateModal from "../components/users/UpdateModal";
import Button from "../components/ui/Button";
import AddModal from "../components/users/AddModal";

export default function Users() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const { data } = useGetData("usersList", "users");
  const users: IUser[] = data?.data.slice(0, 50);
  const openDeleteModal = (id: number) => {
    setIsDeleteModal(true);
    setId(id);
  };
  const openUpdateModal = (id: number) => {
    setIsUpdateModal(true);
    setId(id);
  };
  return (
    <>
      <div className=" p-2 md:p-5">
        <div className="lg:mx-20 flex  justify-between gap-10">
          <h1 className="text-[35px] font-bold pb-5">Users</h1>
          <div>
            <Button
              onClick={() => setIsAddModal(true)}
              className="bg-blue-600 hover:bg-blue-400 mt-4 text-white py-1 w-[100px] md:w-[200px] rounded-md"
            >
              Add User
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap  justify-center items-center gap-10">
          {users?.map((user) => (
            <User
              user={user}
              key={user?.id}
              handleDelete={openDeleteModal}
              handleUpdate={openUpdateModal}
            />
          ))}
        </div>
      </div>
      {id && (
        <UpdateModal
          isOpen={isUpdateModal}
          close={() => setIsUpdateModal(false)}
          id={id}
        />
      )}
      {id && (
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
