import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, message, isSuccess } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isLoading, isError, message, isSuccess])

    const onChangeHandaler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const submitHandaler = (e) => {
        e.preventDefault()
        const loginData = {
            email,
            password
        }
        dispatch(login(loginData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to your account</p>
            </section>
            <section className='form'>
                <form onSubmit={submitHandaler}>
                    <div className='form-group'>
                        <input type='text' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <input type='password' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login