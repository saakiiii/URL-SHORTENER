import { useParams } from "react-router-dom"

export default function Redirects({}){
    var code = useParams()
    console.log(code.code);
    window.location.replace('http://127.0.0.1:5000/'+code.code);
}