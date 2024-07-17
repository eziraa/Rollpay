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
export const stringDatetine = (date: Date) => {
  const dayString = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const words = dayString.split(" ");
  const extention =
    date.getDate() === 1 ? "st" : date.getDate() === 2 ? "nd"  : date.getDate() === 3 ? "rd": "th";
  const rearrangedString = `${words[2]}, ${date.getDate() + extention} ${
    words[0]
  } ${words[1]} ${words[3]}: ${words[4]}`;

  return rearrangedString;
};
