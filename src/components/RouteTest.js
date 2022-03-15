import {Link} from 'react-router-dom'
const RouteTest = () =>{
    return(
        <div>
            <Link to={"/"}>HOME</Link>
            <br/>
            <Link to={"/new"}>NEW</Link>
            <br/>
            <Link to={"/edit"}>Edit</Link>
            <br/>
            <Link to={"/diary"}>DIARY</Link>
            
        </div>
    )
}

export default RouteTest