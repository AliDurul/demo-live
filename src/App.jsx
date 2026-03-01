import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import Error from "./pages/Error";
import { Provider } from "react-redux";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "./features/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import SignIn from "./pages/SignIn";
import store from "./state/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/authSlice";
import { useTheme } from "./hooks/useTheme";
import Firms from "./pages/Firms";
import Brands from "./pages/Brands";
import FirmDetail from "./pages/FirmDetail";
import Purchases from "./pages/Purchases";
import PurchaseDetail from "./pages/PurchaseDetail";
import PurchaseNew from "./pages/PurchaseNew";
import Sales from "./pages/Sales";
import SaleDetail from "./pages/SaleDetail";
import Products from "./pages/Products";
import DashboardHome from "./pages/DashboardHome";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: 'stock',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: 'reports', element: <div>working on it...</div> },
          { path: 'brands', element: <Brands /> },
          { path: 'firms', element: <Firms /> },
          { path: 'firms/:id', element: <FirmDetail /> },
          { path: 'products', element: <Products /> },
          { path: 'purchases', element: <Purchases /> },
          { path: 'purchases/:id', element: <PurchaseDetail /> },
          { path: 'sales', element: <Sales /> },
          { path: 'sales/:id', element: <SaleDetail /> }
        ]
      },
    ]
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeSync />
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </Provider>
  )
}



function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser)
  // const currentUser = true
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

function PublicOnlyRoute() {
  const currentUser = useSelector(selectCurrentUser)
  return currentUser ? <Navigate to="/stock" replace /> : <Outlet />;
}

function ThemeSync() {
  useTheme();
  return null;
}