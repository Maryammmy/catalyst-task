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
