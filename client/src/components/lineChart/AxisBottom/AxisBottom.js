import './AxisBottom.css';

export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) =>
    xScale.ticks().map(tickValue => (
        <g className="tick bottom" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line className="line bottom" y2={innerHeight}/>
            <text style={{textAnchor: 'middle'}} y={innerHeight + tickOffset}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));
