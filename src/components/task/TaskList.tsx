// TaskListComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import {taskAction} from "../../redux/slices/TaskSlice";
import {AppDispatch} from "../../types/reduxType";
import {Link} from "react-router-dom";

const TaskListComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useAppSelector((state) => state.task);

    useEffect(() => {
        dispatch(taskAction.getTasks());
    }, [dispatch]);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

    if (!Array.isArray(tasks)) {
        return <p>Invalid data format: tasks is not an array</p>;
    }

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
                <Link to="/task_add">
                    <button>Add New Task</button>
                </Link>
            </ul>
        </div>
    );
};

export default TaskListComponent;
