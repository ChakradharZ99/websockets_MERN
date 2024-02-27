import {useState} from 'react';
import bell from "../assets/bell.png"

function Navbar(){
    const [count, setCount] = useState();
    return(
        <>
        <p>{count}</p>
        <img src={bell} alt="bell"  width="30px"/>
        <br />
        </>
    )
}

export default Navbar;