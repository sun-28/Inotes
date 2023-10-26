import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


export default function Notes() {
  let token = localStorage.getItem('token')
  let navigate = useNavigate();
  const [n, setn] = useState({title: "",description: "",tag: "default",id:""})
  const oc = (e) => {
    setn({...n,[e.target.name]:e.target.value})
  }
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, updateNote, deleteNote} = context;
  const ref = useRef(null)
  const ref2 = useRef(null)
  useEffect(() => {
    if(!token){ return navigate('/login')}
    fetchAllNotes();
  }, [])
  const un = (t,d,tag,k) =>{
    ref.current.click();
    setn({title: t,description: d,tag: tag,id:k});
  }
  return (
    <div className='container ls my-5'>
      <h2 className='text-center tn'>Your Notes</h2>
      <div className='row text-center'>
        {notes.length===0? <h3 className='text-center nna'>~ No Notes Available ~</h3> :notes.map((note) => {
          return <div key={note._id} className='d-flex justify-content-center col-md-3 my-3 col-sm-6'>
            <NoteItem un={un} title={note.title} description={note.description} tag={note.tag} nid={note._id} del={deleteNote}/>
          </div>
        })}
      </div>

      {/* ////////////////////Modal///////////////////////// */}
      <button ref={ref} type="button" style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
      <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                  onChange={oc}
                    type="title"
                    value={n.title}
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                   onChange={oc}
                  value={n.description}
                    type="description"
                    className="form-control"
                    id="description"
                    name="description"
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
                   onChange={oc}
                  value={n.tag}
                    type="tag"
                    className="form-control"
                    id="tag"
                    name="tag"
                    />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref2}>Close</button>
              <button type="button" onClick={()=>{updateNote(n.id,n.title,n.description,n.tag); ref2.current.click() }} className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    {/* ////////////////////////////////////////////////////////////////// */}
    </div>
  )
  
}
