import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await (await fetch('http://45.140.169.11:80/api/users', {
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
           "Access-Control-Allow-Origin": "*",
         "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
     }
      })).json()
      setUsers(result);
    };
    fetchData();
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={appLogo} className="logo" alt="mclient logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>mclient</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        { users.map((user: any) => { return <div>{user.email}</div> }) }
      </div>
      <PWABadge />
    </>
  )
}

export default App
