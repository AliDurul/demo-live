import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statusByResource: {
        categories: 'idle',
        brands: 'idle',
        firms: 'idle',
        products: 'idle',
        sales: 'idle',
        purchases: 'idle',
    },
    error: null,
    categories: [],
    brands: [],
    firms: [],
    products: [],
    purchases: [],
    sales: [],
}

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        fetchStart: (state, { payload }) => {
            state.error = null
            state.statusByResource[payload] = 'loading'
        },
        stockSuccess: (state, { payload: { url, data } }) => {
            state[url] = data,
                state.statusByResource[url] = 'succeded'
        },
        fetchFail: (state, { payload: { url, error } }) => {
            state.error = error
            state.statusByResource[url] = 'failed'
        },
    },
})

export const { fetchStart, fetchFail, stockSuccess } = stockSlice.actions

export const selectFirms = (state) => state.stock.firms
export const selectBrands = (state) => state.stock.brands
export const selectCategories = (state) => state.stock.categories
export const selectProducts = (state) => state.stock.products
export const selectPurchases = (state) => state.stock.purchases
export const selectSales = (state) => state.stock.sales
export const selectError = (state) => state.stock.error

export const selectFirmsStatus = (state) => state.stock.statusByResource.firms;
export const selectPurchasesStatus = (state) => state.stock.statusByResource.purchases;
export const selectSalesStatus = (state) => state.stock.statusByResource.sales;
export const selectProductsStatus = (state) => state.stock.statusByResource.products;
export const selectBrandsStatus = (state) => state.stock.statusByResource.brands;
export const selectCategoriesStatus = (state) => state.stock.statusByResource.categories;
export default stockSlice.reducer