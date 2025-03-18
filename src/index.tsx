import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from "./redux/store";
import {router} from "./rouetr";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
            </QueryClientProvider>
    </Provider>
);
