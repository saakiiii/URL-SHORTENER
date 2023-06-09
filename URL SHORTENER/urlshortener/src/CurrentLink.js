import React, { useState } from "react";
import { useParams } from "react-router-dom"

export default function({currentLink}){
    var code = useParams().code;
    // const [currentLink, setcurrentLink] = useState({});
    // const [count, setCount] = useState(0);
    
    // console.log(code);

    //     React.useEffect(()=>{
    //         fetch('http://127.0.0.1:5000/currentlink', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': 'http://localhost:3000'
    //         },
    //         body: JSON.stringify({ username: 'user1', short_code: code}),
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           setcurrentLink(data);
    //           console.log("running on here  ");
    //         })
    //         .catch(error => {
    //           console.error('Error:', error);
    //         })
    //     }, [])
    
    return(
        <>
        <div class="link-stat">
        <div class="total-click">
          <div class="click-icon">
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="50" height="50" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M398.501 211c-16.569 0-30 13.431-30 30v-30c0-16.569-13.431-30-30-30s-30 13.431-30 30c0-16.569-13.431-30-30-30s-30 13.431-30 30v-91c0-16.569-13.431-30-30-30s-30 13.431-30 30v183.574c-2.454-2.449-53.789-53.785-53.789-53.785-11.212-11.212-29.076-11.697-40.863-1.454-11.815 10.209-13.861 27.981-4.342 40.668l81.716 94.681c13.297 15.88 47.278 19.608 47.278 40.32V482c0 16.568 13.431 30 30 30h120c16.569 0 30-13.432 30-30v-46c0-22.361 30-37.639 30-60V241c0-16.569-13.432-30-30-30z" style="" fill="#0000ff" data-original="#fec478" class=""></path><path d="M308.501 512h60c16.567 0 30-13.433 30-30v-46c0-22.361 30-37.639 30-60V241c0-16.569-13.433-30-30-30s-30 13.431-30 30v-30c0-16.569-13.433-30-30-30s-30 13.431-30 30v301z" style="" fill="#0000ff" data-original="#feb756" class=""></path><path d="M218.501 60c-8.291 0-15-6.709-15-15V15c0-8.291 6.709-15 15-15s15 6.709 15 15v30c0 8.291-6.709 15-15 15zM267.895 70.605a14.948 14.948 0 0 1-10.605-4.395c-5.859-5.859-5.859-15.352 0-21.211l21.211-21.211c5.859-5.859 15.352-5.859 21.211 0s5.859 15.352 0 21.211L278.501 66.21a14.948 14.948 0 0 1-10.606 4.395zM169.106 70.605a14.948 14.948 0 0 1-10.605-4.395L137.29 45c-5.859-5.859-5.859-15.352 0-21.211s15.352-5.859 21.211 0L179.712 45c5.859 5.859 5.859 15.352 0 21.211a14.951 14.951 0 0 1-10.606 4.394zM323.501 120h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15zM143.501 120h-30c-8.291 0-15-6.709-15-15s6.709-15 15-15h30c8.291 0 15 6.709 15 15s-6.709 15-15 15z" style="" fill="#a4d9f5" data-original="#a4d9f5" class=""></path></g></svg> */}
          </div>
          <div>
          <div class="click-font">Total Clicks</div>
          <div class="click-data">{currentLink["clicks"]}</div>
          </div>
        </div>
        </div>
        <div class="current-link">
          <div class="current-title">
            Current Link
          </div>
          <div class="qr-area">
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="100" height="100" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M160 0H0v160h160V0zm-32 128H32V32h96v96z" fill="#000000" data-original="#000000" class=""></path><path d="M64 64h32v32H64zM352 0v160h160V0H352zm128 128h-96V32h96v96z" fill="#000000" data-original="#000000" class=""></path><path d="M416 64h32v32h-32zM0 512h160V352H0v160zm32-128h96v96H32v-96z" fill="#000000" data-original="#000000" class=""></path><path d="M64 416h32v32H64zM256 0h64v32h-64zM256 128h32V96h32V64h-96V32h-32v64h64zM192 128h32v32h-32zM320 160h-32v32h-96v32h128zM32 288h32v-32H32v-64H0v128h32zM64 192h32v32H64z" fill="#000000" data-original="#000000" class=""></path><path d="M192 320h64v-32h-32v-32h-64v-64h-32v64H96v64h32v-32h64zM288 256h32v64h-32zM288 352h-96v32h64v96h-64v32h96v-32h64v-32h-64z" fill="#000000" data-original="#000000" class=""></path><path d="M192 416h32v32h-32zM320 352h32v64h-32zM480 416h-96v96h32v-64h64z" fill="#000000" data-original="#000000" class=""></path><path d="M448 480h64v32h-64zM480 352h32v32h-32zM384 384h32v-96h-64v32h32zM448 224h-32v-32h-32v32h-32v32h128v-32h32v-32h-64zM448 288h64v32h-64z" fill="#000000" data-original="#000000" class=""></path></g></svg> */}
          </div>
          <div class="l-title">
            Shortened Link
          </div>
          <div class="s-link" style={{color:"blue"}}>
            surl.com/{currentLink["short_code"]}
          </div>
          <div class="l-title">
            Orginal Link
          </div>
          <div class="o-link">
            {currentLink["original_url"]}
          </div>
        </div>
     </>
    )
}