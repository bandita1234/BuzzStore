import React from 'react'

const FormButtons = (props) => {
  return (
    <div className="flex justify-center">
    <button onClick={props.handleClick} className='py-2 w-1/2 mb-4 rounded-lg font-medium bg-main-color text-[#000]' type={props.type}>{props.text}</button>
    </div>
  )
}

export default FormButtons