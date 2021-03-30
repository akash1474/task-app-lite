export interface Task{
	title: string,
	expectedDate: number,
	createdAt: Date,
	isCompleted: boolean,
	isImportant: boolean,
	isEvent: boolean,
	category:Category,
	id:string,
	description:string,
}

export interface Category{
	name:string,
	color:string,
}

export interface User{
	name: string;
	email: string;
	imageUrl: string;
	from: string;
	totalCompleted: number; 
}