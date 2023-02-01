import {RegDataType, registerAPI} from '../../api/registerAPI';
import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';

const initialState: InitialStateType = {
    isRegistered: false
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'register/SIGN-UP':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// thunks
export const registerTC = (regData: RegDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        registerAPI.register(regData)
            .then(() => {
                dispatch(registerAC(true))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// actions
export const registerAC = (isRegistered: boolean) => ({type: 'register/SIGN-UP', isRegistered} as const)

// types
type ActionsType = ReturnType<typeof registerAC>

type InitialStateType = {
    isRegistered: boolean
}