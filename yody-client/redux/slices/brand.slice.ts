import {
	ActionCreator,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchBrands } from '../../src/product/apis/index.api'
import { IBrand } from '../../src/product/interfaces/brand.interface'

interface BrandState {
	brands: IBrand[]
}

const initialState: BrandState = {
	brands: [],
}

const fetchBrandsThunk = createAsyncThunk('brand/fetchBrands', async () => {
	const { data } = await fetchBrands()
	return data
})

const brandSlice = createSlice({
	name: 'brand',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBrandsThunk.fulfilled, (state, action) => {
			state.brands = action.payload
		})
	},
})

export { fetchBrandsThunk }

// export const {} = brandSlice.actions

export default brandSlice.reducer
