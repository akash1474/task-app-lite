import { Category } from "./@types";

interface ColorsObj {
  [prop: string]: string;
}

export const COLORS: ColorsObj = {
  default: "#5C6BC0",
  yellow: "#FDB03F",
  red: "#FF6D9F",
  green: "#09cc80",
  blue: "#4191FF",
  darkBlue: "#b2bfff",
  purple: "#e3b6ff",
  pink: "#ffb6e2",
};

export const categories: Category[] = [
  {
    name: "Task",
    color: COLORS.default,
  },
  {
    name: "Personal",
    color: COLORS.blue,
  },
  {
    name: "Programming",
    color: COLORS.green,
  },
  {
    name: "Health",
    color: COLORS.red,
  },
  {
    name: "Study",
    color: COLORS.yellow,
  },
];

export const formatDate = (ms: number) => {
  const date = new Date(ms);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

