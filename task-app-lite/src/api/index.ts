import axios from 'axios';
const url = 'https://task-app-lite.herokuapp.com/api/v1/user';

const API=axios.create({baseURL:url});
API.interceptors.request.use(req=>{
	req.headers.authorization=`Bearer ${localStorage.getItem('token')}`;
	return req;
})


export const login=(userData:object)=>API.post("/login",userData);
export const logout=()=>API.get("/logout");
export const updateSettings=(userId:string,data:object)=>API.patch(`/${userId}/syncSettings`,data);
export const getTasks=(userId:string)=>API.get(`/${userId}/tasks?limit=50`);
export const updateTask=(userId:string,taskId:string,data:object)=>API.patch(`/${userId}/tasks/${taskId}`,data);
export const createTask=(userId:string,data:object)=>API.post(`/${userId}/tasks`,data);
export const deleteTask=(userId:string,taskId:string)=>API.delete(`/${userId}/tasks/${taskId}`);
export const updateImageUrl=(userId:string,taskId:string,data:object)=>API.patch(`/${userId}/tasks/${taskId}/url`,data);


