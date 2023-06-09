import { Link } from "react-router-dom";
import ShowLinks from "./ShowLinks";
import { useEffect, useState, React } from "react";

export default function LinkDetail({...props}){
  
    return(


<div class="few-link">
<div class="few-head">Your Links</div>
{/* <div class="show-link">
  <div class="linkbtn-title">
  <div class="short-link">surls.ly/newpage</div>
    <div class="view-div">
      <button class="view-btn">View</button>
    </div>
  </div>
  <div>https://images.unsplash.com/photo-1684635555286-26b91ffe6561?ixlib=rb-4.0.3</div>
  <div class="link-time">
    12 Dec 2022 12:06
  </div>
</div>
<div class="show-link">
  <div class="linkbtn-title">
  <div class="short-link">surls.ly/newpage</div>
    <div class="view-div">
      <button class="view-btn">View</button>
    </div>
  </div>
  <div>https://images.unsplash.com/photo-1684635555286-26b91ffe6561?ixlib=rb-4.0.3</div>
  <div class="link-time">
    12 Dec 2022 12:06
  </div>
</div> */}
<ShowLinks links={props.urls} getFunction={props.getFunction} deleteFunction={props.deleteFunction} customLinkFunction={props.customLinkFunction} linkpage={props.linkpage}></ShowLinks>
{props.linkpage != 'true' & props.urls.length > 0?
<div class="sho-mor"><Link to="/links">Show more</Link></div>:props.urls.length==0?<div style={{textAlign:"center"}}>No links to show</div>:<></>}
</div>
    );
}
