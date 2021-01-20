import { Category } from "./@types";

interface ColorsObj {
	[prop: string]: string;
}

export const COLORS: ColorsObj = {
	default: "#5C6BC0",
	yellow: "rgb(253 176 63)",
	red: "rgb(255 109 159)",
	green: "#09cc80",
	blue: "rgb(65 145 255)",
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
