import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import FavouritePage from "./pages/Favourite";
import AdminPage from "./pages/Admin";
import InformationLayout from "./layouts/InformationLayout";
import Transaction from "./pages/Transaction";
import Authentication from "./Authentication";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import PackageManager from "./pages/Admin/PackageManager";
import UserManager from "./pages/Admin/UserManager";
import PackageDetails from "./pages/PackageDetails";
import Provider from "./Provider";
import PaymentManager from "./pages/Admin/PaymentManager";
import PackageList from "./pages/PackageList";
import LibraryPrompt from "./pages/LibraryPrompt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Provider />}>
        {PublicRoute.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.layout>{route.element}</route.layout>}
          />
        ))}
        <Route path="/" element={<Authentication />}>
          {PrivateRoute.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.layout>{route.element}</route.layout>}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

export const PublicRoute = [
  {
    path: "/",
    element: <HomePage />,
    layout: MainLayout,
  },
  {
    path: "/login",
    element: <LoginPage />,
    layout: MainLayout,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    layout: MainLayout,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    layout: MainLayout,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    layout: MainLayout,
  },
  {
    path: "/package/:id",
    element: <PackageDetails />,
    layout: MainLayout,
  },
  {
    path: "/package",
    element: <PackageList />,
    layout: MainLayout,
  },
  {
    path: "/library",
    element: <LibraryPrompt />,
    layout: MainLayout,
  },
];

export const PrivateRoute = [
  {
    path: "/profile",
    element: <Profile />,
    layout: InformationLayout,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
    layout: MainLayout,
  },
  {
    path: "/payment-failure",
    element: <PaymentFailure />,
    layout: MainLayout,
  },
  {
    path: "/contact",
    element: <Contact />,
    layout: MainLayout,
  },
  {
    path: "/favourite",
    element: <FavouritePage />,
    layout: InformationLayout,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    layout: InformationLayout,
  },
  {
    path: "/transaction",
    element: <Transaction />,
    layout: InformationLayout,
  },
  {
    path: "/package-manager",
    element: <PackageManager />,
    layout: InformationLayout,
  },
  {
    path: "/user-manager",
    element: <UserManager />,
    layout: InformationLayout,
  },
  {
    path: "/payment-manager",
    element: <PaymentManager />,
    layout: InformationLayout,
  },
];
