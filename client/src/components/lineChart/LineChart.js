import React, {useState, useEffect, useContext} from 'react';
import './lineChart.css';
import axios from 'axios';
import {scaleLinear, scaleTime, timeFormat, extent} from 'd3';
import {AxisBottom} from "./AxisBottom/AxisBottom";
import {AxisLeft} from "./AxisLeft/AxisLeft";
import {Marks} from "./Marks/Marks";
import { ControlsContext} from "../header/controls/ControlsContext";


const url = 'http://localhost:5000/';

const LineChart = () => {
    const [
        tempToggle, setTempToggle,
        humidityToggle, setHumidityToggle,
    ] = useContext(ControlsContext);

    const [data, setData] = useState(null);
    const [width, setWidth] = useState(+window.innerWidth);
    const [height, setHeight] = useState(+window.innerHeight/2);
    const [yAxisLabel, setyAxisLabel] = useState('Temperature °F / Humidity %');

    const margin = { top: 20, right: 50, bottom: 65, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xAxisLabelOffset = 60;
    const yAxisLabelOffset = 50;
    const xValue = d => d.time;
    const xAxisLabel = 'Time';
    const y1Value = d => d.temperature;
    const y2Value = d => d.humidity;
    const xAxisTickFormat = timeFormat('%H:%M');

    useEffect(() => {
        window.addEventListener("resize", ()=>{
            setWidth(+window.innerWidth);
            setHeight(+window.innerHeight/2);
        });
    }, []);

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                const data = res.data.map(d => {
                    return ({
                        time: new Date(d.time),
                        temperature: +d.temperature,
                        humidity: +d.humidity
                    })
                })
                setData(data);
            })
    }, []);

    if (!data) return (<div className={"loading"}>Loading...</div>);

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, humidityToggle ? y2Value : y1Value))
        .range([innerHeight, 0])
        .nice();

    const tempData = () => {
        if (tempToggle) {
            return (
                    <Marks
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        xValue={xValue}
                        yValue={y1Value}
                        tooltipFormat={xAxisTickFormat}
                        circleRadius={3}
                        type={"temp"}
                    />
            )
        }
    };

    const humidityData = () => {
        if (humidityToggle) {
            return (
                <Marks
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={y2Value}
                    tooltipFormat={xAxisTickFormat}
                    circleRadius={3}
                    type={"humidity"}
                />
            )
        }
    };

    return (
        <div className={"svgContainer"}>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={xAxisTickFormat}
                        tickOffset={25}
                    />
                    <text
                        className="axis-label"
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                        textAnchor="middle"
                    >
                        {xAxisLabel}
                    </text>
                    <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        transform={`translate(${-yAxisLabelOffset},${innerHeight /
                        2}) rotate(-90)`}
                    >
                        {yAxisLabel}
                    </text>
                    {humidityData()}
                    {tempData()}
                </g>
            </svg>
        </div>
    )
}

export default LineChart;