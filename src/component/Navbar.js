import React, { useContext, useRef, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import logo from "./inn.png";
import Alert from './Alert';
export default function Navbar() {
  let location = useLocation();
  const [n, setn] = useState({etitle: "",edescription: "",etag: "default"})
  const oc = (e) => {
      setn({...n,[e.target.name]:e.target.value})
  }
  const context = useContext(noteContext);
  const {addNote,alert} = context;
  const ref = useRef(null)
  const ref2 = useRef(null)
  const un = () =>{
    setn({etitle: "",edescription: "",etag: "default"});
      ref.current.click();
  }
  let navigate = useNavigate();
  return (
    <>
    <nav className="navbar navbar-expand-lg  navbar-light bg-success ">
    <div className="container-fluid d-flex">
      <Link className="navbar-brand" to="/"><h2 className='tt'>Inotes</h2></Link>
      <button className={`abutton mx-auto ${location.pathname!=='/'?'d-none':''}`} onClick={un}>
    <img className="asvgIcon" src={logo} alt="" />
      </button>
      <button type="button" className={`btn btn-danger mx-3 ${location.pathname!=='/'?'d-none':''}`} onClick={()=>{localStorage.removeItem('token'); navigate('/login');}} >Logout</button>
    </div>
    <button ref={ref} type="button" style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"></button>
      <div className="modal fade " id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel1">Add Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='mform'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                  onChange={oc}
                    type="title"
                    value={n.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                   onChange={oc}
                   value={n.edescription}
                   type="description"
                   className="form-control"
                   id="edescription"
                   name="edescription"
                   />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
                   onChange={oc}
                   value={n.etag}
                   type="tag"
                   className="form-control"
                   id="etag"
                   name="etag"
                   />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref2}>Close</button>
              <button type="button" onClick={()=>{addNote({title:n.etitle,description:n.edescription,tag:n.etag}); ref2.current.click() }} className="btn btn-success">Add</button>
            </div>
          </div>
        </div>
      </div>
  </nav>
  {alert.success && <Alert type={alert.type} msg={alert.msg}/>}
  </>
  )
}
