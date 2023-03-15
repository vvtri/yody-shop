import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { fetchSizes } from '../../src/product/apis/index.api'
import { ISize } from '../../src/product/interfaces/size.interface'

interface SizeState {
	sizes: ISize[]
}

const initialState: SizeState = {
	sizes: [],
}

const fetchSizesThunk = createAsyncThunk('size/fetchSizes', async () => {
	const { data } = await fetchSizes()
	return data
})

const sizeSlice = createSlice({
	name: 'size',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSizesThunk.fulfilled, (state, action) => {
			state.sizes = action.payload
		})
	},
})

export { fetchSizesThunk }

// export const {} = sizeSlice.actions

export default sizeSlice.reducer
