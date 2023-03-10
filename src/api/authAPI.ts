import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const authAPI = {
    authMe() {
        return instance.post<{}, AxiosResponse<ResponseType>>('/auth/me')
    },
    login(data: DataLoginType) {
        return instance.post<DataLoginType, AxiosResponse<ResponseType>>(`/auth/login`, data)
    },
    logout() {
        return instance.delete<ResponseType>('/auth/me')
    }
}

// types
export type DataLoginType = {
    email: string
    password: string
    rememberMe: boolean
};

export type ResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    __v: any,
    token: string,
    tokenDeathTime: number,
    avatar: string,
};
