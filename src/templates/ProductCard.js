import * as React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "../css/index.css"
import icon from '../images/icon.png'
import { useState, useEffect } from 'react';

const ProductCard = (props) =>{
    const [ productsDetails, setProductDetails ] = useState( {
        imageUrl: "", productName: "", productPrice: ""
    });

    useEffect(()=>{
        console.log("name",props.data.node.name);
       // setProductDetails({...productsDetails, imageUrl: props.data.node.url})
        setProductDetails({...productsDetails, productName: [props.data.node.name]})
       // setProductDetails({...productsDetails, productPrice: props.data.node.price})
    },[])
    
    return (
        <div class="card">
            {console.log(props.data)}
            <img src= {icon} alt="Avatar" width="250px" height="200px" />
            <div class="product-details"> 
            {console.log("pl",productsDetails)}
                <h3>{productsDetails.productName}</h3>
                <p>{productsDetails.productPrice}</p>
            </div>
            
        </div>
    )
}

export default ProductCard;