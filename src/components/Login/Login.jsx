import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);


    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
      // redirected to the login page. Use { replace: true } so we don't create
            navigate(from, { replace: true });
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="">email</label>
                    <input type="email" name="email" id='' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Password</label>
                    <input type={show ?"text" : "password"} name="password" id='' required/>
                    <p onClick={() => setShow(!show)}><small>
                            {
                                show ? <span>Hide password</span> : <span>Show password</span>
                            }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value='Login' />
            </form>
            <p><small>New to Ema-jhon?<Link to='/signup'>Sign Up</Link> </small></p>
        </div>
    );
};

export default Login;