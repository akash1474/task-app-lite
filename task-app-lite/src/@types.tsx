export interface Task {
  title: string;
  expectedDate: number;
  createdAt: Date;
  isCompleted: boolean;
  isImportant: boolean;
  isEvent: boolean;
  category: number;
  id: string;
  description: string;
  imageUrl: {
    name: string;
    url: string;
  };
  userId: string;
  sync: boolean;
  pos: number;
}

export interface Category {
  name: string;
  color: string;
}

export interface User {
  name: string;
  email: string;
  imageUrl: string;
  from: string;
  totalCompleted: number;
}
