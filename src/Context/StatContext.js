import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StatContext = createContext();

export function StatProvider({ children }) {
    const [movieCounter, setMovieCounter] = useState(0);
    const [reqMovieCounter, setReqMovieCounter] = useState(0);

    const [serieCounter, setSerieCounter] = useState(0);
    const [activeSerieCounter, setActiveSerieCounter] = useState(0);
    const [reqSerieCounter, setReqSerieCounter] = useState(0);

    const [movieListCounter, setMovieListCounter] = useState(0);
    const [serieListCounter, setSerieListCounter] = useState(0);

    const [language, setLanguage] = useState("");

    useEffect(() => {
        getLanguage();
    }, []);
    
    const getLanguage = async () => {
        try {
            const lang = await AsyncStorage.getItem("language");
            if (lang) {
                setLanguage(lang);
            } else {
                setLanguage("en");
            }
        } catch (error) {
            console.error('Dil okunurken hata oluştu:', error);
        }
    };

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
                language,
                setLanguage
            }}
        >
            {children}
        </StatContext.Provider>
    );
}

export function useStats() {
    return useContext(StatContext);
}
