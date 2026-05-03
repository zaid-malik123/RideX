"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const useGetMe = (enabled: boolean) => {
  return (
    useEffect(() => {
      if(!enabled) return

      const fetchCurrentUser = async () => {

        const {data} = await axios.get("/api/user/me")
        console.log("CURRENT LOGIN DATA ", data)
      }

      fetchCurrentUser()
    }, [enabled])
  )
}

export default useGetMe