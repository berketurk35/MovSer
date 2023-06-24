import React from 'react';
import { View, Text } from "react-native";
import styles from "./PickerPlatformStyles";

import { Picker } from '@react-native-picker/picker';

function PickerPlatform({ selectedValue, onValueChange }) {

    const platforms = [
        "Netflix",
        "Amazon Prime",
        "İnternet",
    ];

    return (
        <View style={styles.contaier}>
            <Text style={styles.label}> Platformu </Text>
            <View style={styles.picker} >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    mode='dropdown'
                    dropdownIconColor={"blue"}
                >
                    <Picker.Item label='-' value={""} />
                    {platforms.map((platforms, index) => (
                        <Picker.Item key={index} label={platforms} value={platforms.charAt(0).toUpperCase() + platforms.slice(1).toLowerCase()} style={styles.pickerItem} />
                    ))}
                </Picker>
            </View>
        </View>


    )
};

export default PickerPlatform;