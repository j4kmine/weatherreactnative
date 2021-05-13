import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';

export default class SearchInput extends React.Component {
    constructor(props) { //access props from parent
        super(props);
        this.state = {
            text: '',
        };
    }

    handleChangeText = text => {
        this.setState({ text });
    };
    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;
        if (!text) return;
        onSubmit(text); //passing data to parrent
        this.setState({ text: '' });

    }
    render() {
        const { placeholder } = this.props;
        const { text } = this.state;
        return ( <
            View style = { styles.container } >
            <
            TextInput value = { text }
            autoCorrect = { false }
            placeholder = { placeholder }
            placeholderTextColor = "white"
            style = { styles.textInput }
            clearButtonMode = "always"
            onSubmitEditing = { this.handleSubmitEditing }
            onChangeText = { this.handleChangeText }
            underlineColorAndroid = "transparent" //  remove the dark
            //underline that shows by default on Android.
            /
            >
            <
            /View>
        );
    }
}
SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
SearchInput.defaultProps = {
    placeholder: '',
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#666',
        color: 'white',
        height: 40,
        width: 300,
        marginTop: 20,
        marginHorizontal: 20, //has the same effect as setting both marginLeft and marginRight.
        paddingHorizontal: 10, //like setting both of paddingLeft and paddingRight
        alignSelf: 'center', //put in center
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white'
    }
})