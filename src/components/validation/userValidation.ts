import * as Yup from "yup";

export const userValidationSchema = (isUpdate: boolean) =>
  Yup.object({
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
    role: Yup.string()
      .required("Role is required.")
      .oneOf(
        ["client", "admin", "owner"],
        "Role must be one of: client, admin, owner."
      ),
    profile_image: isUpdate
      ? Yup.mixed().notRequired() // Not required for update
      : Yup.mixed().required("Profile image is required."), // Required for add
    intro_video: Yup.mixed().notRequired(),
  });
