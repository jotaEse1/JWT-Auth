import React, { useState } from 'react';

const SignIn = ({handleSubmit}) => {
    const [form, setForm] = useState({username: '', email: '', password: ''});

    const handleForm = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
    }

    return (
        <div className='signin-container'>
            <h2>Sign in</h2>
            <form onSubmit={(e) => handleSubmit(e,'signin', form)}>
                <label htmlFor='username'>Username</label>
                <input 
                    type='text'
                    placeholder='ElonDoge'
                    name='username'
                    id='username'
                    onChange={handleForm}
                />
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
                >Already a user?</span>  
                <button
                    type='submit'
                >Register</button>
            </form>
        </div>
    );
};

export default SignIn;