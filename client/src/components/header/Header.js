import React from 'react';
import './Header.css';
import Title from "./title/Title";
import Controls from "./controls/Controls";

const title = <h1>sen<span>Pi</span></h1>;

const Header = () => {
    return (
        <header className={"header"}>
            <Title value={title} />
            <Controls />
        </header>
    );
}

export default Header;
