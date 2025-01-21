import React from 'react'

const Home = () => {
  const checkUrl = `${process.env.REACT_APP_API_SERVER}/`;
  return (
    <div>Home API =  {checkUrl}</div>
  )
}

export default Home