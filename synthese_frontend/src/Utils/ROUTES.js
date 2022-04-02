import Home from '../components/Home/Home';
import SelectItemFromProductList from '../components/Item/SelectProductForItemList';
import AddProduct from '../components/Product/AddProduct';
import AllProductsList from '../components/Product/AllProductsList';
import UpdateProduct from '../components/Product/UpdateProduct';
import AddItem from '../components/Item/AddItem';
import AllItemsList from '../components/Item/AllItemsList';
import UpdateItem from '../components/Item/UpdateItem';
import AllAvailableItemsList from '../components/Order/AllAvailableItemsList';
import AddListingToOrder from '../components/Order/AddListingToOrder';
import AllListingsList from '../components/Cart/AllListingsList';
import ShowListing from '../components/Cart/ShowListing';
import DeleteProduct from '../components/Product/DeleteProduct';
import DeleteProductsList from '../components/Product/DeleteProductsList';
import DeleteItemsList from '../components/Item/DeleteItemsList';
import DeleteItem from '../components/Item/DeleteItem';

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
        link : "/product/deleteShowAll",
        component: DeleteProductsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/product/delete",
        component: DeleteProduct,
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

    {
        link : "/item/deleteShowAll",
        component: DeleteItemsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/item/delete",
        component: DeleteItem,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : "/shop",
        component: AllAvailableItemsList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : "/shop/add",
        component: AddListingToOrder,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : "/cart",
        component: AllListingsList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : "/cart/view",
        component: ShowListing,
        accessValid: () => auth.loggedIn() 
    },
    
]