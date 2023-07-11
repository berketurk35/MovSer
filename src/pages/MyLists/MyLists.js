import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreNames, setGenreNames] = useState([]);
    const [categoryText, setCategoryText] = useState("");
    const [duration, setDuration] = useState("");

    const searchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: searchText,
                },
            });

            const results = response.data.results.slice(0, 3);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const getMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                },
            });

            const runtime = response.data.runtime;
            setDuration(runtime);

            console.log("Movie Details: ", duration);


        } catch (error) {
            console.error(error);
        }
    };

    const fetchGenreNames = async (genreIds) => {
        try {
            const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
                params: {
                    api_key: API_KEY,
                },
            });

            const genres = response.data.genres;
            const names = genreIds.map((genreId) => {
                const genre = genres.find((g) => g.id === genreId);
                return genre ? genre.name : '';
            });

            return names;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const handleTextChange = (text) => {
        setSearchText(text);
        searchMovies();
    };

    const handleMovieSelect = async (movie) => {
        setSelectedMovie(movie);
        setSearchText(movie.title);
        getMovieDetails(movie.id);

        // Film tür adlarını al
        const genreNames = await fetchGenreNames(movie.genre_ids);

        // Kategori adlarını ekrana yazdır
        setCategoryText(genreNames.length > 0 ? genreNames.join(', ') : 'Belirtilmemiş');
        //console.log('Seçilen film kategorisi:', categoryText);
    };

    const handleSearchBarPress = () => {
        setSelectedMovie(null);
        setGenreNames([]);
    };

    const renderMovieItem = ({ item }) => {
        //console.log(item); // Bütün verileri konsola yazdır
        return (
            <TouchableOpacity onPress={() => handleMovieSelect(item)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                        style={{ width: 75, height: 100, margin: 10 }}
                    />
                    <View>
                        <Text>{item.title} - </Text>
                        <Text>{item.vote_average}</Text>
                        {genreNames.length > 0 && (
                            <Text>{genreNames.join(', ')}</Text> // Film tür adlarını göster
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <TextInput
                value={searchText}
                onChangeText={handleTextChange}
                placeholder="Film ara..."
                onFocus={handleSearchBarPress}
            />

            {selectedMovie ? (
                <Text>
                    Seçilen film: {selectedMovie.title} - {selectedMovie.vote_average.toFixed(1)} - {selectedMovie.popularity}
                </Text>
            ) : (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMovieItem}
                />
            )}
        </View>
    );
};

export default App;
