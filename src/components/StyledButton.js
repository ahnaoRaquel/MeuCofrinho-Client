import React from 'react';
import { Pressable, Text } from 'react-native';

export default function StyledButton(props) {
    return (
        <Pressable
            className="bg-red-400 p-2 m-4 w-80 items-center rounded-lg text-white shadow"
            onPress={props.onPress}>
            <Text className="text-white text-xl font-semibold">
                {props.text}
            </Text>
        </Pressable>
    );
}
