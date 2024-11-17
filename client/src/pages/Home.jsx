import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Home() {

  const [info, setInfo] = useState(null)
  const [log, setLog] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const gettingAuth = async () => {
      const token = localStorage.getItem('token')
      const myReq = await axios.get('http://localhost:3000', {headers:{
        'Authorization': `${token}`
      }})
      if(myReq.data.log == false){
        // navigate('/login')
        setLog(false)
      }else{
        setInfo(myReq.data.userInfo[0])
        setLog(true)
      }
    }
    gettingAuth()
  }, [])

  const NoLog = () => {
    return <div className='div-no'>
      <div className="no-container">
        <h1>Welcome to my web Page/Application</h1>
        <p>You con log in or create an account</p>
        <div className='btns'>
          <Link className='log' to={'/login'}>Log in</Link>
          <Link className='rg' to={'/register'}>Create an account</Link>
        </div>
      </div>
    </div>
  }

  return (
    <>
     {
      log ? <div className='home'>
        <h1>Home Page</h1>
      </div> : <NoLog />
     }   
    </>
  )
}

export default Home