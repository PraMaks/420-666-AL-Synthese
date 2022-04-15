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
import CheckoutList from '../components/Checkout/CheckoutList';
import AllOrdersList from '../components/Order/AllOrdersList';
import ShowOrder from '../components/Order/ShowOrder';
import AllUnacceptedOrders from '../components/Order/AllUnacceptedOrders';
import AcceptOrder from '../components/Order/AcceptOrder';

import auth from '../services/Auth';
import { URL_ADD_ITEM, URL_ADD_PRODUCT, URL_ALL_ITEMS_LIST, URL_ALL_ORDERS, URL_ALL_PRODUCTS_LIST, URL_ALL_UNACCEPTED_ORDERS, URL_CART, URL_CART_SHOW_LISTING, URL_CHECKOUT, URL_DELETE_ITEM, URL_DELETE_ITEM_LIST, URL_DELETE_PRODUCT, URL_DELETE_PRODUCT_LIST, URL_HOME, URL_ORDER, URL_ORDER_ACCEPT, URL_SELECT_PRODUCT_LIST, URL_SHOP, URL_SHOP_ADD_T0_CART, URL_UPDATE_ITEM, URL_UPDATE_PRODUCT } from './URL';

export const ROUTES = [
    {
        link : URL_HOME,
        component: Home,
        accessValid: () => auth.loggedIn() || auth.loggedInManager()
    },

    {
        link : URL_ADD_PRODUCT,
        component: AddProduct,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_ALL_PRODUCTS_LIST,
        component: AllProductsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_UPDATE_PRODUCT,
        component: UpdateProduct,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_DELETE_PRODUCT_LIST,
        component: DeleteProductsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_DELETE_PRODUCT,
        component: DeleteProduct,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_SELECT_PRODUCT_LIST,
        component: SelectItemFromProductList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_ADD_ITEM,
        component: AddItem,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_ALL_ITEMS_LIST,
        component: AllItemsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_UPDATE_ITEM,
        component: UpdateItem,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_DELETE_ITEM_LIST,
        component: DeleteItemsList,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_DELETE_ITEM,
        component: DeleteItem,
        accessValid: () => auth.loggedInManager()
    },

    {
        link : URL_SHOP,
        component: AllAvailableItemsList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_SHOP_ADD_T0_CART,
        component: AddListingToOrder,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_CART,
        component: AllListingsList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_CART_SHOW_LISTING,
        component: ShowListing,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_CHECKOUT,
        component: CheckoutList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_ALL_ORDERS,
        component: AllOrdersList,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_ORDER,
        component: ShowOrder,
        accessValid: () => auth.loggedIn() 
    },

    {
        link : URL_ALL_UNACCEPTED_ORDERS,
        component: AllUnacceptedOrders,
        accessValid: () => auth.loggedInManager() 
    },

    {
        link : URL_ORDER_ACCEPT,
        component: AcceptOrder,
        accessValid: () => auth.loggedInManager() 
    },
    
]