import { Employee } from "../../../typo/salary/response";

export interface TableElements {
  name: string;
  max_length: number;
}

export const getTableElements = (data: Employee[]) => {
  let tableElements: TableElements[] = [];

  const getValidValue = (value: number) => {
    return value < 20 ? value : value < 25 ? value * 0.9 : value * 0.8;
  };
  data.forEach((employee) => {
    Object.entries(employee).forEach(([key, value]) => {
      if (
        key === "gender" &&
        tableElements.every((element) => element.name !== key)
      ) {
        tableElements.push({
          name: "gender",
          max_length: 6,
        });
        return;
      }
      if (tableElements.some((element) => element.name === key)) {
        tableElements.map((element) => {
          if (element.name === key) {
            if (element.max_length < value.toString().length) {
              element.max_length = getValidValue(value.toString().length);
            }
          }
          return element;
        });
      } else {
        tableElements.push({
          name: key,
          max_length: getValidValue(value.toString().length),
        });
      }
    });
  });

  let gridTamplates = "";
  tableElements = tableElements.map((elm, index, elements) => {
    if (elm.name === "first_name")
      return {
        name: elm.name,
        max_length: Number.parseInt(
          (elements[index + 1].max_length + elm.max_length).toFixed(2)
        ),
      };
    else if (elm.name.startsWith("date"))
      return {
        name: elm.name,
        max_length: Number.parseInt((elm.max_length + 5).toFixed(2)),
      };
    else return elm;
  });
  tableElements = tableElements.filter((elm) => elm.name !== "last_name");
  tableElements.forEach((element) => {
    gridTamplates += element.max_length + "fr ";
  });
  return gridTamplates + " 6fr";
};
