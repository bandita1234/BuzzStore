import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} className='border-2 border-main-color py-1.5 px-2 rounded-lg font-medium hover:bg-main-color hover:text-[#000]'>{props.text}</button>
  )
}

export default Button