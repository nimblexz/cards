import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const newPasswordAPI = {
    sendNewPassword: (newPasswordData: newPasswordType) => {
        return instance.post<newPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', newPasswordData)
    }
}

// types
type ResponseType = {
    info: string
    error: string;
}
export type newPasswordType = {
    password: string
    resetPasswordToken: string
}
