import { useNavigate } from "react-router-dom";

export default function ShowLinks({...props}){
  // console.log(props.links.reverse());
   const navigate = useNavigate();
    var temp = props.links;
    if(props.links.length > 2 && props.linkpage != 'true'){
      temp = props.links.slice(0, 2);
    }
    return(
      
        temp.map(x=>{
            return(
        <div class="show-link">
            <div class="linkbtn-title">
            <div class="short-link"><a href={'http://127.0.0.1:5000/'+x.short_code}>surl.com/{x.short_code}</a></div>
            <div class="view-div">
              {props.linkpage!='true'?
                <button class="view-btn" onClick={()=>{props.getFunction(x.short_code)}}>View clicks</button>
              :<button class="view-btn" onClick={()=>navigate('/current/'+x.short_code)}>View clicks</button>}
              </div>
            </div>
            <div>{x.original_url}</div>
            <hr/>
            {/* <hr> */}
            <div class="btn-div">
            <div><button class="btn-temp btn-rtemp" onClick={()=>{props.deleteFunction(x.short_code)}}>Delete</button></div>
            <div><button class="btn-temp btn-gtemp" onClick={()=>{props.customLinkFunction(x.short_code)}}>Edit</button></div>
            </div>
            <div class="link-time">
              {x.timestamp}
            </div>
          </div>
            )})
    );
}