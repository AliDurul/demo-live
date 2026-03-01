/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    statusByResource: {
        categories: 'idle',
        brands: 'idle',
        firms: 'idle',
        products: 'idle',
        sales: 'idle',
        purchases: 'idle',
    },
    categories: [],
    brands: [],
    firms: [],
    products: [],
    sales: [],
    purchases: []
}

export const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        fetchStart: (state, { payload }) => {
            state.error = null;
            if (payload) {
                state.statusByResource[payload] = 'loading';
            }
        },
        getSuccess: (state, { payload: { data, url } }) => {
            state[url] = data;
            state.statusByResource[url] = 'succeeded';
        },
        fetchFail: (state, { payload: { error, url } }) => {
            state.error = error;
            if (url) {
                state.statusByResource[url] = 'failed';
            }
        },
    }
})

export const { fetchStart, getSuccess, fetchFail, } = stockSlice.actions;

// select states
export const selectError = (state) => state.stock.error;
export const selectFirms = (state) => state.stock.firms;
export const selectBrands = (state) => state.stock.brands;
export const selectProducts = (state) => state.stock.products;
export const selectCategories = (state) => state.stock.categories;
export const selectSales = (state) => state.stock.sales;
export const selectPurchases = (state) => state.stock.purchases;
// select status
export const selectFirmsStatus = (state) => state.stock.statusByResource.firms;
export const selectPurchasesStatus = (state) => state.stock.statusByResource.purchases;
export const selectSalesStatus = (state) => state.stock.statusByResource.sales;
export const selectProductsStatus = (state) => state.stock.statusByResource.products;
export const selectBrandsStatus = (state) => state.stock.statusByResource.brands;
export const selectCategoriesStatus = (state) => state.stock.statusByResource.categories;

export default stockSlice.reducer;