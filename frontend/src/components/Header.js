import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const disaptch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const logOutHandaler = () => {
        disaptch(logout())
        disaptch(reset())
        navigate('/')
    }
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>GoalSeater</Link>
            </div>
            <ul>
                {user ?
                    (<li>
                        <button className='btn' onClick={logOutHandaler}><FaSignOutAlt /> Logout</button>
                    </li>) :
                    (<>
                        <li>
                            <Link to='/login'><FaSignInAlt /> Login</Link>
                        </li>
                        <li>
                            <Link to='/register'><FaUser /> Register</Link>
                        </li>
                    </>)
                }

            </ul >
        </header >
    )
}

export default Header