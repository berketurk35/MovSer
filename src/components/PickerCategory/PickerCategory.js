import React from 'react';
import { View, Text } from "react-native";
import styles from "./PickerCategoryStyles";

import { Picker } from '@react-native-picker/picker';

function PickerCategory({ selectedValue, onValueChange }) {

    const categories = [
        "Aksiyon",
        "Animasyon",
        "Belgesel",
        "Bilim Kurgu",
        "Drama",
        "Komedi",
        "Korku",
        "Macera",
        "Romantik",
    ];

    return (
        <View style={styles.contaier}>
            <Text style={styles.label}> Kategorisi </Text>
            <View style={styles.picker} >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    mode='dropdown'
                    dropdownIconColor={"blue"}
                >
                    <Picker.Item label='-' value={""} />
                    {categories.map((category, index) => (
                        <Picker.Item key={index} label={category} value={category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} style={styles.pickerItem} />
                    ))}
                </Picker>
            </View>
        </View>


    )
};

export default PickerCategory;