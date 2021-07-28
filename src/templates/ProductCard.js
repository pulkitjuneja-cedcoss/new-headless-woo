import * as React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "../css/index.css"
import icon from '../images/icon.png'
import { useState,useEffect } from 'react';
import { Button,Modal,TextStyles } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'

const ProductCard = (props) =>{
    const [ category, setCategory ] = useState("");
    const [ modal, setModal ] = useState(false);
    
    const cat = "";
   // useEffect(()=>{
        
  //  },[])
    

    
    return (
        <div class="card">
            {/* {console.log(props.data.node)} */}
            
            {  
                Object.keys(props.data.node).map( key => {
                   // console.log(props.data.node[key]);
                    if( key == "image" && props.data.node[key] !== null ){
                        const ImageObject = props.data.node[key];
                       // console.log(ImageObject);
                       // console.log(ImageObject["link"]);
                        //console.log("link",link);
                        return <img src= {ImageObject["link"]} alt="ProductImage" width="250px" height="200px" />
                    }
                })
              

            }
            <div class="product-details"> 
                <h3>{props.data.node.name}</h3>
                {/* <p>{props.data.node.name}</p>  */}
                <Button type="Primary" onClick={ ()=>{ setModal(true); }}>View</Button>
                <Button type="Outlined">Add to cart</Button>
                <Modal 
                    open={modal}
                    heading="Product Details"
                    secondaryAction={{content:"Close",thickness:"thin",onAction:()=>{ setModal(false)} }}
                    close={() => { setModal(false)}}
                    >
                    <TextStyles type={'neutralText'}
                        children={
                            <div>
                                <h4>Product Name: {props.data.node.name}</h4>
                                <h4>Product Description: {props.data.node.description}</h4>
                                <h4>Product Categories: {
                                    Object.keys(props.data.node).map( key => {
                                        let CategoryList = "";
                                        if(key == "productCategories"){
                                            console.log(props.data.node);
                                            const allCategories = props.data.node[key];
                                            console.log(allCategories);
                                            console.log(allCategories.nodes);
                                            
                                            Object.keys(allCategories.nodes).map( category => {
                                                console.log(allCategories.nodes[category]);
                                                const catObject = allCategories.nodes[category];
                                                // if( key === "name" ){
                                                //     cat = cat + key.nodes.category["name"];
                                                // }
                                                CategoryList = CategoryList +  catObject["name"] + ",";
                            
                                            })
                                           
                                        }
                                        return CategoryList;
                                    })
                                    }</h4>
                            </div>
                        }/>

                </Modal>
            </div>
            
        </div>
    )
}

export default ProductCard;