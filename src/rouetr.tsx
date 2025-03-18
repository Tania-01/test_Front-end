import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import SignInComponent from "./components/auth/login";
import RegisterComponent from "./components/auth/RgisterPage";
import TaskListComponent from "./components/task/TaskList";
import CreateTaskForm from "./components/task/CreateTask";





const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'auth'}/>},
            {path: 'login', element:<SignInComponent/>},
            {path: 'auth', element:<RegisterComponent/>},
            {path: 'task', element:<TaskListComponent/>},
            {path: 'task_add', element:<CreateTaskForm/>}


        ]


    }])

export {router}