import React from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


{/* https://www.npmjs.com/package/react-native-element-dropdown */ }

export default function StyledDropdown(props) {
    return (
        <View className="my-2">
            <Text>{props.label}</Text>


            <Dropdown
                // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                className="w-80 bg-white rounded-lg px-2 py-0.5 my-2 shadow"
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={props.data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!props.isFocus ? 'Selecione' : '...'}
                searchPlaceholder="Search..."
                value={props.value}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={props.onChange}

            />
        </View>
    );
}
