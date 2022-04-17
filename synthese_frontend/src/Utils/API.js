/* eslint-disable */
const URL_BACKEND = "http://localhost:9090/"; 

export const LOGIN_CLIENT = URL_BACKEND + "login/client/";
export const LOGIN_MANAGER = URL_BACKEND + "login/manager/";
export const SIGN_UP = URL_BACKEND + "signUp/client";

export const PRODUCT_ADD = URL_BACKEND + "inventory/product/add";
export const PRODUCT_ALL = URL_BACKEND + "inventory/product/getAll";
export const PRODUCT_DELETE = URL_BACKEND + "inventory/product/delete/";
export const PRODUCT_UPDATE = URL_BACKEND + "inventory/product/add";

export const ITEM_ADD = URL_BACKEND + "inventory/item/add/";
export const ITEM_ALL = URL_BACKEND + "inventory/item/getAll";
export const ITEM_DELETE = URL_BACKEND + "inventory/item/delete/";
export const ITEM_UPDATE = URL_BACKEND + "inventory/item/update/";
export const ITEM_ALL_AVAILABLE = URL_BACKEND + "inventory/item/getAllAvailable";

export const CART_GET = URL_BACKEND + "inventory/listing/getList/";

export const LISTING_ADD = URL_BACKEND + "inventory/listing/add/";
export const LISTING_DELETE = URL_BACKEND + "inventory/listing/delete/";
export const LISTING_UPDATE = URL_BACKEND + "inventory/listing/update/";

export const ORDER_ADD = URL_BACKEND + "inventory/order/add/";
export const ORDER_ACCEPT = URL_BACKEND + "inventory/order/acceptOrder/";
export const ORDER_GET_LIST = URL_BACKEND + "inventory/order/getList/";
export const ORDER_ALL_UNACCEPTED = URL_BACKEND + "inventory/order/getAllUnaccepted";


