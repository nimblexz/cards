import React, {useCallback} from 'react';
import styles from '../../../styles/Authorization.module.css'
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {setInfoTC} from '../../../bll/reducers/set-new-password-reducer';
import {Navigate, useParams} from 'react-router-dom';
import error from '../../../utils/Error.module.css'

export const SetNewPassword = React.memo(() => {
    const dispatch = useAppDispatch()
    const isPassChanged = useAppSelector(state => state.setNewPassword.isPassChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
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
            token && dispatch(setInfoTC({password: values.password, resetPasswordToken: token}))
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

    if (isPassChanged) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Create new password</div>
                <FormControl variant="standard">
                    <InputLabel color={'secondary'}>New password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'New password'}
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
                    <InputLabel color={'secondary'}>Confirm new
                        password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                        placeholder={'Confirm new password'}
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
                <div className={styles.instructions}>Create new password and we will send you further instructions to
                    email
                </div>
                <Button color={'secondary'} variant={'contained'} type="submit">Create new password</Button>
            </form>
        </div>
    );
});

// types
type FormikErrorType = {
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