import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import styles from "./InputStyles";

function Input({ label, text }) {


    return (
        <SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.label}>{label} </Text>
                <View style={styles.box} >
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
};

export default Input;
