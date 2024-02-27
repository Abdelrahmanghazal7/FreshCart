import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedSignRoutes = (props) => {

    if (localStorage.getItem("userToken")) {
        return <Navigate to={"/FreshCart"} />
    } else {
        return props.children
    }
}

export default ProtectedSignRoutes