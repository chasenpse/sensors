import React, {useState, useEffect, useContext} from 'react';
import './lineChart.css';
import axios from 'axios';
import {scaleLinear, scaleTime, timeFormat, extent} from 'd3';
import {AxisBottom} from "./AxisBottom/AxisBottom";
import {AxisLeft} from "./AxisLeft/AxisLeft";
import {Marks} from "./Marks/Marks";
import { ControlsContext } from "../header/controls/ControlsContext";

const LineChart = () => {
    const {tempToggle, humidityToggle, startDate, endDate} = useContext(ControlsContext);

    const [data, setData] = useState(null);
    const [width, setWidth] = useState(+window.innerWidth);
    const [height, setHeight] = useState(+window.innerHeight * .6);
    const [xAxisTickFormat, setXAxisTickFormat] = useState('%m/%d');

    const margin = { top: 20, right: 50, bottom: 65, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xAxisLabelOffset = 60;
    const yAxisLabelOffset = 50;
    const xValue = d => d.time;
    const xAxisLabel = 'Time';
    const y1Value = d => d.temperature;
    const y2Value = d => d.humidity;

    const setXTicks = (d) => {
        if (d<3) {
            return '%H:%M';
        } else if (d>=3 && d<32) {
            return '%b %d';
        } else if (d>=32 && d<61) {
            return '%b %d';
        } else if (d>=61) {
            return '%b';
        } else {
            return '%H:%M';
        }
    }

    useEffect(() => {
        window.addEventListener("resize", ()=>{
            setWidth(+window.innerWidth);
            setHeight(+window.innerHeight * .6);
        });
    }, []);

    useEffect(() => {
        setData(null);
        const url = `/q?startdate=${startDate}&enddate=${endDate}`;
        axios.get(url)
            .then((res) => {
                const data = res.data.map(d => {
                    return ({
                        time: new Date(d.time),
                        temperature: +d.temperature,
                        humidity: +d.humidity
                    })
                })
                setXAxisTickFormat(setXTicks(Math.ceil(data.length / 1440))); // 1440 minutes = 1 day
                setData(data);
            })
            .catch(e=>setData("error"));
    }, [startDate, endDate]);

    if (!data) return (<div className={"loading"}>Loading...</div>);
    if (data === 'error') return (<div className={"error"}>
        bad date range?!<br />
        (ノ°Д°）ノ︵ ┻━┻
    </div>);

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = () => {
        const fullDataSet = [].concat(
            data.map(d=>y1Value(d)),
            data.map(d=>y2Value(d)),
        )
        if (humidityToggle && tempToggle) {
            return scaleLinear()
                .domain(extent(fullDataSet))
                .range([innerHeight, 0])
                .nice();
        } else if (humidityToggle && !tempToggle) {
            return scaleLinear()
                .domain(extent(data, y2Value))
                .range([innerHeight, 0])
                .nice();
        }
        return scaleLinear()
            .domain(extent(data, y1Value))
            .range([innerHeight, 0])
            .nice();
    }

    const tempData = () => {
        if (tempToggle) {
            return (
                    <Marks
                        data={data}
                        xScale={xScale} yScale={yScale()}
                        xValue={xValue} yValue={y1Value}
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
                    xScale={xScale} yScale={yScale()}
                    xValue={xValue} yValue={y2Value}
                    type={"humidity"}
                />
            )
        }
    };

    const setYLabel = (yAxisLabel) => {
        if (tempToggle && humidityToggle) {
            return 'Temperature °F / Humidity %';
        } else if (tempToggle) {
            return 'Temperature °F';
        } else if (humidityToggle) {
            return 'Humidity %';
        } else {
            return '';
        }
    }

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={timeFormat(xAxisTickFormat)}
                    tickOffset={25}
                />
                <text
                    className="axis-label"
                    x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <AxisLeft yScale={yScale()} innerWidth={innerWidth} tickOffset={5} />
                <g transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                    <text
                        className="axis-label"
                        textAnchor="middle"
                    >
                        {setYLabel()}
                    </text>
                </g>

                {humidityData()}
                {tempData()}
            </g>
        </svg>
    )
}

export default LineChart;