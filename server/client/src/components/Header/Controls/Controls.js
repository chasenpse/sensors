import './Controls.css';
import React, { useContext } from 'react';
import ToggleButton from "./ToggleButton/ToggleButton";
import DateInput from "./DateInput/DateInput";
import { ControlsContext } from "./ControlsContext";

const Controls = () => {
    const {
        combo, setCombo,
        startDate, setStartDate,
        endDate, setEndDate
    } = useContext(ControlsContext);

    return (
        <div className={"controls"}>
            <ToggleButton
                status={combo}
                label={"Combo"}
                handler={setCombo}
            />
            <div className={"dateRangeContainer"}>
                <span className={"rangeLabel"}>Range:</span>
                <DateInput value={startDate} min={"2020-10-15"} handler={setStartDate} />
                -
                <DateInput value={endDate} min={startDate} handler={setEndDate} />
            </div>
        </div>
    )
}

export default Controls;