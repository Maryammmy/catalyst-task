import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { updateUserAPI } from "../../services/userService";
import { useGetData } from "../../hooks/useGetData";
import { userInputs } from "../../data";
import { User } from "../../interfaces/userInterface";
import { ErrorResponse } from "../../interfaces";
import { userValidationSchema } from "../validation/userValidation";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
}

export default function UpdateModal({ isOpen, close, id }: IProps) {
  const { data } = useGetData(`user/${id}`, `users/${id}`);
  const user: User = data?.data;

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
    validationSchema: userValidationSchema,
    onSubmit: async (values: User) => {
      try {
        const formData = createFormData(values);
        const response = await updateUserAPI(`users/${id}`, formData);
        toast.success(response?.data?.message);
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
  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        profile_image: user?.profile_image ? "" : "",
        intro_video: user?.intro_video ? "" : "",
      });
      setPathImage(user?.profile_image || "");
      setPathVideo(user?.intro_video || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Modal isOpen={isOpen} close={handleClose} title="Update User">
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
                  <p className="break-words py-2 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm">
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

              {formik.touched[nameKey] && formik.errors[nameKey] && (
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
            Update
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
