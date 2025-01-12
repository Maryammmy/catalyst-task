import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorResponse } from "../../interfaces";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import { updateBookingAPI } from "../../services/bookingService";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
  status: string;
}
const validationSchema = Yup.object({
  status: Yup.string()
    .oneOf(
      ["pending", "confirmed", "canceled"],
      "Status must be one of: pending, confirmed, or canceled"
    )
    .required("Status is required"),
});

function UpdateModal({ isOpen, close, id, status }: IProps) {
  const formik = useFormik({
    initialValues: {
      status: status || "",
    },
    validationSchema,
    onSubmit: async (values: { status: string }) => {
      try {
        const data = await updateBookingAPI(`bookings/${id}/status`, values);
        toast.success(data?.data?.message);
      } catch (error) {
        const customError = error as ErrorResponse;
        const messages = customError?.response?.data?.messages;
        if (messages) {
          Object.entries(messages).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        close();
      }
    },
  });

  return (
    <Modal isOpen={isOpen} close={close} title="Update Booking">
      <form onSubmit={formik.handleSubmit} className="pt-3 space-y-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 cursor-pointer"
          >
            Status
          </label>

          <Input
            id="status"
            type="text"
            name="status"
            placeholder="Enter your status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            className="py-2 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm"
          />
          {formik.touched.status && formik.errors.status && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.status}</p> // Show validation error
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white w-[100px] py-2 rounded"
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={close}
            className="bg-gray-500 hover:bg-gray-400 text-white w-[100px] py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateModal;
