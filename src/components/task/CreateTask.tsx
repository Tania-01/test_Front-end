import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskAction } from '../../redux/slices/TaskSlice';
import {AppDispatch} from "../../types/reduxType";

const CreateTaskForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { title, description, status };
        dispatch(taskAction.createTask(taskData));
        setTitle('');
        setDescription('');
        setStatus('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTaskForm;
