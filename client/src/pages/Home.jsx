import axios from 'axios'
import React, { useEffect } from 'react'

function Home() {

  useEffect(() => {
    const gettingAuth = async () => {
      const token = localStorage.getItem('token')
      console.log(token)
      await axios.get('http://localhost:3000', {headers:{
        'Authorization': `${token}`
      }}).then(res => console.log(res))
    }
    gettingAuth()
  }, [])
  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home