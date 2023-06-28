import React from 'react';
import { View, Text } from "react-native";
import styles from "./PickerSeasonsStyles";

import { Picker } from '@react-native-picker/picker';

function PickerSeasons({ selectedValue, onValueChange }) {

    const seasons = [
        "1 Sezon",
        "2 Sezon",
        "3 Sezon",
        "4 Sezon",
        "5 Sezon",
        "6 Sezon",
        "7 Sezon",
        "8 Sezon",
        "9 Sezon",
        "10 Sezon",
        "11 Sezon",
        "12 Sezon",
        "13 Sezon",
        "14 Sezon",
        "15 Sezon",
        "16 Sezon",
        "17 Sezon",
        "18 Sezon",
        "19 Sezon",
        "20 Sezon",
        "20+ Sezon",
    ];

    return (
        <View style={styles.contaier}>
            <Text style={styles.label}> Toplam Sezon Sayısı* </Text>
            <View style={styles.picker} >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    mode='dropdown'
                    dropdownIconColor={"blue"}
                >
                    <Picker.Item label='-' value={""} />
                    {seasons.map((seasons, index) => (
                        <Picker.Item key={index} label={seasons} value={seasons} style={styles.pickerItem} />
                    ))}
                </Picker>
            </View>
        </View>


    )
};

export default PickerSeasons;