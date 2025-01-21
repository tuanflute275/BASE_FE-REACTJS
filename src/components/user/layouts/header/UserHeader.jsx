import React from 'react'
import { Link } from 'react-router-dom';

const UserHeader = () => {
  return (
    <div>
      <Link to={"/"} style={{marginRight: "20px"}}>Home</Link>
      <Link to={"/shop"} style={{marginRight: "20px"}}>Shop</Link>
      <Link to={"/detail/1"} style={{marginRight: "20px"}}>Detail </Link>
    </div>
  );
}

export default UserHeader