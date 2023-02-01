import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const registerAPI = {
    register: (regData: RegDataType) => {
        return instance.post<RegDataType, AxiosResponse<AddedUserType>>('/auth/register', regData)
    }
}

// types
export type RegDataType = {
    email: string
    password: string
}

type AddedUserType = {
    id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    error?: string
}