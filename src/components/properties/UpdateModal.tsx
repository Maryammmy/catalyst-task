import { useFormik } from "formik";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ErrorResponse } from "../../interfaces";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import { propertyInputs } from "../../data";
import { useEffect, useState } from "react";
import { updatePropertyAPI } from "../../services/propertyService";
import { useGetData } from "../../hooks/useGetData";
import { Property } from "../../interfaces/propertyInterface";
import { propertyValidationSchema } from "../validation/propertyValidation";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: number | null;
}
export default function UpdateModal({ isOpen, close, id }: IProps) {
  const { data } = useGetData(`property/${id}`, `properties/${id}`);
  const property: Property = data?.data;
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
      if (Array.isArray(value)) {
        // Handle array (multiple files)
        value.forEach((v) => formData.append(key, v));
      } else if (value) {
        formData.append(key, value);
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
    },
    validationSchema: propertyValidationSchema,
    onSubmit: async (values: Property) => {
      try {
        console.log(values);
        const formData = createFormData(values);
        const data = await updatePropertyAPI(`properties/${id}`, formData);
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

  useEffect(() => {
    if (property) {
      formik.setValues({
        description: property?.description || "",
        images: property?.images || [],
        location: property?.location || "",
        name: property?.name || "",
        price: property?.price || "",
        video: property?.video ? "" : "",
      });
    }
    setPathImages(property?.images || []);
    setPathVideo(property?.video || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

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
