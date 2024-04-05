import React, { useEffect } from 'react'

export const logOnMount = (Component)=>{
    const EnhancedComponent = (props)=>{
        useEffect(()=>{
            console.log('Component Mounted')
        },[])
        return <Component {...props} />
    }

    return EnhancedComponent
}