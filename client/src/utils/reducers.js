import { useReducer } from 'react';

import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	ADD_OPEN_TAG,
	REMOVE_OPEN_TAG,
	RESET_TAGS,
	SET_TAGS,
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_TAGS:
			const openTags = new Set();
			const openParentRecurse = (tag) => {
				openTags.add(tag._id);
				if (tag.parent) openParentRecurse(tag.parent);
			};
			const fileTags = action.tags.map((tag) => {
				if (tag.parent) openParentRecurse(tag.parent);
				return tag._id;
			});
			return {
				...state,
				searchTags: [...fileTags],
				openTags: [...openTags],
			};
		case RESET_TAGS:
			return {
				...state,
				searchTags: [],
			};
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
				openTags: state.openTags.filter((tagId) => tagId !== action.id),
			};
		default:
			return state;
	}
};

export function useStoreReducer(initialState) {
	return useReducer(reducer, initialState);
}
