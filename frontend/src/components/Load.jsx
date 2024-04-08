import React from 'react'
import { Bars,ColorRing } from 'react-loader-spinner';


const Load = () => {
  return(
    <div className='flex justify-center    items-center'>
  <ColorRing
  className='bg-white'
  visible={true}
  height="50"
  width="50"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#00e6e6', '#00e6e6', '#00e6e6', '#00e6e6', '#00e6e6']}
/>

    </div>
  )
}
export default Load
