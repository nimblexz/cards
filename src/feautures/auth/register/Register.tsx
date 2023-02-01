import React, {useCallback} from 'react';
import styles from '../../../styles/Authorization.module.css'
import {Link, Navigate} from 'react-router-dom';
import {registerTC} from '../../../bll/reducers/register-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import error from '../../../utils/Error.module.css'

export const Register = React.memo(() => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.register.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The password and confirmation password do not match'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = useCallback(() => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    }, [valuesPassword]);

    const handleClickShowConfirmPassword = useCallback(() => {
        setValuesConfirmPassword({
            ...valuesConfirmPassword,
            showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
        });
    }, [valuesConfirmPassword]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign Up</div>
                <FormControl variant="standard">
                    <InputLabel color={'secondary'} htmlFor="component-simple">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={styles.input}
                        color={'secondary'}
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email &&
                    <div className={error.error}>{formik.errors.email}</div>}

                <FormControl variant="standard">
                    <InputLabel color={'secondary'}>Password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'Password'}
                        className={styles.input}
                        color={'secondary'}
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

                <FormControl variant="standard">
                    <InputLabel color={'secondary'}>Confirm password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                        placeholder={'Confirm password'}
                        className={styles.input}
                        color={'secondary'}
                        {...formik.getFieldProps('confirmPassword')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesConfirmPassword.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div className={error.error}>{formik.errors.confirmPassword}</div>}
                <Button color={'secondary'} variant={'contained'} type="submit">Register</Button>
                Already have an account?
                <Link to={'/login'}>Sign In</Link>
            </form>
        </div>
    );
});

// types
type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}

type StateConfirmPassword = {
    confirmPassword: string;
    showConfirmPassword: boolean;
}