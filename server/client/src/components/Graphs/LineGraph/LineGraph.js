import React, {useState, useContext, useEffect} from 'react'
import {scaleLinear, scaleTime, timeFormat, extent} from 'd3';
import {AxisBottom} from "./AxisBottom/AxisBottom";
import {AxisLeft} from "./AxisLeft/AxisLeft";
import {Marks} from "./Marks/Marks";
import {ControlsContext} from "../../Header/Controls/ControlsContext";

const LineGraph = ({data, yLabel, colors, alert}) => {
    const {startDate, endDate} = useContext(ControlsContext);
    const [width, setWidth] = useState(+window.innerWidth);
    const [height, setHeight] = useState(+window.innerHeight * .4);
    const [xAxisTickFormat, setXAxisTickFormat] = useState('%m/%d');

    const margin = { top: 20, right: 50, bottom: 65, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xAxisLabelOffset = 60;
    const yAxisLabelOffset = 50;
    const xValue = d => d.time;
    const yValue = d => d.dataset;
    const fullYDataSet = data.map(set=>set.map(d=>yValue(d))).flat()
    const setXTicks = (d) => {
        if (d<3) {
            return '%H:%M';
        } else if (d>=3 && d<61) {
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
            setHeight(+window.innerHeight * .4);
        });
    }, []);

    useEffect(() => {
        setXAxisTickFormat(setXTicks(Math.ceil(data[0].length / 1440))); // 1440 minutes = 1 day
    }, [data, startDate, endDate]);

    const xScale = scaleTime()
        .domain(extent(data[0], xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = () => {
        return scaleLinear()
            .domain(extent(fullYDataSet))
            .range([innerHeight, 0])
            .nice();
    }

    const alertLine = () => {
        if (alert && (extent(fullYDataSet)[0] <= +alert && +alert <= extent(fullYDataSet)[1])) {
            return <line
                x1={0}
                y1={yScale()(alert)}
                x2={innerWidth}
                y2={yScale()(alert)}
                stroke={"#69BD45"}
            />
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
                    {"Time"}
                </text>
                <AxisLeft yScale={yScale()} innerWidth={innerWidth} tickOffset={5} />
                <g transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                    <text
                        className="axis-label"
                        textAnchor="middle"
                    >
                        {yLabel}
                    </text>
                </g>
                { alertLine() }
                {
                    data.map((d,i)=>
                        <Marks
                            key={`mark-${i}`}
                            data={d}
                            xScale={xScale} yScale={yScale()}
                            xValue={xValue} yValue={yValue}
                            stroke={colors[i]}
                        />
                    )
                }
            </g>
        </svg>
    )
}

export default LineGraph;