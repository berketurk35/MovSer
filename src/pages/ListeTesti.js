import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, {ScaleDecorator,ShadowDecorator,OpacityDecorator,useOnCellActiveAnimation} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';

const list = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
    { key: '4', title: 'Item 4' },
    { key: '5', title: 'Item 5' },
    { key: '6', title: 'Item 6' },
    { key: '7', title: 'Item 7' },
    { key: '8', title: 'Item 8' },
    { key: '9', title: 'Item 9' },
    { key: '10', title: 'Item 10' },
];

const ListeTesti = () => {
    const ref = useRef(null);
    const [data, setData] = useState(list);

    const renderItem = ({ item, drag }) => {

        const { isActive } = useOnCellActiveAnimation();

        return (
            <ScaleDecorator>
                <OpacityDecorator activeOpacity={1} >
                    <ShadowDecorator>
                        <TouchableOpacity onLongPress={drag} activeOpacity={1} style={{height: 100, backgroundColor: "pink" , elevation: isActive? 60 : 0, shadowColor: "black" ,justifyContent: "center", alignItems: "center" }} >
                            <Animated.View>
                                <Text> {item.title} </Text>
                            </Animated.View>
                            
                        </TouchableOpacity>
                    </ShadowDecorator>
                </OpacityDecorator>
            </ScaleDecorator>
        );
    };

    console.log(data);

    return (
        <GestureHandlerRootView >
            <DraggableFlatList
                ref={ref}
                data={data}
                keyExtractor={ (item) => item.key }
                onDragEnd={({ data }) => setData(data)}
                renderItem={renderItem}
            />
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    itemContainer: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeItem: {
        backgroundColor: '#90caf9',
    },
});

export default ListeTesti;
