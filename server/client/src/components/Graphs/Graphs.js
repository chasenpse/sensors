import React, {useState, useEffect, useContext} from 'react';
import './Graphs.css';
import LineGraph from './LineGraph/LineGraph'
import {ControlsContext} from "../Header/Controls/ControlsContext";
import axios from "axios";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Graphs = () => {
    const {combo, startDate, endDate} = useContext(ControlsContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        setLoading(true)
        if (startDate > endDate) {
            setLoading(false)
            setError(true)
        } else {
            axios.get(`/q?startdate=${startDate}&enddate=${endDate}`)
                .then((res) => {
                    const data = res.data.map(d => {
                        return ({
                            time: new Date(d.time),
                            temperature: +d.temperature,
                            humidity: +d.humidity
                        })
                    })
                    setData(data)
                    setError(false)
                    setLoading(false)
                })
                .catch(e=>setError(e));
        }
    },[startDate, endDate])

    if (loading) return <Loading />
    if (error) return <Error />

    const tempData = data.map(d=>(
        {
            time: d.time,
            dataset: d.temperature
        }
    ));

    const humidityData = data.map(d=>(
        {
            time: d.time,
            dataset: d.humidity
        }
    ));

    if (combo) {
        return <LineGraph
            data={[tempData, humidityData]}
            yLabel={"Temperature °F / Humidity %"}
            colors={['#FF3341','#0099FF']}
        />
    }

    return(
        <>
            <LineGraph
                data={[tempData]}
                yLabel={"Temperature °F"}
                colors={['#FF3341']}
            />
            <LineGraph
                data={[humidityData]}
                yLabel={"Humidity %"}
                colors={['#0099FF']}
            />
        </>
    )
}

export default Graphs;