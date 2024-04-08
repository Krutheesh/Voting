import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
const Load = () => {
  return (
    <div>
      <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#221b46"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  )
}

export default Load
