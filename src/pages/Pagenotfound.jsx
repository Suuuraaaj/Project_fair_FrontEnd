import React from 'react'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
          <img src="https://webartdevelopers.com/blog/wp-content/uploads/2018/10/CodePen-404-Page.gif" alt="" className='w-50' />
          <h1>Looks like your Lost</h1>
          <h5>The page your looking is unavailable</h5>
          <Link to={'/'}><button className='btn btn-success rounded-0 mt-3'>GO HOME</button></Link>
        </div>
        <div className="col-md-2"></div>
      </div>

    </div>
  )
}

export default Pagenotfound
