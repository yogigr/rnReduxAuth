import { getAuthUser, getUserToken, loginUser, logoutServer, removeUserToken, setUserToken } from "./auth_helper"

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token
})

export const setAuthLoading = (bool) => ({
  type: 'SET_AUTH_LOADING',
  payload: bool,
})

export const setAuthUser = (user) => ({
  type: 'SET_AUTH_USER',
  payload: user
})

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
})

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  payload: bool
})

export const checkAuth = () => dispatch => {
  getUserToken().then((token) => {
    if (token !== null) {
      dispatch(setToken(token))
      getAuthUser(token).then((user) => {
        if (user !== null) {
          dispatch(setAuthUser(user))
          dispatch(setAuthLoading(false))
        }
      })
    } else {
      dispatch(setAuthLoading(false))
    }
  })
}

export const login = (email, password) => dispatch => {
  dispatch(setLoading(true))
  loginUser(email, password).then(({ token, errorMessage }) => {
    if (errorMessage !== null) {
      dispatch(setError(errorMessage))
      setTimeout(() => {
        dispatch(setError(null))
      }, 3000);
    }
    if (token !== null) {
      dispatch(setAuthLoading(true))
      getAuthUser(token).then((user) => {
        if (user !== null) {
          dispatch(setAuthUser(user))
          setUserToken(token).then((success) => {
            if (success) {
              dispatch(setToken(token))
              return true
            }
          })
        }
      })
    }
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setAuthLoading(false))
    }, 3000);
  })
}

export const logout = (token) => dispatch => {
  dispatch(setAuthLoading(true))
  logoutServer(token).then((logoutSuccess) => {
    if (logoutSuccess) {
      removeUserToken().then((removeTokenSuccess) => {
        if (removeTokenSuccess) {
          dispatch(setToken(null))
          dispatch(setAuthUser(null))
          dispatch(setAuthLoading(false))
        }
      })
    }
  })
}