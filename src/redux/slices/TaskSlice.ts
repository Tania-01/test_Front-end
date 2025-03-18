import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from '../../services/taskService';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface TaskState {
    tasks: Task[];
    error: string | null;
    loading: boolean;
}

const initialState: TaskState = {
    tasks: [],
    error: null,
    loading: false,
};


export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: { title: string; description: string; status: string }, { rejectWithValue }) => {
        try {
            const response = await taskService.createTask(taskData);
            return response;
        } catch (error) {
            return rejectWithValue(error || 'Error creating task');
        }
    }
);


export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await taskService.GetTasks(); // Отримуємо список тасок
            return response;
        } catch (error) {
            return rejectWithValue(error || 'Error fetching tasks');
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;  // Оновлюємо список тасок
                state.loading = false;
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
            });
    }
});

const { reducer: taskReducer } = taskSlice;

export const taskAction = {
    createTask,
    getTasks,
};

export { taskReducer };
