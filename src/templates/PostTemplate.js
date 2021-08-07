
import * as React from "react"
import "../css/index.css"
import {Link} from 'gatsby';


const PostTemplate = ({title,path}) =>{
    return(
        <div>
            <Link to={path}> 
            <h2>{title}</h2>
            </Link>
        </div>
    )
}

// PostTemplate.propTypes = {
//     title: PropTypes.string.isRequired,
//     path:  PropTypes.string.isRequired,
// }

export default PostTemplate;
