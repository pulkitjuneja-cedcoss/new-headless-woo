import * as React from "react"
import "../css/index.css"

const Thumbnail = (props) => {
    return (
        <div className="thumbnail-div">
            <div className="thumbnail">
               <img src={props.link} alt="Thumbnail" width="50px" height="50px"/>
            </div>
        </div>    
    )
}

export default Thumbnail;