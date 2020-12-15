import './Marks.css';
import {line, curveNatural} from 'd3';

export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    type,
    }) => (
    <g className="marks">
        <path
            className={type}
            fill="none"
            d={line()
                .x(d => xScale(xValue(d)))
                .y(d => yScale(yValue(d)))
                .curve(curveNatural)(data)}
        />
    </g>
);

