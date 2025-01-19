import { ReactElement } from "react";
import logo from '../images/logo.png'

const Homepage = () :ReactElement => {
    return (
        <>
            <img src={logo} alt="logo" style={{width : '100%'}}/>
        </>
    )
}

export default Homepage