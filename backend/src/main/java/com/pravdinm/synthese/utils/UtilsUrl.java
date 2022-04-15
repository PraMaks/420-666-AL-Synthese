package com.pravdinm.synthese.utils;

public class UtilsUrl {

    public final static String CROSS_ORIGIN_ALLOWED = "http://localhost:3006";

    public static class AuthControllerUrl {
        public final static String URL_SIGN_UP_CLIENT = "/signUp/client";
        public final static String URL_LOGIN_CLIENT = "/login/client/{username}/{password}";
        public final static String URL_LOGIN_MANAGER = "/login/manager/{username}/{password}";
    }

    public static class InventoryControllerUrl {
        public final static String URL_ADD_PRODUCT = "/inventory/product/add";
        public final static String URL_GET_PRODUCT = "/inventory/product/get/{productId}";
        public final static String URL_GET_ALL_PRODUCTS = "/inventory/product/getAll";
        public final static String URL_DELETE_PRODUCT = "/inventory/product/delete/{productId}";

        public final static String URL_ADD_ITEM = "/inventory/item/add/{productId}/{itemAvailability}/{itemCost}";
        public final static String URL_GET_ITEM = "/inventory/item/get/{itemId}";
        public final static String URL_GET_ALL_ITEMS = "/inventory/item/getAll";
        public final static String URL_UPDATE_ITEM = "/inventory/item/update/{productId}/{itemAvailability}/{itemCost}";
        public final static String URL_DELETE_ITEM = "/inventory/item/delete/{itemId}";
        public final static String URL_GET_ALL_AVAILABLE_ITEMS = "/inventory/item/getAllAvailable";

        public final static String URL_ADD_LISTING = "/inventory/listing/add/{itemId}/{listingAmount}/{userId}";
        public final static String URL_GET_LISTING = "/inventory/listing/get/{listingId}";
        public final static String URL_GET_LISTINGS_FROM_CLIENT = "/inventory/listing/getList/{userId}";
        public final static String URL_DELETE_LISTING_FROM_CLIENT = "/inventory/listing/delete/{userId}/{listingId}";
        public final static String URL_UPDATE_LISTING = "/inventory/listing/update/{listingId}/{listingAmount}/{userId}";

        public final static String URL_ADD_ORDER = "/inventory/order/add/{userId}";
        public final static String URL_GET_ORDER = "/inventory/order/get/{orderId}";
        public final static String URL_GET_ORDERS_FROM_CLIENT = "/inventory/order/getList/{userId}";
        public final static String URL_GET_ALL_UNACCEPTED_ORDERS = "/inventory/order/getAllUnaccepted";
        public final static String URL_ACCEPT_ORDER = "/inventory/order/acceptOrder/{orderId}";
    }
}
