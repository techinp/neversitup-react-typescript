export interface ToDoDataType {
  title: string;
  description: string;
}

export interface UpdateToDoType {
  _id: string;
  title: string;
  description: string;
}

export interface ResponseToDoType {
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  user_id: string;
  _id: string;
}
