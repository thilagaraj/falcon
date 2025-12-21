const formatCurrency = (value, addDecimal = false) => {
  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: addDecimal ? 2 : 0,
          maximumFractionDigits: addDecimal ? 2 : 0,
        }).format(value)
      : "";

  return formatted;
};

export { formatCurrency };
