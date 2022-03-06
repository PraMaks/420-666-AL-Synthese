import Home from '../components/Home';
import AddProduct from '../components/Product/AddProduct';

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
    }
    
]