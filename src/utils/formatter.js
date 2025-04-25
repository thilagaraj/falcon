const formatCurrency = (value, addDecimal = false) => {
  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: addDecimal ? 2 : 0,
        }).format(value)
      : "";

  return formatted.replace(/^₹/, "₹ ");
};

export { formatCurrency };
