import React, { useEffect, useState } from "react";
import ShowLinks from "./ShowLinks";
import LinkDetail from "./LinkDetail";
import Links from "./Links";
import { Link, useNavigate, useParams } from "react-router-dom";
import CurrentLink from "./CurrentLink";
import Register from "./Register";
import Login from "./Login";
import Modal from "./Modal";

export default function Home({showLinksOnly, loginpage, registerpage, currentLinkPage}){
     const navigate = useNavigate();
     const [userLogged, setUserLogged] = useState(false);
     const [urls, seturls] = useState([]);
     const [currentlink, setcurrentLink] = useState({clicks:0,original_url:"No link selected",short_code:"404"});
     const [username, setUsername] = useState(localStorage.getItem("username"));
     const [param, setParam] = useState();
     //  console.log(addreq);
    // var param = useParams()["code"];
    var par = useParams()['code'];
    console.log(currentLinkPage)
    // console.log(currentLinkPage);
    //  useEffect(()=>{
      if (par != param){
          getcurrentlink(par);   
          setParam(par);
          currentLinkPage = 'false';
     }
     useEffect(()=>{
      if (localStorage.getItem('username')!=null){
          setUsername(localStorage.getItem('username'));
          setUserLogged(true);      
          getviewlinks();
          // if(param.length > 0){
          // getcurrentlink(param);
          
          // }
      }      console.log(localStorage.getItem('username'));
    //  fetch('http://127.0.0.1:5000/islogged', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Authorization': 'Bearer '+localStorage.getItem('token')
    //   },
    //  })
    //  .then(
    //    data=>
    //      data.json()
    //    )
    //    .then(
    //      x=>{console.log(x);
    //       if(x.response == 'true'){
    //     setUserLogged(true);
    //     setUsername();
    //       }
    //       else{
    //         setUserLogged(false);
    //       }
    //     }
    //      );
    //      getviewlinks();   
      }, [])
      // getcurrentlink(param);

      async function getcurrentlink(code){
        console.log(code);
         fetch('http://127.0.0.1:5000/currentlink', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify({ username: username, short_code: code}),
          })
            .then(response => response.json())
            .then(data => {
              setcurrentLink(data);
              console.log("running on here");
            })
            .catch(error => {
              console.error('Error:', error);
            })
        }
        
      async function getviewlinks(){
          await fetch('http://127.0.0.1:5000/getlinks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Authorization': 'Bearer '+localStorage.getItem('token')
              },
              body: JSON.stringify({username: username}),
            })
              .then(response => response.json())
              .then(data => {
                var links = data['links'];
                console.log(links);
                seturls(links);
                // console.log("running on here  ");
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
      async function addlink(original_url){
        await fetch('http://127.0.0.1:5000/addlink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          },
          body: JSON.stringify({ 
            original_url: original_url,
            username: username
          }),
        })
          .then(response => response.json())
          .then(data => {
              console.log("data",   data);
              //  sleep();
              backbuttonstate();
              // setaddreq(1);
              getviewlinks();
              // console.log(addreq  );
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      function loadonCreate(){
        var inpelement = document.getElementById("inp");
        if (inpelement.value.length > 10){
        var btnelement = document.getElementById("create-link");
        btnelement.disabled = true;
        btnelement.style.background = "white";
        btnelement.innerHTML = "<img src='fadingcircles.gif'/>";
  
        // backbuttonstate();
        addlink(inpelement.value);
        }else{
          console.log("not allowed");
        }
      }

      function backbuttonstate(){
        var btnelement = document.getElementById("create-link");
        var inpelement = document.getElementById("inp")
        btnelement.style.background = "blue";
        btnelement.innerHTML = "Short Link";  
        btnelement.disabled = false;   
        inpelement.value = "";
      }
      async function editlink(new_short_code, short_code){
        console.log(short_code);
        await fetch('http://127.0.0.1:5000/editlink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          },
          body: JSON.stringify({ 
            short_code: short_code,
            username: username,
            new_short_code: new_short_code
          }),
        })
          .then(response => response.json())
          .then(data => {
              console.log("data",   data);
              // backbuttonstate();
              // setaddreq(1);
              getviewlinks();
              backnormaleditstate();
              // console.log(addreq  );
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      async function deleteLink(short_code){
        if (window.confirm("Are you sure to delete this link?")){
        console.log(short_code);
        await fetch('http://127.0.0.1:5000/deletelink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          },
          body: JSON.stringify({ 
            short_code: short_code,
            username: username
          }),
        })
          .then(response => response.json())
          .then(data => {
              console.log("data",   data);
              backbuttonstate();
              // setaddreq(1);
              getviewlinks();
              // console.log(addreq  );
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }else{}
    }
      function customlink(short_code){
          var inp1 = document.getElementById("inp1");
          console.log(inp1.value);
          // inp1.setAttribute('value',short_code);
          inp1.value = short_code;
          inp1.setAttribute("data-value", short_code)
      }
      function backnormaleditstate(){
        var edibtn = document.getElementById("edi-btn");
        var inpelement_ = document.getElementById("inp1");
        edibtn.disabled = false;
        inpelement_.disabled = false;
        inpelement_.value = '';
        inpelement_.removeAttribute('value');
        inpelement_.setAttribute("data-value", "")
      }
      function editmechanism(){
        var edibtn = document.getElementById("edi-btn");
        var inpelement_ = document.getElementById("inp1");
        if (inpelement_.value.length > 1 && inpelement_.value.length <= 10){
          edibtn.disabled = true;
          inpelement_.disabled = true;
          editlink(inpelement_.value, inpelement_.dataset.value);
          console.log("ran");
        }
      }
      async function logout()
      {
        await fetch('http://127.0.0.1:5000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          },
          body: JSON.stringify({ 
 
          }),
        })
          .then(response => response.json())
          .then(data => {
              console.log("data",   data);
              // backbuttonstate();
              // setaddreq(1);
              // getviewlinks();
              localStorage.removeItem('username');
              setUserLogged(false);
              // console.log(addreq  );
          })
          .catch(error => {
            console.error('Error:', error);
          });

      }
     return(
        
        
        <div class="root">
{loginpage=='true'?<Login></Login>:<></>}
{registerpage=='true'?<Register></Register>:<></>}
 <div class="side-bar">
    <div class="side-title">
      surl
    </div>
    <div>
      <div class={showLinksOnly!='true'?'option-btn default-click':"option-btn"}>
        <span class="material-symbols-outlined">
dashboard
</span><div type="button" class="side-btn" onClick={()=>navigate('/')
}>Dashboard</div>
      </div>
     <div class={showLinksOnly=='true'?'option-btn default-click':"option-btn"}>
        <span class="material-symbols-outlined">
link
</span><div type="button" class="side-btn" onClick={()=>navigate('/links')
}>Your Links</div>
      </div>
    </div>
    <div class="log-area">
      <div></div>
      <div class="log-out">
       {/* <span class="material-symbols-outlined">
logout
</span>
        <div>Logout</div> 
       */}
       {userLogged? 
       
       <div class="option-btn logout-btn">
        <span class="material-symbols-outlined">
logout
</span><div type="button" class="side-btn" onClick={logout}>Logout</div>
      </div>:<></>
      }
        </div>
    </div>
  </div>
  <div class="main-bar">
    <div class="nav-bar">
      <div class="nav-title">URL SHORTENER</div>
      <div class="nav-btn">
      {userLogged?<button class="con-btn">Hello, {username}</button>:
          <button class="con-btn" onClick={()=>navigate('/login')}><span>Login</span><span>
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="svg-in" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 18.909 18.909" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path class="svg-con" d="M18.193 8.311 9.887 1.714a1.314 1.314 0 0 0-1.269.052 1.272 1.272 0 0 0-.619 1.09v13.198c0 .443.233.856.619 1.089a1.316 1.316 0 0 0 1.269.052l8.306-6.599c.4-.376.716-.658.716-1.143s-.268-.746-.716-1.142z" style="" fill="#030104" data-original="#030104"></path></g></svg> */}
            </span></button>
      }
      </div>
      
      <div class="nav-option">
       {/* <div class="nav-icon">
      <span class="material-symbols-outlined">
settings
</span>
    </div>
        <div class="nav-icon">
      <span class="material-symbols-outlined">
settings
</span>
    </div> */}
      </div>
    </div>
   
    <div class="dash-bar">
    <div class="link-detail">
      {userLogged?<div>
      { showLinksOnly != 'true'?
      <div>
        <div class="total-link">
          <div class="total-count">Total Links : <span style={{color:"blue"}}><strong>{urls.length>0?urls.length:<></>}</strong></span></div>
        </div>
        <CurrentLink currentLink={currentlink}></CurrentLink>
        <LinkDetail deleteFunction={deleteLink} getFunction={getcurrentlink} customLinkFunction={customlink} urls={urls} linkpage={'false'}></LinkDetail>
      </div>:
       <LinkDetail deleteFunction={deleteLink} getFunction={getcurrentlink} customLinkFunction={customlink} urls={urls} linkpage={'true'}></LinkDetail> 
    }
    </div>:
    <div class="alert-msg">
      <div>
        <img src='/6310507.jpg' class="rep-img1"/>
      </div>
    <div>
  Unable to see your links, <span><Link to={'/login'}>login</Link></span> to create, monitor and track the analaytics of your tiny links
</div>
</div>
}
    </div>
      <div class="add-link">
        <div class="new-link">
          <div class="new-title">
            <div>CREATE NEW LINK</div>
            <div style={{paddindLeft:"5px"}}><span class="material-symbols-outlined" style={{lineHeight: 0, color: "blue", fontWeight: 600}}>
link
              </span></div>
          </div>
          <div class="txt-nml">
            Create, short, and manage your links
          </div>
          <div class="link-input">
            <input class="inp" disabled={!userLogged} id="inp" placeholder="Paste your link here..."/>
            <button class="create-link" id="create-link" disabled={!userLogged} onClick={loadonCreate}>
              {/* <div class="loadingio-spinner-rolling-9acqja6j2jv"><div class="ldio-tf2hidauarr">
              </div></div> */}
             Short Link
            </button>
          </div>
        </div>
        <div class="custom-link">
          <div class="custom-title">
            CUSTOM YOUR LINK
          </div>
          {/* <div class="img-div">
            <img class="img-sample" src="https://images.unsplash.com/photo-1684635555286-26b91ffe6561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1840&q=80" />
          </div> */}
          <div class="inp-edit">
          <div class="inp-url">surl.com/</div>
          <input class="inp1" id="inp1" disabled={!userLogged}/>
          </div>
          <div>Alphanumeric values is accepted</div>
          <div class="edi-div">
          <button class="edi-btn" id="edi-btn" disabled={!userLogged} data-value="" onClick={editmechanism}>Edit</button>
          </div>
        </div>
        </div>
      
      

    </div>
  </div>

</div>

    )
}
