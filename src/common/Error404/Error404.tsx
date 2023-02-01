import React from 'react';
import error404 from '../../assets/images/404.png'
import styles from '../../utils/Error.module.css'

export const Error404 = () => {
    return (
        <div className={styles.error404}>
            <img src={error404} alt={'Page not found'}/>
        </div>
    );
};