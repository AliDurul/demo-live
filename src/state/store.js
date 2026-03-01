import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/authSlice'
import themeReducer from '@/features/themeSlice'
import stockReducer from '@/features/stockSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist"

const persistConfig = {
    key: 'stock-app',
    storage,
    whitelist: ['auth', 'theme'],
}

const rootReducer = {
    auth: authReducer,
    theme: themeReducer,
    stock: stockReducer,
}

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer))

export const store = configureStore({
    reducer: persistedReducer,
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
export default store