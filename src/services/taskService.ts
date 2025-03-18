import axios from 'axios';
import {urls} from "../constants/urls";


const taskService = {
    createTask: async (taskData: { title: string; description: string; status: string }) => {
        const response = await axios.post('http://localhost:3000/task/task', taskData);  // API call to create task
        return response.data;
    },

        GetTasks: async (status: string) => {
            const params = status ? { status } : {};
            const response = await axios.get('http://localhost:3000/task', { params });
            return response.data;
        }
    };

export { taskService };
