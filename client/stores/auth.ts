import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@/services/auth';

export type AuthState = {
	user: User | null;
	token: string | null;
};

const initialState: AuthState = {
	user: null,
	token: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<AuthState['user']>) {
			state.user = action.payload;
		},

		setToken(state, action: PayloadAction<AuthState['token']>) {
			state.token = action.payload;
		},
	},
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
