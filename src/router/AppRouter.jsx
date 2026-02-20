import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Friends from "../pages/Friends";
import Messages from "../pages/Messages";
import RootLayout from "../components/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Feed /> },
            { path: '/profile', element: <Profile /> },
            { path: '/friends', element: <Friends /> },
            { path: '/messages', element: <Messages /> },
            // { path: '/settings', element: <SettingsPage /> },
        ]
    },
]);

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}
