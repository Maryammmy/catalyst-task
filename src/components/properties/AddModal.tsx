import { useFormik } from "formik";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ErrorResponse } from "../../interfaces";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import { propertyInputs } from "../../data";
import { useState } from "react";
import { createNewPropertyAPI } from "../../services/propertyService";
import { Property } from "../../interfaces/propertyInterface";
import { propertyValidationSchema } from "../validation/propertyValidation";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number;
}
export default function AddModal({ isOpen, close, id }: IProps) {
  const [pathImages, setPathImages] = useState<string[] | string>([]);
  const [pathVideo, setPathVideo] = useState<string>("");
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const files = e.target.files;
    if (files) {
      if (name === "images") {
        // Handling multiple images
        const validTypes = ["image/jpeg", "image/png"];
        const imageFiles = Array.from(files).filter((file) =>
          validTypes.includes(file.type)
        );
        console.log(imageFiles);
        if (imageFiles.length === 0) {
          toast.error("Please upload valid images (jpg, png).");
          return;
        }

        // Append the new files to the existing ones
        const updatedImages = [
          ...pathImages,
          ...imageFiles.map((file) => file.name),
        ];
        setPathImages(updatedImages);
        formik.setFieldValue(name, [...formik.values.images, ...imageFiles]);
      } else if (name === "video") {
        const file = files[0];
        if (file && file.type.startsWith("video")) {
          setPathVideo(file.name);
          formik.setFieldValue(name, file);
        } else {
          toast.error("Please upload a valid video.");
        }
      }
    }
  };

  const createFormData = (values: Property) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "user_id") {
        formData.append(key, String(value)); // Ensure user_id is a string
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v)); // Handle multiple files
      } else if (value) {
        formData.append(key, value); // Append other fields
      }
    });
    return formData;
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      location: "",
      name: "",
      price: "",
      images: [],
      video: "",
      user_id: id,
    },
    validationSchema: propertyValidationSchema,
    onSubmit: async (values: Property) => {
      try {
        const formData = createFormData({ ...values, user_id: id });
        const data = await createNewPropertyAPI("properties", formData);
        toast.success(data?.data?.message);
      } catch (error) {
        const customError = error as ErrorResponse;
        const message = customError?.response?.data?.message;
        if (message) {
          toast.error(message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        handleClose();
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setPathImages([]);
    setPathVideo("");
    close();
  };

  return (
    <Modal isOpen={isOpen} close={handleClose} title="Update Property">
      <form onSubmit={formik.handleSubmit} className="pt-3 space-y-4">
        {propertyInputs.map((input) => {
          const nameKey = input.name as keyof Property;
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
                    {input.name === "images" ? (
                      pathImages.length > 0 ? (
                        pathImages
                      ) : (
                        <span className="text-gray-400">Upload Images</span>
                      )
                    ) : input.name === "video" ? (
                      pathVideo || (
                        <span className="text-gray-400">Upload Video</span>
                      )
                    ) : (
                      ""
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
            disabled={!formik.isValid && !formik.dirty}
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
