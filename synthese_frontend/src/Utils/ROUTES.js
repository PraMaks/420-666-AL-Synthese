import Home from '../components/Home';
import AddProduct from '../components/Product/AddProduct';
import AllProductsList from '../components/Product/AllProductsList';
import UpdateProduct from '../components/Product/UpdateProduct';

import auth from '../services/Auth';

export const ROUTES = [
    {
        link : "/home/:username",
        component: Home,
        accessValid: () => auth.loggedIn() || auth.loggedInManager()
    },

    {
        link : "/product/add",
        component: AddProduct,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/product/showAll",
        component: AllProductsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/product/update",
        component: UpdateProduct,
        accessValid: () => auth.loggedInManager()
    },
]