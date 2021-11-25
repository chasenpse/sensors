import React, {useState, useContext, useEffect, useMemo} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {scaleLinear, scaleTime, timeFormat, extent} from 'd3';
import {AxisBottom} from "./AxisBottom/AxisBottom";
import {AxisLeft} from "./AxisLeft/AxisLeft";
import {Marks} from "./Marks/Marks";
import {ControlsContext} from "../../Header/Controls/ControlsContext";

const LineGraph = ({data}) => {
    const mobileMargin = useMemo(() => {
        return {top: 20, right: 20, bottom: 65, left: 80}
    }, []);
    const desktopMargin = useMemo(() => {
        return {top: 20, right: 50, bottom: 65, left: 90}
    }, []);

    const [margin, setMargin] = useState(+window.innerWidth < 1020 ? mobileMargin : desktopMargin);
    const {startDate, endDate} = useContext(ControlsContext);
    const [width, setWidth] = useState(+window.innerWidth);
    const [height, setHeight] = useState(+window.innerWidth < 1020 ? 320 : 420);
    const [xAxisTickFormat, setXAxisTickFormat] = useState('%m/%d');
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xAxisLabelOffset = 60;
    const yAxisLabelOffset = 50;
    const xValue = d => d.time;
    const yValue = d => d.dataset;
    const fullYDataSet = data.map(dataObj => dataObj.data.map(i => yValue(i))).flat()
    const setXTicks = (d) => {
        if (d < 3) {
            return '%H:%M';
        } else if (d >= 3 && d < 61) {
            return '%b %d';
        } else if (d >= 61) {
            return '%b';
        } else {
            return '%H:%M';
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(+window.innerWidth);
            setHeight(+window.innerWidth < 1020 ? 320 : 420);
            setMargin(+window.innerWidth < 1020 ? mobileMargin : desktopMargin);
        });
    }, []);

    useEffect(() => {
        setXAxisTickFormat(setXTicks(Math.ceil(data[0].data.length / 1440))); // 1440 minutes = 1 day
    }, [data, startDate, endDate]);

    const xScale = scaleTime()
        .domain(extent(data[0].data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = () => {
        return scaleLinear()
            .domain(extent(fullYDataSet))
            .range([innerHeight, 0])
            .nice();
    }

    const updateColor = (key, val) => {
        localStorage.setItem(key, val)
    }

    return (
        <div className={'graph'}>
            <div className={"legend"}>
                {data.map(({name, colors, yLabel})=>
                    <React.Fragment key={yLabel}>
                        <span className={"legendItem"}>
                            <label>Color:</label><input type={"color"} value={colors.line} onChange={(e)=>{updateColor(`${name}Color`, e.target.value); colors.setLine(e.target.value)}} />
                        </span>
                        <span className={"legendItem"}>
                           <label>Alert:</label><input type={"color"} value={colors.alert} onChange={(e)=>{updateColor(`${name}AlertColor`, e.target.value); colors.setAlert(e.target.value)}} />
                        </span>
                    </React.Fragment>
                )}
            </div>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={timeFormat(xAxisTickFormat)}
                        tickOffset={32}
                    />
                    <AxisLeft yScale={yScale()} innerWidth={innerWidth} tickOffset={5} />
                    <g transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                        <text
                            className="axis-label"
                            textAnchor="middle"
                        >
                            {data.map(dataObj=>dataObj.yLabel).join(" / ")}
                        </text>
                    </g>
                    {
                        data.map(({alert,colors})=>{
                            if (alert && extent(fullYDataSet)[0] < alert && alert < extent(fullYDataSet)[1]) {
                                return <line
                                    key={uuidv4()}
                                    x1={0}
                                    y1={yScale()(alert)}
                                    x2={innerWidth}
                                    y2={yScale()(alert)}
                                    stroke={colors.alert}
                                />
                            }
                        })
                    }
                    {
                        data.map(({data,colors})=>
                            <Marks
                                key={uuidv4()}
                                data={data}
                                xScale={xScale} yScale={yScale()}
                                xValue={xValue} yValue={yValue}
                                stroke={colors.line}
                            />
                        )
                    }
                </g>
            </svg>
        </div>
    )
}

export default LineGraph;