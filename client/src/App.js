import React from 'react';
import Header from "./components/header/Header";
import LineChart from "./components/lineChart/LineChart";
import { ControlsProvider } from './components/header/controls/ControlsContext';

const App = () => {

    return (
        <ControlsProvider>
            <div className={"App"}>
                <Header />
                <LineChart />
            </div>
        </ControlsProvider>
    );
}

export default App;
