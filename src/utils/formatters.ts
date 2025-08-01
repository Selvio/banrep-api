export const formatValue = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString: string) => {
  if (dateString.match(/^\d{4}-\d{2}$/)) {
    const parts = dateString.split("-");
    const year = parts[0];
    const month = parts[1];
    if (year && month) {
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
      });
    }
  }

  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}; 