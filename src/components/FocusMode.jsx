import { useEffect } from 'react'

export default function FocusMode({ onToggle }){
  useEffect(()=>{
    document.documentElement.classList.add('dark')
    return ()=>{
      document.documentElement.classList.remove('dark')
    }
  },[])

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">{/* toggled later */}</div>
  )
}
