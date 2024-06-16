

import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function StyledTextInput(props) {
    return (
        <View className="my-2">
            <Text>{props.label}</Text>
            <TextInput className="bg-white h-10 w-80 rounded-lg p-2 my-2 shadow"
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    );
}
