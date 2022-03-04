import { useEffect, useState } from 'react';
import './App.css';
import Autentication from './components/Autentication';
import Application from './components/Application'

function App() {
  const [user, setUser] = useState('');
  const [access, setAccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'http://localhost:5000/autentication/refresh_token',
      options = {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      };

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        const {accessToken}  = res;

        if(!accessToken.length){
          setAccess(false)
          return setLoading(false)
        }

        setUser(accessToken)
        setAccess(true)
        return setLoading(false)
      })
      .catch(err => console.log(err))
    
  }, [])

  if(loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      {!access? ( 
        <Autentication setAccess={setAccess} setError={setError} setUser={setUser} />
      ):(
        <Application setAccess={setAccess} setError={setError} setUser={setUser} />
      )}
     
    </div>
  );
}

export default App;
