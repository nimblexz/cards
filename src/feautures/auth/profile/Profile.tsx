import React, {useState} from 'react';
import styles from '../../../styles/Authorization.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {logoutTC} from '../../../bll/reducers/auth-reducer';
import {Button, IconButton} from '@mui/material';
import {updateUserDataTC} from '../../../bll/reducers/profile-reducer';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Navbar} from '../../navbar/Navbar';
import defaultAva from '../../../assets/images/defaultAva.png';
import {setAppErrorAC} from '../../../bll/reducers/app-reducer';
import {PhotoCamera} from '@mui/icons-material';

type ProfileType = {
    title?: string
    changeTitle?: (title: string) => void
    disabled?: boolean
    activateEditMode?: () => void
}

export const Profile: React.FC<ProfileType> = React.memo(({disabled}) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const userId = useAppSelector(state => state.profile._id)
    const email = useAppSelector(state => state.profile.email)
    const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)

    const [avatar, setAvatar] = useState<string>(userAvatar ? userAvatar : defaultAva)
    const [isAvatarBroken, setIsAvatarBroken] = useState(false)

    const errorHandler = () => {
        setIsAvatarBroken(true)
        dispatch(setAppErrorAC('Wrong images'))
    }

    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        if (disabled) {
            return
        } else {
            setEditMode(true)
        }
    }

    const changeUserName = (name: string) => {
        dispatch(updateUserDataTC({name: name, avatar: userAvatar, _id: userId, publicCardPacksCount, email}))
    }

    const changeUserAvatar = (avatar: string) => {
        setAvatar(avatar)
        dispatch(updateUserDataTC({name: userName, avatar, _id: userId, publicCardPacksCount, email}))
    }

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Navbar/>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <span className={styles.title}>Profile Info</span>
                    <div className={styles.container}>
                        <img
                            src={isAvatarBroken ? defaultAva : avatar}
                            style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '50%',
                                marginBottom: '-40px',
                            }}
                            onError={errorHandler}
                            alt="avatar"
                        />
                        <InputTypeFile uploadImage={changeUserAvatar}>
                            <IconButton component="span" color={'secondary'} sx={{right: '-68px', top: '10px'}}>
                                <PhotoCamera/>
                            </IconButton>
                        </InputTypeFile>
                        <div className={styles.nickname}>
                            <EditableSpan
                                title={userName}
                                changeTitle={changeUserName}
                                editMode={editMode}
                                setEditMode={setEditMode}
                            />
                            <IconButton color={'secondary'}>
                                <BorderColorIcon onClick={activateEditMode}/>
                            </IconButton>
                        </div>
                        <div className={styles.cardPacksCount}>
                            <div><b>E-mail: </b>{email}</div>
                            <div><b>Card Packs: </b> {publicCardPacksCount}</div>
                        </div>
                    </div>
                    <Button color={'secondary'} variant={'contained'} onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    )
})


