import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './auth';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: hardSet,
};

const store = configureStore({
	reducer: {
		auth: persistReducer<ReturnType<typeof authReducer>>(
			persistConfig,
			authReducer
		),
	},
	devTools: process.env.NODE_ENV != 'production',
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
