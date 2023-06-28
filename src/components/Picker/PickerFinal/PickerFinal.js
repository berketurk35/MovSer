import React from 'react';
import { View, Text } from "react-native";
import styles from "./PickerFinalStyles";

import { Picker } from '@react-native-picker/picker';

function PickerFinal({ selectedValue, onValueChange }) {

    const isFinal = [
        "Dizi Bitti",
        "Dizi Devam Ediyor",
    ];

    return (
        <View style={styles.contaier}>
            <Text style={styles.label}> Final Durumu </Text>
            <View style={styles.picker} >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    mode='dropdown'
                    dropdownIconColor={"blue"}
                >
                    <Picker.Item label='-' value={""} />
                    {isFinal.map((isFinal, index) => (
                        <Picker.Item key={index} label={isFinal} value={isFinal} style={styles.pickerItem} />
                    ))}
                </Picker>
            </View>
        </View>


    )
};

export default PickerFinal;