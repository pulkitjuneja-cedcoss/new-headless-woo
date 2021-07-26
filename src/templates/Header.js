import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import "../css/index.css"

const Header = () => {
    
    const menu =  useStaticQuery(graphql`
        query {
            swapi{
            menuItems {
                nodes {
                    label
                    path
                }
                }
            }
        }
    `);

   // const path = menu.swapi.menuItems.nodes.path
    
    return (
        <div>
            { console.log(menu.swapi.menuItems.nodes)}
            <div className="navbar">
            {
            menu.swapi.menuItems.nodes.map(e=>{
                let slugArray = e.path.split("/");
                console.log(slugArray);
                let slug = "/" + slugArray[3];
                console.log(slug)
                return   (  
                    <Link to= {e.path}>
                        {e.label} 
                    </Link>
                )
            })
            }
            <Link to="/posts">Posts</Link>
            <Link to="/shop">Shop</Link>

            </div> 
        </div>
    )
}

export default Header;