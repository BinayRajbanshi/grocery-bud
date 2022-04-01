import React, { useEffect } from 'react'

const Alert = ({alert , removeAlert , setAlert , list}) => {
    const{msg , type} = alert
    useEffect(()=>{
       const timeOut = setTimeout(()=>{
            removeAlert()
        },4000)
        return () => clearTimeout(timeOut)
    },[list])
    // if the function remove alert was not created then to remove the alert after some time this could be done
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setAlert({show:false , msg:'' , type:''})
    //     },2000)
    // } , [])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert