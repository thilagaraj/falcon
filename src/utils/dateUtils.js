export const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
