import * as Yup from "yup";

export const propertyValidationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  images: Yup.mixed().required("Images are required"),
  location: Yup.string().required("Location is required"),
  name: Yup.string().required("Property name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  video: Yup.mixed().optional(),
});
