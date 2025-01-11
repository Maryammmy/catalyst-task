import { useFormik } from "formik";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { updateUserAPI } from "../../services/updateService";
import { IUser } from "../../interfaces";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import { useGetData } from "../../hooks/useGetData";
import { inputs } from "../../data";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
}

export default function UpdateModal({ isOpen, close, id }: IProps) {
  const { data } = useGetData(`user/${id}`, `users/${id}`);
  const user: IUser = data?.data;
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
      file.type.startsWith("image")
        ? setPathImage(file.name)
        : setPathVideo(file.name);
      formik.setFieldValue(name, file);
    }
  };

  const createFormData = (values: Partial<IUser>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as unknown as Blob);
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
      intro_videos: "",
    },
    onSubmit: async (values: Partial<IUser>) => {
      try {
        const formData = createFormData(values);
        const data = await updateUserAPI(`users/${id}`, formData);
        close();
        toast.success(data?.data?.message);
        console.log(data);
      } catch (error) {
        toast.error(error?.response?.data?.messages?.role);
        console.error("Error updating user:", error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} close={close} title="Update User">
      <form onSubmit={formik.handleSubmit} className="pt-3 space-y-4">
        {inputs.map((input) => (
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
                    ? pathImage || user?.profile_image
                    : pathVideo || user?.intro_video}
                </p>
              </>
            ) : (
              <Input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[input.name] || user?.[input.name] || ""}
                className="py-2 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm"
              />
            )}
          </div>
        ))}
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
