import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice'
import brandSlice from './slices/brand.slice'
import categorySlice from './slices/category.slice'
import colorSlice from './slices/color.slice'
import productSlice from './slices/product.slice'
import sizeSlice from './slices/size.slice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		product: productSlice,
		color: colorSlice,
		size: sizeSlice,
		brand: brandSlice,
		category: categorySlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
