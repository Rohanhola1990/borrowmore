import React, { useEffect, useState } from 'react';
import authData from "../borrowmoreData.json"

const AuthRouting = (props) => {
    const [authView, setAuthView] = useState('login');
    const [loginCreds, setLoginCreds] = useState({
        email: "",
        password: ""
    })
    const [loginErrors, setLoginErrors] = useState({
        email: "",
        password: ""
    })
    const [signupCreds, setSignupCreds] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [signupErrors, setSignupErrors] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [authError, setAuthError] = useState("")

    const submitLogin = (e) => {
        e.preventDefault();

        if(loginCreds.email.trim() === "") {
            setLoginErrors({...loginErrors, email: "Email cannot be empty!"})
        }
        if(loginCreds.password.trim() === "") {
            setLoginErrors({...loginErrors, password: "Password cannot be empty!"})   
        }

        if(loginCreds.password.trim() !== "" && loginCreds.email.trim() !== "") {
            if(authData.filter(user => user.email === loginCreds.email).length > 0) {
                let loggedUser = authData.filter(user => user.email === loginCreds.email ? user : "");
                window.localStorage.setItem('user', JSON.stringify(loggedUser[0]))
                props.setUser(loggedUser)
                props.setAuthorised(true)
            }
            else {
                setAuthError("User does not exist. Please signup.")
                setTimeout(()=>{
                    setAuthError("")
                }, 3000)
            }
        }
    }

    const submitSignup = (e) => {
        e.preventDefault();
        console.log(e);
    }
    
    return (
        <div className='loginPage'>
            <header className='headerAuth d-flex f-justify-between'>
                <h3>
                    Borrowmore
                </h3>

                <div className='optAuth'>
                    <button className='btn btnLogin' onClick={()=>setAuthView("login")} disabled={authView == "login"}>
                        Login
                    </button>
                    <button className='btn btnRegsiter' onClick={()=>setAuthView("register")} disabled={authView == "register"}>
                        Register
                    </button>
                </div>
            </header>
            <div className='authBody'>
                {authView === "login" ? 
                <div className='formLogin'>
                    {authError.trim() !== "" ? 
                        <div className='authError'>
                            {authError}
                        </div> : ""
                    }
                    <form onSubmit={submitLogin}>
                        <div className={loginErrors.email.trim() !== "" ? 'formGroup error' : 'formGroup'}>
                            <label>Email</label>
                            <div className='formRow'>
                                <input type="email" placeholder='Email' onChange={(e)=>setLoginCreds({...loginCreds, email: e.target.value})} />
                            </div>
                            {loginErrors.email.trim() !== "" ? <p>{loginErrors.email}</p> : ""}
                        </div>
                        <div className={loginErrors.password.trim() !== "" ? 'formGroup error' : 'formGroup'}>
                            <label>Password</label>
                            <div className='formRow'>
                                <input type="password" placeholder='******' onChange={(e)=>setLoginCreds({...loginCreds, password: e.target.value})} />
                            </div>
                            {loginErrors.password.trim() !== "" ? <p>{loginErrors.password}</p> : ""}
                        </div>
                        <footer className='formGroup formFooter'>
                            <button className='btn btnLogin' type='submit'>
                                Login
                            </button>
                        </footer>
                    </form>
                </div> : 
                <div className='formAuth'>
                    <form onSubmit={submitSignup}>
                        <div className={signupErrors.name.trim() !== "" ? 'formGroup error' : 'formGroup'}>
                            <label>Name</label>
                            <div className='formRow'>
                                <input type="text" placeholder='Name' onChange={(e)=>setSignupCreds({...loginCreds, name: e.target.value})} />
                            </div>
                            {signupErrors.name.trim() !== "" ? <p>{signupErrors.name}</p> : ""}
                        </div>
                        <div className={signupErrors.email.trim() !== "" ? 'formGroup error' : 'formGroup'}>
                            <label>Email</label>
                            <div className='formRow'>
                                <input type="email" placeholder='Email' onChange={(e)=>setSignupCreds({...loginCreds, email: e.target.value})} />
                            </div>
                            {signupErrors.email.trim() !== "" ? <p>{signupErrors.email}</p> : ""}
                        </div>
                        <div className={signupErrors.password.trim() !== "" ? 'formGroup error' : 'formGroup'}>
                            <label>Password</label>
                            <div className='formRow'>
                                <input type="password" placeholder='******' onChange={(e)=>setSignupCreds({...loginCreds, password: e.target.value})} />
                            </div>
                            {signupErrors.password.trim() !== "" ? <p>{signupErrors.password}</p> : ""}
                        </div>
                        <footer className='formGroup formFooter'>
                            <button className='btn btnSignup' type='submit'>
                                Signup
                            </button>
                        </footer>
                    </form>
                </div>
                }
            </div>
        </div>
    );
};

export default AuthRouting;