import {
    createBrowserRouter,
} from "react-router-dom";
import Upcoming from '../pages/Upcoming'
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Meals from '../pages/Meals'
import PrivateRoute from "../Private/PrivateRoute";
import Error from "../Error/Error";
import MealDetail from "../pages/MealDetail";
import Login from "../Login_registration/Login";
import Registration from '../Login_registration/Registration'
import Checkout from '../pages/Checkout'
import Dashboard from "../pages/Dashboard";
import My_reviews from "../pages/Dashboard/My_reviews";
import Requested_meal from "../pages/Dashboard/Requested_meal";
import Profile from "../pages/Dashboard/Profile";
import UpcomingMeal from "../pages/Dashboard/UpcomingMeal";
// import ServeMeal from "../pages/Dashboard/ServeMeal";
import AllReview from "../pages/Dashboard/AllReview";
import Allmeal from "../pages/Dashboard/Allmeal";
import AddMeal from "../pages/Dashboard/AddMeal";
import ManageUser from "../pages/Dashboard/ManageUser";
import AdminProfile from "../pages/Dashboard/AdminProfile";
import Update from "../pages/Dashboard/Update";
import AdminRoutes from "../Private/AdminRoutes";
import AdminAllRequest from "../pages/Dashboard/AdminAllRequest";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/meals',
                element: <Meals></Meals>
            },
            {
                path: '/upcoming',
                element: <Upcoming></Upcoming>
            },
            {
                path: '/detail/:id',
                element: <MealDetail></MealDetail>

            },
            {
                path: '/checkout/:package_cat',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            }
        ]
    },

    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/registration',
        element: <Registration></Registration>
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user 
            {
                path: '/dashboard/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }
            ,
            {
                path: '/dashboard/myReviews',
                element: <PrivateRoute><My_reviews></My_reviews></PrivateRoute>
            },
            {
                path: '/dashboard/myRequests',

                element: <PrivateRoute><Requested_meal></Requested_meal></PrivateRoute>
            }
            // admin user

            , {
                path: '/dashboard/admin',
                element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
            }
            , {
                path: '/dashboard/alluser',
                element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>
            }
            , {
                path: '/dashboard/addmeal',
                element: <AdminRoutes><AddMeal></AddMeal></AdminRoutes>
            }
            , {
                path: '/dashboard/allmeal',
                element: <AdminRoutes><Allmeal></Allmeal></AdminRoutes>
            }
            , {
                path: '/dashboard/allreview',
                element: <AdminRoutes><AllReview></AllReview></AdminRoutes>
            }
            , {
                path: '/dashboard/servermeal',
                element: <AdminRoutes><AdminAllRequest></AdminAllRequest></AdminRoutes>
            }
            , {
                path: '/dashboard/upcoming',
                element: <AdminRoutes><UpcomingMeal></UpcomingMeal></AdminRoutes>
            },
            {
                path: '/dashboard/update/:title',
                element: <AdminRoutes><Update></Update></AdminRoutes>
            }
        ]
    },
]);


export default Router;