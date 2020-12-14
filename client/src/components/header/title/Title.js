import React from 'react';
import './Title.css';

function Title({value}) {
    return (
        <div className={"title"}>
            {value}
        </div>
    )
}

export default Title;