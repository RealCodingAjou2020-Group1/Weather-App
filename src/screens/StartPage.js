import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export default class StartPage extends React.Component {

    constructor(props){
        super(props);
    }

    onPressCity() {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.title}> Weather App </Text>
                <Text>{'\n\n'}</Text>
                <Image style={styles.image} source={require('./weather.png')} />
                <Text>{'\n\n'}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onPressCity()}>
                    <Text style={styles.text}>City List</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#D4A3F7',
        width: '30%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 2,
        borderWidth: 3,
        borderColor: 'white',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003060',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#0082E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        width: '53%',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        
      },
});