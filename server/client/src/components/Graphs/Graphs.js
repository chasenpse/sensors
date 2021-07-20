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
    const [tempColor, setTempColor] = useState(localStorage.getItem('tempColor') || "#FF3341");
    const [tempAlertColor, setTempAlertColor] = useState(localStorage.getItem('tempAlertColor') || "#8540BA");
    const [humidityColor, setHumidityColor] = useState(localStorage.getItem('humidityColor') || "#0099FF");
    const [humidityAlertColor, setHumidityAlertColor] = useState(localStorage.getItem('humidityAlertColor') || "#69BD45");
    const [alerts, setAlerts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        setLoading(true)
        if (startDate > endDate) {
            setLoading(false)
            setError(true)
        } else {
            axios({
                method:'post',
                url:'/q',
                data: {
                    startDate,
                    endDate
                }
            })
                .then((res) => {
                    const data = res.data.data.map(d => {
                        return ({
                            time: new Date(d.time),
                            temperature: +d.temperature,
                            humidity: +d.humidity
                        })
                    })
                    setData(data)
                    setAlerts(res.data.alerts)
                    setError(false)
                    setLoading(false)
                })
                .catch(e=>setError(e));
        }
    },[startDate, endDate])

    if (loading) return <Loading />
    if (error) return <Error />

    const tempDataSet = data.map(d=>(
        {
            time: d.time,
            dataset: d.temperature
        }
    ));

    const humidityDataSet = data.map(d=>(
        {
            time: d.time,
            dataset: d.humidity
        }
    ));

    const tempData = {
        name: "temp",
        yLabel: "Temperature °F",
        data: tempDataSet,
        alert: alerts.temp,
        colors: {
            line: tempColor,
            setLine: setTempColor,
            alert: tempAlertColor,
            setAlert: setTempAlertColor
        }
    }

    const humidityData = {
        name: "humidity",
        yLabel: "Humidity %",
        data: humidityDataSet,
        alert: alerts.humidity,
        colors: {
            line: humidityColor,
            setLine: setHumidityColor,
            alert: humidityAlertColor,
            setAlert: setHumidityAlertColor
        }
    }

    if (combo==="true") {
        return <LineGraph data={[tempData, humidityData]} />
    }

    return(
        <>
            <LineGraph data={[tempData]} />
            <LineGraph data={[humidityData]} />
        </>
    )
}

export default Graphs;