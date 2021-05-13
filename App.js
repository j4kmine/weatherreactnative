import React from 'react';
import { fetchLocationId, fetchWeather } from './utils/api';
//statusbar is a built-in component that allows us to modify the app status bar
//at the top of the device
//activityindicator  is a built-in component that displays a circular loading
//spinner. We’ll use it when data is being fetched from the network
import { StyleSheet, Text, ImageBackground, ActivityIndicator, StatusBar, View, Platform, KeyboardAvoidingView } from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            location: '-',
            temperature: 0,
            weather: '',

        };
    }
    componentDidMount() {
        this.handleUpdateLocation('jakarta');
    }
    handleUpdateLocation = async city => { //make this func async
        if (!city) return;
        this.setState({ loading: true }, async() => { //make this func async
            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(locationId);
                this.setState({
                    loading: false,
                    error: false,
                    location,
                    weather,
                    temperature,
                });
            } catch (e) {
                this.setState({
                    loading: false,
                    error: true,
                });

            }
        });
    };
    render() {
        const {
            loading,
            error,
            location,
            weather,
            temperature,
        } = this.state;
        return (
            //solve the common problem of views that need to move out of the way of the virtual keyboard
            <
            KeyboardAvoidingView behavior = "padding"
            style = { styles.container } >
            <
            StatusBar barStyle = "light-content" / >
            <
            ImageBackground source = { getImageForWeather(weather) }
            style = { styles.imageContainer }
            imageStyle = { styles.image } >
            <
            View style = { styles.detailsContainer } >
            <
            ActivityIndicator animating = { loading }
            color = "white"
            size = "large" /
            > {!loading && ( <
                    View > {
                        error && ( <
                            View >
                            <
                            Text style = {
                                [styles.smallText, styles.textStyle] } >
                            Could not load weather, please
                            try a different city. <
                            /Text> <
                            SearchInput placeholder = "Search any city"
                            onSubmit = { this.handleUpdateLocation }
                            /> <
                            /View>
                        )
                    } {
                        !error && ( <
                            View >
                            <
                            Text style = {
                                [styles.largeText, styles.textStyle] } > { location } <
                            /Text> <
                            Text style = {
                                [styles.smallText, styles.textStyle] } > { weather } <
                            /Text> <
                            Text style = {
                                [styles.largeText, styles.textStyle] } > { temperature }° < /Text> <
                            SearchInput placeholder = "Search any city"
                            onSubmit = { this.handleUpdateLocation }
                            /> <
                            /View>
                        )
                    } <
                    /View>
                )
            } <
            /View> <
            /ImageBackground> <
            /KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // flex attribute mean that they will expand to
        // take up any room remaining in their parent container in relation to any sibling
        // components
        backgroundColor: '#fff',

    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center', //make content in middle
        backgroundColor: 'rgba(0,0,0,0.2)', //add transparent overlay
        paddingHorizontal: 20, //is like setting both of paddingLeft and paddingRight
    },
    imageContainer: {
        flex: 1, //make full fill parent component
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },

    textStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        color: 'white'
    },
    largeText: {
        fontSize: 44,
    },
    smallText: {
        fontSize: 18,
    },


});