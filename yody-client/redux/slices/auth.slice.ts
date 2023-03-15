import {
	ActionCreator,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchUser } from '../../src/auth/apis/index.api'
import { IUser } from '../../src/auth/interfaces/user.interface'
import { ChangeUserInfoPayload } from '../../src/user/interfaces/payload.interface'

interface AuthState {
	user: IUser | null
	isLoading: boolean
}

const initialState: AuthState = {
	user: null,
	isLoading: true,
}

const fetchUserThunk = createAsyncThunk('auth/fetchUser', async () => {
	try {
		const { data } = await fetchUser()
		return data
	} catch (error) {
		console.log(error)
		return null
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (
			state,
			{ payload }: PayloadAction<{ user: IUser | null; isLoading: boolean }>
		) => {
			state.user = payload.user
			state.isLoading = payload.isLoading
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		updateUser: (state, { payload }: PayloadAction<ChangeUserInfoPayload>) => {
			const { address, phoneNumber } = payload
			if (!state.user) return
			if (address) state.user.address = address
			if (phoneNumber) state.user.phoneNumber = phoneNumber
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
			state.user = action.payload
			state.isLoading = false
		})
		builder.addCase(fetchUserThunk.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export { fetchUserThunk }

export const { setUser, setLoading, updateUser } = authSlice.actions

export default authSlice.reducer
