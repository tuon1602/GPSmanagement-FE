"use client"
import React from 'react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

const CustomButton = (props) => {
  const router = useRouter()
  const handleLogout =async ()=>{
    // const removeToken = localStorage.removeItem('token')
    // if(removeToken && !localStorage.getItem('token')){
    //   router.push("/auth/login")
    // }
    localStorage.removeItem('token')
    router.push('/login')
  
  }
  return (
    <Button color='danger' onClick={handleLogout}>{props.title}</Button>
  )
}

export default CustomButton