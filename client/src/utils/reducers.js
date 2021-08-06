import { useReducer } from 'react';

import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	ADD_OPEN_TAG,
	REMOVE_OPEN_TAG,
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case ADD_SEARCH_TAG:
			return {
				...state,
				searchTags: [...state.searchTags, action.id],
			};
		case REMOVE_SEARCH_TAG:
			return {
				...state,
				searchTags: state.searchTags.filter(
					(tagId) => tagId !== action.id
				),
			};
		case ADD_OPEN_TAG:
			return {
				...state,
				openTags: [...state.openTags, action.id],
			};
		case REMOVE_OPEN_TAG:
			return {
				...state,
				openTags: state.openTags.filter(
					(tagId) => tagId !== action.id
				),
			};
		default:
			return state;
	}
};

export function useStoreReducer(initialState) {
	return useReducer(reducer, initialState);
}
