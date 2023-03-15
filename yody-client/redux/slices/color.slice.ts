import {
	ActionCreator,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchColors } from '../../src/product/apis/index.api'
import { IColor } from '../../src/product/interfaces/color.interface'

interface ColorState {
  colors: IColor[]
}

const initialState: ColorState = {
  colors: []
}

const fetchColorsThunk = createAsyncThunk('color/fetchColors', async () => {
	const { data } = await fetchColors()
	return data
})


const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {
    
	},
	extraReducers: (builder) => {
    builder.addCase(fetchColorsThunk.fulfilled, (state, action) => {
			state.colors = action.payload
		})
	},
})

export {fetchColorsThunk}

// export const { } = colorSlice.actions

export default colorSlice.reducer
