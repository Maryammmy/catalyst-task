import { useFormik } from "formik";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { createNewUserAPI } from "../../services/userService";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import { userInputs } from "../../data";
import { useState } from "react";
import { User } from "../../interfaces/userInterface";
import { ErrorResponse } from "../../interfaces";
import { userValidationSchema } from "../validation/userValidation";

interface IProps {
  isOpen: boolean;
  close: () => void;
}

export default function AddModal({ isOpen, close }: IProps) {
  const [pathImage, setPathImage] = useState("");
  const [pathVideo, setPathVideo] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (jpg, png).");
        return;
      }
      if (file.type.startsWith("image")) {
        setPathImage(file.name);
      } else {
        setPathVideo(file.name);
      }
      formik.setFieldValue(name, file);
    }
  };
  const handleClose = () => {
    formik.resetForm();
    setPathImage("");
    setPathVideo("");
    close();
  };
  const createFormData = (values: User) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return formData;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      profile_image: "",
      intro_video: "",
    },
    validationSchema: userValidationSchema(false),
    onSubmit: async (values: User) => {
      try {
        const formData = createFormData(values);
        const data = await createNewUserAPI("users", formData);
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
        handleClose();
      }
    },
  });

  return (
    <Modal isOpen={isOpen} close={handleClose} title="Add User">
      <form onSubmit={formik.handleSubmit} className="pt-3 space-y-4">
        {userInputs.map((input) => {
          const nameKey = input.name as keyof User;
          return (
            <div key={input.name}>
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700 cursor-pointer"
              >
                {input.label}
              </label>

              {input.type === "file" ? (
                <>
                  <Input
                    type="file"
                    name={input.name}
                    id={input.name}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, input.name)}
                  />
                  <p className=" break-words py-2 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm ">
                    {input.name === "profile_image"
                      ? pathImage || (
                          <span className="text-gray-400">Upload Image</span>
                        )
                      : pathVideo || (
                          <span className="text-gray-400">Upload Video</span>
                        )}
                  </p>
                </>
              ) : (
                <Input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[nameKey]}
                  className="py-2 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm"
                />
              )}
              {formik.errors[nameKey] && formik.touched[nameKey] && (
                <div className="text-red-500 text-sm">
                  {formik.errors[nameKey]}
                </div>
              )}
            </div>
          );
        })}
        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white w-[100px] py-2 rounded"
          >
            Add
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-400 text-white w-[100px] py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
