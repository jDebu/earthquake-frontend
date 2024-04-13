import { useState, useEffect } from 'react'
import { AccountCircle } from '@mui/icons-material'

const generateRandomUserData = () => {
  const userData = [
    {name: 'John', id: '1'},
    {name: 'Lily', id: '2'},
    {name: 'Alicia', id: '3'},
    {name: 'Batman', id: '4'},
    {name: 'Peter', id: '5'},
  ]
  return userData[Math.floor(Math.random() * userData.length)]
}

export const Menu = () => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    const expires = storedUserData?.expires

    if (storedUserData && expires && new Date(expires) > new Date()) {
      setUsername(storedUserData.name)
    } else {
      const randomName = generateRandomUserData()
      setUsername(randomName.name)
      const expirationTime = new Date()
      expirationTime.setMinutes(expirationTime.getMinutes() + 10)
      randomName.expires = expirationTime.toString()
      localStorage.setItem('userData', JSON.stringify(randomName))
    }
  }, [])
  return (
    <>
      <button className="flex text-sm items-center ml-auto">
        <div className="px-4 text-white hidden md:block">
          {`${username}`}
        </div>
        <AccountCircle style={{ color: 'white' }}/>
      </button>
    </>
  )
}