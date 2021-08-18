import * as React from "react"
import "../css/index.css"
import icon from '../images/icon.png'
import Thumbnail from './Thumbnail'
import { useState,useEffect } from 'react';
import { Button,Modal,TextStyles } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import AddToCart from '../components/AddToCart.js'

const ProductCard = (props) =>{
    // const [ category, setCategory ] = useState("");
    const [ modal, setModal ] = useState(false);
    const [ featuredImage, setFeaturedImage ] = useState("");
    const [ featuredImageExist, setFeaturedImageExist ] = useState(false);
    const [ displayImage, setDisplayImage ] = useState("");
    const [ firstGalleryImageExist, setFirstGalleryImageExist ] = useState(false);
    const [ galleryImagesExist, setGalleryImagesExist ] = useState(false);
    const [ galleryImagesLinks, setGalleryImagesLinks ] = useState([]);
    const [ attr, setAttr ] = useState({})
    const [ event, setEvent  ] = useState(false)
    
    // const cat = "";

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

    //const variationAttributes = [];

    const setAttributes = ( label,value ) => {
     setEvent(!event);
      const obj = attr;
      obj[label] = value;
      setAttr(obj) 
      console.log(obj)
    }

    // useEffect(()=>{
    //     console.log("useEffect");
    //    // setAttr(attr)  
    //     setEvents(!events);
    // },[event])
    
    return (
        
        <div class="product-card">
            {
                console.log("featuredImageExist",featuredImageExist)
            }
            {  
                featuredImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                    ) :
                    (  <img src= {icon} class= "product-image" alt="ProductImage" width="250px" height="200px" /> ) 
            }
              
            <div class="product-details"> 
            {/* {console.log(props.data.node)} */}
                <h3><b>{props.data.node.price}</b></h3>
                <h3><b>{props.data.node.name}</b></h3>
            
                <Button type="Primary" onClick={ ()=>{ setModal(true); }}>View</Button>
                <AddToCart product={props.data} />
                <Modal 
                    open={modal}
                    heading=""
                    secondaryAction={{content:"Close",thickness:"thin",onAction:()=>{ setModal(false);setAttr({})} }}
                    close={ () => { setModal(false);setAttr({}) } }
                    >
                        
                    {  
                        firstGalleryImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                        ) : (  <></> )
                    }
                    {
                        displayImage ? ( <img src= {displayImage} class= "product-image" alt="ProductImage" width="250px" height="200px" />
                        )  : ( <div></div>)
                    } 
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

                    <h2><b>Product Details</b></h2>
                    
                    <div>{ props.data.node.stockStatus !== "IN_STOCK" ? (
                        <h3>This Product is currently out of stock.</h3>
                    ): ( <h3>This Product is currently in stock.</h3>) }</div>
                   
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
                                            Object.keys(allCategories.nodes).map( category => {
                                                const catObject = allCategories.nodes[category];
                                                CategoryList = CategoryList +  catObject["name"] + ",";
                            
                                            })
                                        }
                                        return CategoryList;
                                    })
                                    }</h4>
                      
                            </div>
                        }/>
                        
                        {
                           "variations" in props.data.node ? (<h4>Price Range: {props.data.node.price}</h4>) : ( <h4>Price: {props.data.node.price}</h4>)
                        }         
                        <h2>Product Attibutes:</h2>
                        {
                            props.data.node.attributes !== null ? (
                                props.data.node.attributes.edges.map( ( edge )=>{
                                    return <div>
                                        <label id="attr">{edge.node.label}</label>
                                        {
                                            edge.node.options.length > 1 ? (
                                                <select name="attr" onChange={(e)=>{console.log(edge.node.label,e.target.value);
                                                    setAttributes(edge.node.label,e.target.value)}}>
                                                    <option value="select">Select</option>    {
                                                        edge.node.options.map( (value) => {
                                                            return <option value={value}>{value}</ option >
                                                        })
                                                        }</select>
                                            ) : (<h4>{edge.node.options[0]}</h4>)
                                        }      
                                    </div>
                                }) 
                            ) : (<></>)
                        }

                        {
                            "variations" in props.data.node ? (
                               
                                props.data.node.variations.edges.map( (edge) => {
                                    let link_part = props.data.node.name.toLowerCase() + '/?';
                                    if( Object.keys(attr).length > 0  ){
                                       // console.log(attr,"attr")
                                        Object.keys(attr).map( attribute_key => {
                                            console.log("hy",attribute_key,attr[attribute_key])
                                            link_part = link_part + 'attribute_' +attribute_key.toLowerCase() + '=' + attr[ attribute_key ] + '&';
                                           
                                        })
                                    }
                                    let link = 'http://localhost/web4/wordpress/product/' + link_part ;
                                    link = link.slice( 0,link.length - 1);
                                    // console.log("variation_linked",edge.node.link)
                                    // console.log("link",link)
                                    if ( edge.node.link == link ){
                                        console.log("matched")
                                           return (<>
                                               <h2>Product Variation Details </h2>
                                               <h4>Price : {edge.node.price ? edge.node.price : '$45'}</h4>
                                               </>
                                           )
                                    }
                                })
                            ) : (<></>)
                        }

                </Modal>
            </div>
            
        </div>
    )
}

export default ProductCard;