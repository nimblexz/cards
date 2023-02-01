import React, {useEffect} from 'react';
import './App.module.css';
import {Pages} from './Routes';
import {HashRouter} from 'react-router-dom';
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar';
import {Preloader} from '../common/Loader/Loader';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {authMeTC} from '../bll/reducers/app-reducer';
import styles from './App.module.css'

const App = () => {
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch]);

    if (!isInitialized) {
        return <div className={styles.isInitialized}>
            <Preloader/>
        </div>
    }

    return (

        <div className="App">
            {status === 'loading' && <div className={styles.isInitialized}><Preloader/></div>}
            <HashRouter>
                <Pages/>
            </HashRouter>
            <ErrorSnackbar/>

        </div>
    );
}

export default App;
