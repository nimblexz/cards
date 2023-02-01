import React, {useCallback} from 'react';
import styles from '../../../styles/Authorization.module.css'
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {loginTC} from '../../../bll/reducers/auth-reducer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import error from '../../../utils/Error.module.css'

export const Login = React.memo(() => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = useCallback(() => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    }, [valuesPassword]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign In</div>
                <FormControl variant="standard">
                    <InputLabel color="secondary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={styles.input}
                        color="secondary"
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email &&
                    <div className={error.error}>{formik.errors.email}</div>}

                <FormControl variant="standard">
                    <InputLabel color="secondary">Password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'Password'}
                        className={styles.input}
                        color="secondary"
                        {...formik.getFieldProps('password')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div className={error.error}>{formik.errors.password}</div>}

                <FormControlLabel label={'Remember me'}
                                  control={<Checkbox color="secondary"
                                                     checked={formik.values.rememberMe}
                                                     {...formik.getFieldProps('rememberMe')}
                                  />
                                  }/>
                <Link className={styles.textLink} to={'/recover-password'}>Forgot Password</Link>
                <Button color="secondary" variant={'contained'} type="submit">Login</Button>
                Don’t have an account?
                <Link to={'/register'}>Sign Up</Link>
            </form>
        </div>
    );
});

// types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: false
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}
