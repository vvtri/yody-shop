import {
	ActionCreator,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

interface ProductState {}

const initialState: ProductState = {
	user: null,
	isLoading: true,
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
})

// export const {} = productSlice.actions

export default productSlice.reducer
