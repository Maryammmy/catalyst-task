import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import { useState } from "react";
import { deleteAPI } from "../../services/DeleteService";
import Button from "../ui/Button";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
}
export default function DeleteModal({ isOpen, close, id }: IProps) {
  const [loading, setLoading] = useState(false);
  const deleteUser = async () => {
    try {
      setLoading(true);
      const { data } = await deleteAPI(`users/${id}`);
      toast.success(data?.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      close();
    }
  };
  return (
    <Modal isOpen={isOpen} close={close} title="Delete User">
      <h3 className="font-medium  py-3">
        Are you sure you want to delete this user
      </h3>
      <div className="flex justify-between space-x-3">
        <Button
          type="submit"
          className="bg-red-500 hover:bg-red-400 text-white w-[100px] py-2 rounded"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={close}
          className="bg-gray-500 hover:bg-gray-400 text-white w-[100px] py-2 rounded"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
