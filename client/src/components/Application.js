import React from 'react';

const Application = ({setAccess, setError, setUser}) => {
    const handleLogOut = () => {
        const url = 'http://localhost:5000/autentication/logout',
        options = {
          method: 'POST',
          credentials: 'include', // Needed to include the cookie
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
  
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
            const {msg} = res;

            if(msg === 'Something went wrong. Try again later...') return setError(msg)

            setAccess(false)
            setUser('')
        })
        .catch(err => console.log(err))
    }
    

    return (
        <div>
            <h1>Application</h1>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};

export default Application;