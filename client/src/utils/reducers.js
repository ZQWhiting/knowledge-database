import { useReducer } from 'react';

import { ACTIVATE_TAG, DEACTIVATE_TAG } from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case ACTIVATE_TAG:
			return {
				...state,
				activatedTags: [...state.activatedTags, action.tag],
			};
		case DEACTIVATE_TAG:
			return {
				...state,
				activatedTags: state.activatedTags.filter(
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
