import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Graphs from "./components/Graphs/Graphs";

const App = () => {
    return (
        <div className={"App"}>
            <Header />
            <Graphs />
            <Footer />
        </div>
    );
}

export default App;
