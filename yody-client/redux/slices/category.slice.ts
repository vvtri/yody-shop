import {
	ActionCreator,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchCategories } from '../../src/product/apis/index.api'
import { ICategory } from '../../src/product/interfaces/category.interface'

interface CategoryState {
	categories: ICategory[]
}

const initialState: CategoryState = {
	categories: [],
}

const fetchCategoriesThunk = createAsyncThunk('category/fetchCategories', async () => {
	const { data } = await fetchCategories()
	return data
})

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
			state.categories = action.payload
		})
	},
})

export { fetchCategoriesThunk }

// export const { } = categorySlice.actions

export default categorySlice.reducer
