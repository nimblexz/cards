import {setAppStatusAC} from './app-reducer';
import {authAPI, DataLoginType} from '../../api/authAPI';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {setUserDataAC} from './profile-reducer';

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// thunks
export const loginTC = (data: DataLoginType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(res.data))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setIsLoggedInAC>









