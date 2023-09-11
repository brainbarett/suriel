import {
	TypedUseSelectorHook,
	useDispatch as useDefaultDispatch,
	useSelector as useDefaultSelector,
} from 'react-redux';
import { RootState, AppDispatch } from '@/stores';

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
