import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
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

        if (password !== password2) {
            toast.error("Password not match!")
        } else {
            const userPayload = {
                name,
                email,
                password
            }
            dispatch(register(userPayload))
        }
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={submitHandaler}>
                    <div className='form-group'>
                        <input type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <input type='text' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <input type='password' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <input type='password' id='password2' name='password2' value={password2} placeholder='Conform password' onChange={onChangeHandaler} />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register