import React from 'react';
import styles from './Navbar.module.css'
import packList from '../../assets/images/packsList.png'
import profile from '../../assets/images/profile.png'
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.itemForm}>
                    <NavLink to={'/packs'} className={({isActive}) => isActive ? styles.active : styles.item}>
                        <img src={packList} className={styles.packList} alt={'Packs list icon'}/>
                        <span>Packs list</span>
                    </NavLink>
                </div>
                <div className={styles.itemForm}>
                    <NavLink to={'/profile'} className={({isActive}) => isActive ? styles.active : styles.item}>
                        <img src={profile} className={styles.profile} alt={'Profile icon'}/>
                        <span>Profile</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};