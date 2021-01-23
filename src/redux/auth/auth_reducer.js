import { getUserToken, getAuthUser } from './auth_helper'

const initialState = {
    authMode: 'login',
    authLoading: true,
    loading: false,
    token: null,
    user: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_LOADING':
            return { ...state, authLoading: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_TOKEN':
            return { ...state, token: action.payload }
        case 'SET_AUTH_USER':
            return { ...state, user: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        default:
            return state
    }
}

export default authReducer