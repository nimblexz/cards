import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authReducer} from './reducers/auth-reducer';
import {registerReducer} from './reducers/register-reducer';
import {recoverPasswordReducer} from './reducers/recover-password-reducer';
import {setNewPasswordReducer} from './reducers/set-new-password-reducer';
import {appReducer} from './reducers/app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {packsReducer} from './reducers/packs-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {cardsReducer} from "./reducers/cards-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    recoverPassword: recoverPasswordReducer,
    setNewPassword: setNewPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;