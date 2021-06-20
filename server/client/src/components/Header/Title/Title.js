import React from 'react';
import './Title.css';

function Title({children}) {
    return (
        <div className={"title"}>
            <h1>{children}</h1>
        </div>
    )
}

export default Title;