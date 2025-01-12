import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name should be at least 3 characters long."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d+$/, "Phone number should contain only numbers.")
    .min(10, "Phone number should be at least 10 digits."),
  role: Yup.string().required("Role is required."),
  profile_image: Yup.mixed().required("Profile image is required."),
  intro_video: Yup.mixed().notRequired(), // Optional field
});