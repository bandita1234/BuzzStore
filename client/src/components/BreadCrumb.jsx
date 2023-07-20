import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = (props) => {
    const title = props.title;
  return (
    <div className='mb-4'>
        <div className='text-center bg-[#12263c] py-2'>
            <Link to= "/">Home</Link> / {title}
        </div>
    </div>
  )
}

export default BreadCrumb