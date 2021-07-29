import * as React from "react"
import "../css/index.css"
import icon from '../images/icon.png'
import Thumbnail from './Thumbnail'
import { useState,useEffect } from 'react';
import { Button,Modal,TextStyles } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'

const ProductCard = (props) =>{
    const [ category, setCategory ] = useState("");
    const [ modal, setModal ] = useState(false);
    const [ featuredImage, setFeaturedImage ] = useState("");
    const [ featuredImageExist, setFeaturedImageExist ] = useState(false);
    const [ displayImage, setDisplayImage ] = useState("");
    const [ firstGalleryImageExist, setFirstGalleryImageExist ] = useState(false);
    const [ galleryImagesExist, setGalleryImagesExist ] = useState(false);
    const [ galleryImagesLinks, setGalleryImagesLinks ] = useState([]);
    const cat = "";

    useEffect(()=>{
        let flag = false;
        let galleryFlag = false;
        let galleryImagesLinks = [];
        Object.keys(props.data.node).map( key => {
            if( key == "image" && props.data.node[key] !== null ){
                const ImageObject = props.data.node[key];
                flag = true;
                galleryImagesLinks.unshift(ImageObject["sourceUrl"]);
                setFeaturedImage(ImageObject["sourceUrl"]);
                setFirstGalleryImageExist(true);
            }
            if( key == "galleryImages" && props.data.node[key] !== null ){
                const GalleryImageObject = props.data.node[key];
                galleryFlag = true;
               // setFeaturedImage(ImageObject["sourceUrl"]);
                GalleryImageObject.nodes.map( galleryImage =>{
                    galleryImagesLinks.push(galleryImage["sourceUrl"]);
                })
                setGalleryImagesLinks(galleryImagesLinks);

            }
        })
        
        flag ? setFeaturedImageExist(true) : setFeaturedImageExist(false);
        galleryFlag ? setGalleryImagesExist(true) : setGalleryImagesExist(false);
    },[])


   const displayProductImage = (link) =>{
        console.log("link",link);
        setDisplayImage(link);
       // setFeaturedImageExist(false)
       setFirstGalleryImageExist(false);
    }
    
    return (
        
        <div class="product-card">
            {  
                featuredImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                    ) :
                    (  <img src= {icon} class= "product-image" alt="ProductImage" width="250px" height="200px" /> ) 
            }
              
            <div class="product-details"> 
                <h3><b>{props.data.node.name}</b></h3>
                {/* <p>{props.data.node.name}</p>  */}
                <Button type="Primary" onClick={ ()=>{ setModal(true); }}>View</Button>
                <Button type="Outlined">Add to cart</Button>
                <Modal 
                    open={modal}
                    heading=""
                    secondaryAction={{content:"Close",thickness:"thin",onAction:()=>{ setModal(false)} }}
                    close={ () => { setModal(false) } }
                    >
                    {  
                        firstGalleryImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                        ) : (  <></> )
                    }
                    {
                        displayImage ? ( <img src= {displayImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                        )  : ( <div></div>)
                    } 
                    {/* {
                        featuredImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                        ) :
                        (  <img src= {icon} class= "product-image" alt="ProductImage" width="250px" height="200px" /> ) 
               
                    } */}
                    {
                        galleryImagesExist ?  ( 
                            <div>{ 
                                    galleryImagesLinks.map( (link) => {
                                        return  <btn onClick={ ()=>displayProductImage(link) }>
                                                  <Thumbnail link = {link} />
                                                </btn>
                                    })
                                }
                            </div>
                        )  : ( <div> </div>)  

                    }  
                    
                   
                    <TextStyles type={'neutralText'}
                        children={
                            <div>
                                <h4>Product Name: {props.data.node.name}</h4>
                                <h4>Product Description: {props.data.node.description}</h4>
                                <h4>Product Categories: {
                                    Object.keys(props.data.node).map( key => {
                                        let CategoryList = "";
                                        if(key == "productCategories"){
                                            const allCategories = props.data.node[key];                                           
                                            // console.log(allCategories.nodes);
                                            
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