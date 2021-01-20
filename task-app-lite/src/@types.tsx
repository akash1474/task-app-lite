export interface Task{
	title: string,
	expectedDate: Date,
	createdAt: Date,
	isCompleted: boolean,
	isImportant: boolean,
	isEvent: boolean,
	category:Category,
	id:string,
}

export interface Category{
	name:string,
	color:string,
}

export interface User{
	name: string;
	email: string;
	photoURL: string;
	from: string;
	totalCompleted: number; 
}