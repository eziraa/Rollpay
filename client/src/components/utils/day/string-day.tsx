export const stringDay = (date: Date) => {
  const dayString = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  });
  const words = dayString.split(" ");
  const extention =
    date.getDate() === 1 ? "st" : date.getDate() === 2 ? "nd" : "th";
  const rearrangedString = `${words[2]}, ${date.getDate() + extention} ${
    words[0]
  } ${words[1]}`;

  return rearrangedString;
};
