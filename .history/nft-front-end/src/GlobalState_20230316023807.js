import { createContext, useContext, useReducer } from 'react';

export const GlobalStateContext = createContext();

const initialState = {
    alert: { show: false, msg: '', color: '' },
    loading: { show: false, msg: '' },
    contract: null,
    maxSupply: 100,
    connectedAccount: '',
    nfts: [],
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALERT':
        return { ...state, alert: action.payload };
        case 'SET_LOADING_MSG':
        return { ...state, loading: { ...state.loading, msg: action.payload } };
        case 'SET_GLOBAL_STATE':
        return { ...state, [action.key]: action.payload };
        default:
        return state;
    }
};

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
        {children}
    </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const { state, dispatch }  = useContext(GlobalStateContext);
    return [state, dispatch];
    // if (context === undefined) {
    //     throw new Error('useGlobalState must be used within a GlobalStateProvider');
    // }
    // return context;
};
