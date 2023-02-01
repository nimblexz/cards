import {AppThunk} from '../store';
import {newPasswordAPI, newPasswordType} from '../../api/newPasswordAPI';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';

const initialState: InitialStateType = {
    info: '',
    isPassChanged: false
}

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'set-new-password/NEW-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'set-new-password/IS-PASS-CHANGED':
            return {...state, isPassChanged: action.isPassChanged}
        default:
            return state
    }
}

// thunks
export const setInfoTC = (newPasswordData: newPasswordType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        newPasswordAPI.sendNewPassword(newPasswordData)
            .then((res) => {
                dispatch(setInfoAC(res.data.info))
                dispatch(setPassChangedAC(true))
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
export const setInfoAC = (info: string) => ({type: 'set-new-password/NEW-PASSWORD-SUCCESS', info} as const)
export const setPassChangedAC = (isPassChanged: boolean) => ({type: 'set-new-password/IS-PASS-CHANGED', isPassChanged} as const)

// types
type InitialStateType = {
    info: string
    isPassChanged: boolean
}

type ActionsType = ReturnType<typeof setInfoAC> | ReturnType<typeof setPassChangedAC>