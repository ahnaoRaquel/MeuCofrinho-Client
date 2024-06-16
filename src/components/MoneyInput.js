import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function MoneyInput(props) {
    const [value, setValue] = useState('');

    const formatMoney = (text) => {
        let cleaned = text.replace(/[^0-9]/g, '');
        let num = parseInt(cleaned, 10) / 100;
        let formatted = 'R$ ' + num.toFixed(2);
        return formatted;
    };

    const handleChangeText = (text) => {
        const formattedText = formatMoney(text);
        setValue(formattedText);
        props.onChangeText(formattedText);
    };

    return (
        <View style={{ marginVertical: 8 }}>
            <Text>{props.label}</Text>
            <TextInput
                style={{ backgroundColor: 'white', height: 40, width: 320, borderRadius: 8, padding: 8, marginVertical: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}
                onChangeText={handleChangeText}
                value={value}
                keyboardType='numeric'
            />
        </View>
    );
}