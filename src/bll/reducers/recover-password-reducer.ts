import {AppThunk} from '../store';
import {recoverAPI} from '../../api/recoverAPI';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';

const initialState: InitialStateType = {
    info: ''
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'recover/CONFIRM-STATUS':
            return {...state, info: action.info}
        default:
            return state
    }
}

// thunks
export const recoverTC = (email: string, message: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        recoverAPI.sendEmail(email, message)
            .then((res) => {
                dispatch(recoverAC(res.data.info))
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
export const recoverAC = (info: string) => ({type: 'recover/CONFIRM-STATUS', info} as const)

// types
type ActionsType = ReturnType<typeof recoverAC>

type InitialStateType = {
    info: string
}