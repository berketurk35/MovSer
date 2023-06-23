import React from 'react';
import { View, Text} from "react-native";
import styles from "./PickerCategoryStyles";

import { Picker } from '@react-native-picker/picker';

function PickerCategory({ selectedValue, onValueChange }) {

    const categories = [
        "Aksiyon",
        "Komedi",
        "Drama",
        "Bilim Kurgu",
        "Korku",
        "Macera",
        "Romantik",
        "Belgesel",
        "Animasyon",
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
                    {categories.map((category, index) => (
                        <Picker.Item key={index} label={category} value={category.toLowerCase()} style={styles.pickerItem} />
                    ))}
                </Picker>
            </View>
        </View>


    )
};

export default PickerCategory;