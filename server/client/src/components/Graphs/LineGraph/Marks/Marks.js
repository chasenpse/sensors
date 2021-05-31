import {line, curveNatural} from 'd3';

export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    stroke,
    }) => {
    return (
        <g className="marks">
            <path
                style={{
                    stroke
                }}
                fill="none"
                d={line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))
                    .curve(curveNatural)(data)}
            />
        </g>
    )
};

