export const getFormattedMonth = (date: Date): string => {
  return (
    date.toLocaleString("en-US", {
      month: "long", // Display the full month name
    }) + ` - ${date.getFullYear()}`
  );
};

export const getNamedMonth = (date: Date): string => {
  return date.toLocaleString("en-US", {
    month: "long", // Display the full month name
  });
};