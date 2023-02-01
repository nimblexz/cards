import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const recoverAPI = {
    sendEmail: (email: string, message: string) => {
        return instance.post<{ email: string, message: string }, AxiosResponse<ResponseType>>('/auth/forgot', {
            email,
            message
        })
    }
}

// types
type ResponseType = {
    info: string
    error: string
}

