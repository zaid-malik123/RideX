"use client"
import { setUserData } from '@/redux/slices/userSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetMe = (enabled: boolean) => {
  const dispatch = useDispatch()
  return (
    useEffect(() => {
      if(!enabled) return

      const fetchCurrentUser = async () => {

        const {data} = await axios.get("/api/user/me")
        dispatch(setUserData(data.data))
      }

      fetchCurrentUser()
    }, [enabled])
  )
}

export default useGetMe