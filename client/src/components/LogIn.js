import React, { useState } from 'react';

const LogIn = ({handleSubmit}) => {
    const [form, setForm] = useState({email: '', password: ''});

    const handleForm = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
    }
    
    return (
        <div className='login-container'>
            <h2>Log in</h2>
            <form onSubmit={(e) => handleSubmit(e, 'login', form)}>
                <label htmlFor='email'>Email address</label>
                <input 
                    type='text'
                    placeholder='elonLovesDoge@gmail.com'
                    name='email'
                    id='email'
                    onChange={handleForm}
                /> 
                <label htmlFor='password'>Password</label>
                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleForm}
                />
                <span
                >Don't have an account?</span>  
                <button
                    type='submit'
                >Log in</button>
            </form>
        </div>
    );
};

export default LogIn;