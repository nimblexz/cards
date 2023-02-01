import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../bll/store';
import {setAppErrorAC} from '../../bll/reducers/app-reducer';
import {convertFileToBase64} from '../../utils/convertFileToBase64';

type InputFilePropsType = {
    children: React.ReactNode
    uploadImage: (data: string) => void
}

export const InputTypeFile: React.FC<InputFilePropsType> = React.memo(({
                                                                           children,
                                                                           uploadImage,
                                                                       }) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    uploadImage(file64)
                })
            } else {
                dispatch(setAppErrorAC('The file is too large'))
            }
        }
    }

    return (
        <label>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
            />
            {children}
        </label>
    )
})