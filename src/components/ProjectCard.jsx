import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../services/serverUrl';

const ProjectCard = ({ project }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Conditional rendering: if project is undefined, return null
  if (!project) return null;

  return (
    <>
      <Card style={{ width: '100%' }} className="mt-4  shadow border-0 rounded-0">
        <Card.Img
          variant="top"
          src={`${serverUrl}/upload/${project?.projectimage}`}
          className="w-100"
          onClick={handleShow}
          alt="Project Image"
          style={{height:'250px'}}
        />
        <Card.Body>
          <Card.Title className="text-center">{project?.title}</Card.Title>
          {/* <Button variant="primary" onClick={handleShow}>
            View Details
          </Button> */}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <img src={`${serverUrl}/upload/${project?.projectimage}`} alt="Project Image" className="w-100" />
              </div>
              <div className="col-md-6">
                <h4>Description</h4>
                <p>{project?.overview}</p>
                <h4>Technologies</h4>
                <p>{project?.language}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <a href={project?.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="fa-2x me-3" />
            </a>
            <a href={project?.website} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGlobe} className="fa-2x me-3" />
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCard;
