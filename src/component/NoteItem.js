import React from 'react'

export default function NoteItem(props) {
    return (
        <div className="myCard col-md-">
            <div className="innerCard">
                <div className="frontSide">
                    <p className="title">{props.title}</p>
                    <p>{props.tag}</p>
                </div>
                <div className="backSide">
                    <p className='dd'>{props.description}</p>
                    <div className='d-flex align-items-center'>

                    <button className="button mx-1" onClick={()=>{props.un(props.title,props.description,props.tag,props.nid)}}>
                        <img className="svgIcon" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="" />
                    </button>
                    <button className="sbutton mx-1" onClick={()=>{props.del(props.nid)}}>
                        <img className="svgIcon" src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png" alt="" />
                    </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
