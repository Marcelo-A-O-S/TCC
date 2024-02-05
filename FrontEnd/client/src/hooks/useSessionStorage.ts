"use client"
import { useState, useEffect } from "react";

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const sessionvalue = sessionStorage.getItem(name)
    if(sessionvalue !== null){
        setValue(sessionvalue);
    }

  }, [])

  return value
}

export default useSessionStorage
