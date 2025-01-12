import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import { deleteAPI } from "../../services/DeleteService";
import Button from "../ui/Button";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
}
export default function DeleteModal({ isOpen, close, id }: IProps) {
  const deleteProperty = async () => {
    try {
      const { data } = await deleteAPI(`properties/${id}`);
      toast.success(data?.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      close();
    }
  };
  return (
    <Modal isOpen={isOpen} close={close} title="Delete Property">
      <h3 className="font-medium  py-3">
        Are you sure you want to delete this property
      </h3>
      <div className="flex justify-between space-x-3">
        <Button
          onClick={deleteProperty}
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
