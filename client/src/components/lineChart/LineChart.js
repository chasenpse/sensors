import React, { useState, useEffect } from 'react';
import './lineChart.css';
import axios from 'axios';

const url = 'http://localhost:5000/';

const LineChart = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(url)
            .then((res)=>{
                setData(res.data);
            })
    }, [])

    if (!data) return (<div className={"loading"}>Loading...</div>);
    return (
        <div>
            {data.map((d,i)=><p key={i}>{d.time} -- {d.temperature}F -- {d.humidity}%</p>)}
        </div>
    )
}

export default LineChart;