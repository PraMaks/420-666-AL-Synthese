import Home from '../components/Home';
import SelectItemFromProductList from '../components/Item/SelectProductForItemList';
import AddProduct from '../components/Product/AddProduct';
import AllProductsList from '../components/Product/AllProductsList';
import UpdateProduct from '../components/Product/UpdateProduct';
import AddItem from '../components/Item/AddItem';
import AllItemsList from '../components/Item/AllItemsList';
import UpdateItem from '../components/Item/UpdateItem';

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

    {
        link : "/item/selectProduct",
        component: SelectItemFromProductList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/item/add",
        component: AddItem,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/item/showAll",
        component: AllItemsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/item/update",
        component: UpdateItem,
        accessValid: () => auth.loggedInManager()
    },
    
]