import React from 'react'

export default function Alert(props) {
  return (
    <div className={`text-center alert alert-${props.type}`} role="alert">
        {props.msg}
    </div>
  )
}
