import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
  const [show, setShow] = useState(false);

  const {setAddResponse} = useContext(addResponseContext)

  const [projectDetails, setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectimage:""
  })
  const [token, setToken] = useState("")
  const[preview, setPreview] = useState("")
  const[key,setKey] = useState(1)
  
  console.log(projectDetails);
  console.log(preview);
  console.log(token);
  

  const handleFile = (e)=>{
    console.log(e.target.files[0]);
    setProjectDetails({...projectDetails, projectimage:e.target.files[0]})
  }
  
  const handleClose = () => {setShow(false)
    handleCancel()
  }
  
  const handleShow = () => setShow(true);

  const handleCancel = ()=>{
    setProjectDetails({
      title:"", 
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })
    setPreview("")
    if(key==1){
      setKey(0)
    }
    else{
      setKey(1)
    }
  }

  const handleAdd = async()=>{
    const {title, language, github, website, overview, projectimage} = projectDetails
    if(!title || !language || !github || !website || !overview || !projectimage){
      toast.info('Please fill the form completely')
    }
    else{
      //append() if the req  contains upoaded content then the req body  should be sent using the apend() method in formData class - inshort reqbody should be a formData
      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectimage",projectimage)

      if(token){
        const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('Project added successfully')
          setTimeout(() => {
            handleClose()
          }, 2003)
          setAddResponse(result)
        }
        else if(result.status==406){
          toast.warning(result.response.data)
          handleCancel()

        }
        else{
          toast.error('something went wrong')
          handleClose()

        }
        
      }
      else{
        toast.warning('Please Login')
      }

    }
  }

  useEffect(()=>{
    if(projectDetails.projectimage){
      setPreview(URL.createObjectURL(projectDetails.projectimage))
      
    }
  },[projectDetails.projectimage])
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  return (
    <>
      {/* Updated to use onClick={handleShow} */}
      <Button className='rounded-0 text-light' style={{ backgroundColor: 'rgb(62,179,24)' }} onClick={handleShow}>
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectImage">
                  <input type="file" id='projectImage' key={key} style={{ display: 'none' }} onChange={(e)=>handleFile(e)} />
                  <img src={ preview?preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0g9EuhNIiPdBQPSa-1McCLCYXBYzDPL8cQ&s" }alt="" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mt-2">
                  <input type="text" value={projectDetails.title} placeholder='Title' onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})} className='form-control' />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.language} placeholder='Language' onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})} className='form-control' />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.github} placeholder='GitHub' onChange={(e)=>setProjectDetails({...projectDetails, github:e.target.value})} className='form-control' />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.website} placeholder='Website' onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})}  className='form-control' />
                </div>
                <div className="mb-3">
                  <textarea row={5} className='form-control' value={projectDetails.overview} placeholder='Overview' onChange={(e)=>setProjectDetails({...projectDetails, overview:e.target.value})}  >

                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
        <ToastContainer theme="colored" position='top-center' autoClose={2000} />
      </Modal>
      
    </>
  );
}

export default Addproject;
