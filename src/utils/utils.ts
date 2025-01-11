/**
 * Truncates a given text to a specified maximum length.
 *
 * @param text - The text to be truncated.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text followed by '..' if it exceeds the maximum length,
 *          or the original text if it is shorter than or equal to the maximum length.
 *          Returns an empty string if the input text is undefined.
 */

export const truncateText = (
  text: string | undefined,
  maxLength: number
): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}..` : text;
};

/**
 * Converts a date string from "DD-MM-YYYY" format to "DD Month YYYY".
 * @param {string} dateString - The date string in "DD-MM-YYYY" format.
 * @returns {string} - The formatted date in "DD Month YYYY" format.
 */
export const convertDateToWords = (dateString: string) => {
  if (!dateString) return "";

  // Replace '-' with '/' to ensure compatibility across browsers
  const formattedInput = dateString.replace(/-/g, "/");

  // Create a Date object
  const date = new Date(formattedInput);

  // Format using built-in Date methods
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
