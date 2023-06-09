import { useNavigate } from "react-router-dom";

function login(username, password){
    var success = false;
    fetch('http://127.0.0.1:5000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: username, password:password }),
})
  .then(response => response.json())
  .then(data => {
    // console.log("simple");
    if(data["response"]=='true'){
    localStorage.setItem('username', username)
    // success = true;
    window.location.replace('/');
    }
    else{
      alerts("Username not found or invalid password");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  console.log(success);
  return true;
}
function alerts(msg){
  document.getElementById('alert-place').innerHTML=msg;
}
export default function Login(){
  const navigate = useNavigate();
    
    return(
        <div class="login-page">
  <div class="form">
  <div class="pge-title">Login</div>

  <div id="alert-place"></div>

    <form class="login-form">
      <input type="text" id="username" placeholder="username"/>
      <input type="password" id="password" placeholder="password"/>
      <button type="button" onClick={()=>{
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var val = login(username.value, password.value)
        }
        }>login</button>
      <p class="message">Not registered? <a href="/register">Create an account</a></p>
    </form>
  </div>
</div>
    )
}