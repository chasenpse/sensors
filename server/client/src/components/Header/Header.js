import React, {useState, useEffect} from 'react';
import './Header.css';
import Title from "./Title/Title";
import Controls from "./Controls/Controls";
import axios from "axios";

const Header = () => {
    const [host,setHost] = useState(null)

    useEffect(()=> {
        axios.get(`/host`)
            .then((res) => {
                setHost(res.data.host)
            })
    }, [])

    return (
        <header className={"header"}>
            <Title>{host}</Title>
            <Controls />
        </header>
    );
}

export default Header;
