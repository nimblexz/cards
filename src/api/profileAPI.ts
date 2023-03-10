import {UserDataType} from '../bll/reducers/profile-reducer';
import {instance} from './instance';

export const profileAPI = {
    updateUserData(params: UserDataType) {
        return instance.put('/auth/me', params)
    },
};

// types
export type UpdateUserParamsType = {
    name: string
    avatar: string
}