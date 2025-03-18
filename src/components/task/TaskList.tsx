import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import { Link } from 'react-router-dom';


const fetchTasks = async (statusFilter: string) => {
    const response = await taskService.GetTasks(statusFilter);
    return response;
};

const TaskListComponent = () => {
    const [statusFilter, setStatusFilter] = React.useState('done');

    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ['task', statusFilter],
        queryFn: () => fetchTasks(statusFilter),
    });

    if (isLoading) return <p>Loading tasks...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    if (!Array.isArray(tasks)) {
        return <p>Invalid data format: tasks is not an array</p>;
    }

    return (
        <div>
            <h2>Task List</h2>
            <div>
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}  // Оновлюємо фільтр при зміні
                >
                    <option value="done">Done</option>
                    <option value="inProgress">In Progress</option>
                    <option value="todo">To Do</option>
                </select>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
            <Link to="/task_add">
                <button>Add New Task</button>
            </Link>
        </div>
    );
};

export default TaskListComponent;
