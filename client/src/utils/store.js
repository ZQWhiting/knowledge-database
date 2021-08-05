import React, { createContext, useContext } from 'react';
import { useStoreReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useStoreReducer({
		activatedTags: [],
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
