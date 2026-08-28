import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";
import SignIn from "./features/auth/pages/sign-in";
import SignUp from "./features/auth/pages/sign-up";
import { Toaster } from "./components/ui/toast";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from "./state/store";
import DashboardLayout from "./features/dashboard/components/dashboard-layout";
import Home from "./features/home/pages/Home";
import FirmDetailPage from "./features/stock/pages/firm-detail";
import BrandPage from "./features/stock/pages/brand-page";
import FirmPage from "./features/stock/pages/firm-page";
import PurchasePage from "./features/stock/pages/purchase-page";
import PurchaseDetailPage from "./features/stock/pages/purchase-detail";
import SalePage from "./features/stock/pages/sale-page";
import SaleDetailPage from "./features/stock/pages/sale-detail";
import ProductPage from "./features/stock/pages/product-page";
import OverviewPage from "./features/dashboard/pages/overview-page";
import ErrorPage from "./features/dashboard/pages/error-page";

export function App() {


  let router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      element: <PublicOnlyRoute />,
      children: [
        {
          path: 'sign-in',
          element: <SignIn />
        },
        {
          path: 'sign-up',
          element: <SignUp />
        },
      ]
    },
    {
      path: 'stock',
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <OverviewPage />
            },
            {
              path: 'reports',
              element: <div>Working on it..</div>
            },
            {
              path: 'purchases',
              element: <PurchasePage />
            },
            {
              path: 'purchases/:purchaseId',
              element: <PurchaseDetailPage />
            },
            {
              path: 'sales',
              element: <SalePage />
            },
            {
              path: 'sales/:saleId',
              element: <SaleDetailPage />
            },
            {
              path: 'firms',
              element: <FirmPage />
            },
            {
              path: 'firms/:firmId',
              element: <FirmDetailPage />
            },
            {
              path: 'brands',
              element: <BrandPage />
            },
            {
              path: 'products',
              element: <ProductPage />
            },
          ]
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  )
}

export default App


function ProtectedRoute() {

  // const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUser = useSelector(selectCurrentUser);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}

function PublicOnlyRoute() {
  const currentUser = useSelector(selectCurrentUser)
  return currentUser ? <Navigate to="/stock" replace /> : <Outlet />;
}