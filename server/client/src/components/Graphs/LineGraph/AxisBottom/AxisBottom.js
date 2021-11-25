import './AxisBottom.css';

export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) => {
    return xScale.ticks().map(tickValue => (
        <g className="tick bottom" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line className="line bottom" y2={innerHeight}/>
            <text className={"bottomAxisText"} x={-1*(innerHeight + tickOffset)/1.47} y={(innerHeight + tickOffset)/1.45} transform={`rotate(-45)`}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));
}
