import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.filler, { width: `${progress}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: '100%',
        height: 40,
        backgroundColor: '#FFF', 
        borderRadius: 12,
        overflow: 'hidden',
    },
    filler: {
        height: '100%',
        backgroundColor: '#c40c0c', 
        borderRadius: 12,
    },
});

export default ProgressBar;
