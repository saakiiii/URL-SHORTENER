import { useNavigate } from "react-router-dom";

function login(username, password){
    var success = false;
    fetch('http://127.0.0.1:5000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: username, password:password }),
})
  .then(response => response.json())
  .then(data => {
    console.log("simple");
    localStorage.setItem('token', data['access_token'])
    success = true;
    if (data["response"]=='true'){
        window.location.replace('/login');
    }else{
        alerts("username already exists");
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

export default function Register(){
  const navigate = useNavigate();
    
    return(
        <div class="login-page">
  <div class="form">
  <div class='pge-title'>Register</div>

    <div id="alert-place"></div>
    <form class="login-form">
      <input type="text" id="username" placeholder="username"/>
      <input type="password" id="password" placeholder="password"/>
      <button type="button" onClick={()=>{
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        if(username.value.length > 1 && password.value.length > 0){
        var val = login(username.value, password.value)
        }else{
            alerts("Give valid username and password");
        }
        if (val == true){
    navigate('/');

        }
        }
        }>register</button>
      <p class="message">Already have an account? <a href="/login">Sign in</a></p>
    </form>
  </div>
</div>
    )
}