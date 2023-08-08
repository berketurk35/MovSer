import React, { createContext, useContext, useState } from "react";

const StatContext = createContext();

export function StatProvider({ children }) {
    const [movieCounter, setMovieCounter] = useState(0);
    const [reqMovieCounter, setReqMovieCounter] = useState(0);

    const [serieCounter, setSerieCounter] = useState(0);
    const [activeSerieCounter, setActiveSerieCounter] = useState(0);
    const [reqSerieCounter, setReqSerieCounter] = useState(0);

    const [movieListCounter, setMovieListCounter] = useState(0);
    const [serieListCounter, setSerieListCounter] = useState(0);

    return (
        <StatContext.Provider
            value={{
                movieCounter,
                setMovieCounter,
                reqMovieCounter,
                setReqMovieCounter,
                serieCounter,
                setSerieCounter,
                activeSerieCounter,
                setActiveSerieCounter,
                reqSerieCounter,
                setReqSerieCounter,
                movieListCounter,
                setMovieListCounter,
                serieListCounter,
                setSerieListCounter,
            }}
        >
            {children}
        </StatContext.Provider>
    );
}

export function useStats() {
    return useContext(StatContext);
}
