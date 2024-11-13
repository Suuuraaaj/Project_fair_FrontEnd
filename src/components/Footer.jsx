import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStackOverflow, faInstagram, faXTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='p-5 bg-success mt-5'>

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} />Project Fair</h3>
                    <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sint nisi unde! Adipisci incidunt voluptatum quisquam facilis quibusdam dolorem maiores cupiditate ipsum modi dolores? Mollitia corrupti saepe esse non doloribus.</p>
                </div>
                <div className="col-md-2 d-md-flex justify-content-end">

                    <div className=''>
                        <h3 className='text-light'>Guides</h3>
                        <p className='mt-3'>Home</p>
                        <p>Project</p>
                        <p>Dashboard</p>
                    </div>

                </div>
                <div className="col-md-1"></div>

                <div className="col-md-2 d-md-flex justify-content-center">
                <div className=''>
                        <h3 className='text-light'>Links</h3>
                        <p className='mt-3'>React</p>
                        <p>React Bootstrap</p>
                        <p>Bootswatch</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <h3 className='text-light'>Contact Us</h3>
                    <div className="d-md-flex mt-3">
                        <input placeholder='Email id' className='form-control rounded-0' type="text" name="" id="" />
                        <button className='btn btn-warning ms-2 rounded-0'>Subscribe</button>
                    </div>
                    <div className="d-flex mt-4 justify-content-between ">
                    <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                    <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light'/>
                    </div>
                </div>
            </div>
        </div>
      
       
    </div>
  )
}

export default Footer
