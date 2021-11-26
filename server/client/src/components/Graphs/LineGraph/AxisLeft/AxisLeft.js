import './AxisLeft.css';

export const AxisLeft = ({yScale, innerWidth, tickOffset = 3}) =>
    yScale.ticks().map(tickValue => (
        <g key={tickValue} className="tick left" transform={`translate(0,${yScale(tickValue)})`}>
            <line className="line left" x2={innerWidth}/>
            <text className={'leftAxisText'} x={-tickOffset} y={-1}>
                {tickValue}
            </text>
        </g>
    ));
