import React from 'react';
import SignIn from './SignIn';
import LogIn from './LogIn';

const Autentication = ({setAccess, setError, setUser}) => {

    const handleSubmit = (e, type, data) => {
        e.preventDefault()

        if(type === 'signin'){
            const url = 'http://localhost:5000/autentication/signin',
                options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }

            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    const {error = 'none', msg = ''} = res;

                    if(msg === 'user exists') return; //modal indicating that the user already exists
                    if(error === 'none') return setAccess(prev => !prev) //modal
                    if(error !== 'none') return setError(error[0].msg) //modal
                })
                .catch(() => setError('Something went wrong. Try again later'))
        }
        if(type === 'login'){
            const url = 'http://localhost:5000/autentication/login',
                options = {
                    method: 'POST',
                    credentials: 'include', // Needed to include the cookie
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }

            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    const {msg = '', token = ''} = res

                    if(token) {
                        setAccess(true)    
                        return setUser(token)
                    }
                    if(msg) return setError(msg)

                })
                .catch(err => console.log(err))
        }
    }
    
    
    return (
        <div className='autentication'>
            <SignIn handleSubmit={handleSubmit} />
            <LogIn  handleSubmit={handleSubmit}/>
        </div>
    );
};

export default Autentication;