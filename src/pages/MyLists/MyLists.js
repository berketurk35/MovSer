import React, { useState } from "react";
import { View, Text, Button, FlatList, TextInput, Image } from "react-native";

import axios from "react-native-axios";

const API_KEY = '6d0b2bd6b37b82532732bc7f0db0df55';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Küçük bir boyut için w200 kullanıldı

const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: searchText,
                },
            });

            const results = response.data.results;
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextChange = (text) => {
        setSearchText(text);
        searchMovies(text);
          
    };

    const renderMovieItem = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={{ width: 75, height: 100, margin: 10 }}
            />
            <Text>{item.title} - </Text>
            <Text>{item.vote_average}</Text>

        </View>
        // Diğer film bilgilerini burada gösterebilirsiniz
    );

    return (
        <View>
            <TextInput
                value={searchText}
                onChangeText={handleTextChange}
                placeholder="Film ara..."
            />
            <Button title="Ara" onPress={searchMovies} />
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
            />
        </View>
    );
};

export default App;