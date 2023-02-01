import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import {Register} from '../feautures/auth/register/Register';
import {RecoverPassword} from '../feautures/auth/recover-password/RecoverPassword';
import {SetNewPassword} from '../feautures/auth/enter-new-password/SetNewPassword';
import {Login} from '../feautures/auth/login/Login';
import {Profile} from '../feautures/auth/profile/Profile';
import {Packs} from '../feautures/packs/Packs';
import {Error404} from '../common/Error404/Error404';
import {Cards} from '../feautures/cards/Cards';
import {CheckEmail} from '../feautures/auth/recover-password/CheckEmail';
import {LearnPage} from '../feautures/learn/LearnPage';

export const Pages = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/recover-password'} element={<RecoverPassword/>}/>
            <Route path={'/check-email/:email'} element={<CheckEmail/>}/>
            <Route path={'/set-new-password/'}>
                <Route index element={<SetNewPassword/>}/>
                <Route path={':token'} element={<SetNewPassword/>}/>
            </Route>
            <Route path={'/packs'} element={<Packs/>}/>
            <Route path={'/cards/:packId/:packName'} element={<Cards/>}/>
            <Route path={'/learn/:packId/:packName'} element={<LearnPage/>}/>
            <Route path={'/404'} element={<Error404/>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
        </Routes>
    )
}