import { getAuthUser, getUserToken, loginUser, logoutServer, registerUser, removeUserToken, setUserToken } from "./auth_helper"

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

export const setAuthMode = (mode) => ({
  type: 'SET_AUTH_MODE',
  payload: mode
})

export const checkAuth = () => dispatch => {
  getUserToken().then((token) => {
    if (token !== null) {
      getAuthUser(token).then((user) => {
        if (user !== null) {
          dispatch(setAuthUser(user))
          dispatch(setToken(token))
        }
      }).catch((errUser) => {
        console.log(errUser)
      })
    }
  }).catch((errToken) => {
    console.log(errToken)
  }).finally(() => {
    setTimeout(() => {
      dispatch(setAuthLoading(false))
    }, 3000);
  })
}

export const register = (name, email, password, password_confirmation) => dispatch => {
  dispatch(setLoading(true))
  registerUser(name, email, password, password_confirmation)
    .then(({ result, errorMessage }) => {
      if (errorMessage != null) {
        dispatch(setError(errorMessage))
        setTimeout(() => {
          dispatch(setError(null))
        }, 3000);
      }
      if (result == true) {
        dispatch(setAuthMode('login'))
        dispatch(setAuthLoading(true))
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
  dispatch(setLoading(true))
  logoutServer(token).then((logoutSuccess) => {
    if (logoutSuccess) {
      removeUserToken().then((removeTokenSuccess) => {
        if (removeTokenSuccess) {
          dispatch(setToken(null))
          dispatch(setAuthUser(null))
          dispatch(setAuthLoading(false))
          dispatch(setLoading(false))
        }
      })
    }
  })
}