import * as React from "react"
import "../css/index.css"

const Thumbnail = (props) => {
    return <img src={props.link} alt="Thumbnail" width="50px" height="50px"/>
}

export default Thumbnail;