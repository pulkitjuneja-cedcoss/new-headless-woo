import React from 'react';
import { useState,useEffect } from 'react';
import Thumbnail from '../templates/Thumbnail'
import { Tabs } from '@cedcommerce/ounce-ui'
import icon from '../images/icon.png'
import StarRating from '../templates/StarRating';

const SingleProductView = ({location}) => {

    const [ featuredImage, setFeaturedImage ] = useState("");
    const [ featuredImageExist, setFeaturedImageExist ] = useState(false);
    const [ displayImage, setDisplayImage ] = useState("");
    const [ firstGalleryImageExist, setFirstGalleryImageExist ] = useState(false);
    const [ galleryImagesExist, setGalleryImagesExist ] = useState(false);
    const [ galleryImagesLinks, setGalleryImagesLinks ] = useState([]);
    const [ attr, setAttr ] = useState({});
    const [ event, setEvent  ] = useState(false);
    const [ selectedTab, setSelectedTab ] = useState(0)

    console.log("singleProductView",location);


    useEffect( () => {
        let flag = false;
        let galleryFlag = false;
        let galleryImagesLinks = [];
        Object.keys( location.state.product ).map( key => {
            if( key === "image" && location.state.product[key] !== null ){
                const ImageObject = location.state.product[key];
                flag = true;
                galleryImagesLinks.unshift(ImageObject["sourceUrl"]);
                setFeaturedImage(ImageObject["sourceUrl"]);
                setFirstGalleryImageExist(true);
            }
            if( key === "galleryImages" && location.state.product[ key ] !== null ){
                const GalleryImageObject = location.state.product[ key ];
                galleryFlag = true;
               // setFeaturedImage(ImageObject["sourceUrl"]);
                GalleryImageObject.nodes.map( galleryImage => {
                    galleryImagesLinks.push( galleryImage["sourceUrl"] );
                })
                setGalleryImagesLinks( galleryImagesLinks );

            }
        })
        
        flag ? setFeaturedImageExist( true ) : setFeaturedImageExist( false );
        galleryFlag ? setGalleryImagesExist( true ) : setGalleryImagesExist( false );
    },[])

    const tabs = [
        {
            id: 0,
            content: 'Description'
        },
        {
            id: 1,
            content: 'Additional Information'
        },
        {
            id: 2,
            content: 'Reviews(' +  location.state.product.reviewCount + ')' 
        }
        
    ];

    let productRating = 0;

    const displayProductImage = ( link ) =>{
        console.log( "link", link );
        setDisplayImage( link );
       // setFeaturedImageExist(false)
       setFirstGalleryImageExist( false );
    }

    const setAttributes = ( label,value ) => {
        setEvent(!event);
        const obj = attr;
        obj[label] = value;
        setAttr(obj) 
        console.log(obj)
    }

    return(<div>
        {
            location.state !== null && location.state.product !== null ? (
                <div>
                    <div class="row"> 
                        <div class="column">
                            <div class="image-block">
                                {  
                                    firstGalleryImageExist ? (  <img src= {featuredImage} class= "product-image" alt="ProductImage" width="300px" height="400px" />
                                    ) : (  <></> )
                                }
                                {
                                    displayImage ? ( <img src= {displayImage} class= "product-image" alt="ProductImage" width="450px" height="400px" />
                                    )  : ( <div></div>)
                                } 
                            </div>
                            <div className="thumbnail-block">
                                {
                                    galleryImagesExist ?  ( 
                                        <div>{ 
                                                galleryImagesLinks.map( (link) => {
                                                    return  <btn onClick={ () => displayProductImage( link ) }>
                                                            <Thumbnail link = { link } />
                                                            </btn>
                                                })
                                            }
                                        </div>
                                    )  : ( <div> </div>)  
                                }  
                            </div>
                        </div>

                        <div class="column product-details-heading">    
                            <h2><b>Product Details</b></h2>
                    
                            <div>{ 
                                location.state.product.stockStatus !== "IN_STOCK" ? (
                                    <h3 class="out-of-stock">This Product is currently out of stock.</h3>): ( <h3  class="in-stock">This Product is currently in stock.</h3>) }
                            </div>
                        
                            
                            <div class="product-details">
                                <h4>Product Name: { location.state.product.name }</h4>
                                {/* <h4>Product Description: { location.state.product.description }</h4> */}
                                <h4>Product Categories: {
                                    Object.keys( location.state.product ).map( key => {
                                        let CategoryList = "";
                                        if(key === "productCategories"){
                                            const allCategories = location.state.product[key];                                           
                                            Object.keys(allCategories.nodes).map( category => {
                                                const catObject = allCategories.nodes[category];
                                                CategoryList = CategoryList +  catObject["name"] + ",";
                            
                                            })
                                        }
                                        return CategoryList;
                                    })
                                    }</h4>

                                {
                                    "variations" in location.state.product ? (
                                    <h4>Price Range: { location.state.product.price }</h4>) : ( <h4>Price: { location.state.product.price }</h4>)
                                }  
                        
                            </div>

                                   
                            <h2>Product Attibutes:</h2>
                            {
                                location.state.product.attributes !== null ? (
                                    location.state.product.attributes.edges.map( ( edge )=>{
                                        return <div>
                                            <label id="attr">{edge.node.label}</label>
                                            {
                                                edge.node.options.length > 1 ? (
                                                    <select name="attr" onChange={ (e)=>{console.log(edge.node.label,e.target.value);
                                                        setAttributes(edge.node.label,e.target.value)} }>
                                                        <option value="select">Select</option>    {
                                                            edge.node.options.map( ( value ) => {
                                                                return <option value={ value }>{ value }</ option >
                                                            })
                                                            }</select>
                                                ) : (<h4>{ edge.node.options[0] }</h4>)
                                            }      
                                        </div>
                                    }) 
                                ) : (<div></div>)
                            }

                            {
                                "variations" in location.state.product ? (
                                
                                    location.state.product.variations.edges.map( (edge) => {
                                        let link_part = location.state.product.name.toLowerCase() + '/?';
                                        if( Object.keys(attr).length > 0  ){
                                            console.log(attr,"attr")
                                            Object.keys(attr).map( attribute_key => {
                                                console.log("hy",attribute_key,attr[attribute_key])
                                                link_part = link_part + 'attribute_' + attribute_key.toLowerCase() + '=' + attr[ attribute_key ] + '&';
                                            
                                            })
                                        }
                                        let link = 'http://localhost/web4/wordpress/product/' + link_part ;
                                        link = link.slice( 0,link.length - 1);
                                        console.log("variation_linked",edge.node.link)
                                        console.log("link",link)
                                        if ( edge.node.link === link ){
                                            console.log("matched")
                                            return (<div>
                                                <h2>Product Variation Details </h2>
                                                <h4>Price : {edge.node.price ? edge.node.price : '$45'}</h4>
                                                </div>
                                            )
                                        }
                                    })
                                ) : (<div></div>)
                            }

                            {/* <StarRating maximum="5"
    present =
    defaultColor =  "grey"
    activeColor = "blue"
    size = "4"
    spacing ="loose" /> */}
                            <h3>Product Rating:</h3>
                            {   
                                location.state.product.reviews !== null ? ( 
                                
                                    location.state.product.reviews.edges.map( (edge) => { 
                                        console.log(edge.rating)
                                      productRating = productRating + edge.rating;
                                    })
                                   // productRating = productRating / (location.state.product.reviews);
                                ) : ( <div></div>)   
                            }
                            {
                               location.state.product.reviews !== null ? ( 
                                   productRating = productRating / ( location.state.product.reviews.edges.length )
                               ) : ( <div></div> )   
                            }
                            <StarRating  defaultColor= "grey"  present= {productRating} size= {25} spacing ="none" />
                           
                            <div class="product-view-tabs" >
                                <Tabs value={tabs} selected={selectedTab} onChange={(selectedTab) => {      
                                    console.log(selectedTab);
                                    setSelectedTab(selectedTab)
                                    // this.setState({selectedTab: selectedTab, loading: true,rows:[]},  () => {this.getRows(selectedTab)});

                                }}/>
                                {
                                    selectedTab === 0 ? (<div>{ location.state.product.description }</div>) : (<div></div>)
                                }
                                {
                                    selectedTab === 1 ? (<div>
                                        {
                                            location.state.product.attributes !== null ? (
                                                location.state.product.attributes.edges.map( ( edge )=>{
                                                    return <div class="additional_info_div">
                                                        <label class="additional_info_label">{edge.node.label}</label>
                                                        { 
                                                            edge.node.options.map( ( value ) => {
                                                                return <label class="additional_info_values" value={ value }>{ value }</label>
                                                            })
                                                        }      
                                                    </div>
                                                }) 
                                            ) : (<div></div>)
                                        }
                                    </div>) : (<div></div>)
                                }
                                {
                                    selectedTab === 2 ? (<div>{
                                        location.state.product.reviews !== null ? ( 
                                            location.state.product.reviews.edges.map( (edge) => {
                                                //console.log(edge)
                                                if( edge.node.parentId == null ){
                                                    console.log("if");
                                                    return(<div class="parent_review">
                                                        <img src={icon} width="25px" height="25px"/>
                                                    <p>{edge.node.content.slice(3,edge.node.content.length - 5)}</p>
                                                    </div>)

                                                }
                                                else{
                                                    console.log("else");
                                                    let parent_id = edge.node.parentId;
                                                    location.state.product.reviews.edges.map( (nodes) => { 
                                                        if( parent_id === nodes.node.parentId ){
                                                            console.log("else-if");
                                                            console.log("parent_id",parent_id);
                                                            return (<div class="parent_review">
                                                                {/* <img src={icon} width="25px" height="25px"/> */}
                                                                <p>{nodes.node.content.slice(3,nodes.node.content.length - 5)}</p>
                                                            </div>)
                                                        }
                                                    
                                                    })
                                                    console.log("else-end")
                                                    return (<div class="parent_review_replies">
                                                                <img src={icon} width="25px" height="25px"/>
                                                                <p>{edge.node.content.slice(3,edge.node.content.length - 5)}</p>
                                                            </div>)
                                                
                                                }
                                                
                                            })
                                        ) : (<div></div>)   
                                    }</div>) : (<div></div>)
                                }

                                {/* {   selectedTab == 2 ? (<div>{
                                        location.state.product.reviews.edges.map( (edge) => {
                                            if( edge.node.parentId !== null ) {
                                                return (<div class="parent_review_replies">
                                                    <img src={icon} width="25px" height="25px"/>
                                                    <p>{edge.node.content.slice(3,edge.node.content.length - 5)}</p>
                                                </div>)

                                            }
                                        })
                                    }</div>) :(<div></div>)
                                
                                } */}

                            </div>                

                        </div>    
                    </div>  
                        
                </div>


            ) : (<div></div>)
        }
        </div>
    )

}

export default SingleProductView;