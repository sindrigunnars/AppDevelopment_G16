import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button, Keyboard, StyleSheet } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchTerm, clicked, setClicked }) => {
    return (
        <View style={styles.searchContainer}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchTerm}
                    onChangeText={onSearchTerm}
                    onFocus={() => {
                        setClicked(true);
                    }}
                    keyboardAppearance='dark'
                />
                {clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        onSearchTerm('');
                    }}/>
                )}
            </View>
            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                            onSearchTerm('');
                        }}
                    />
                </View>
            )}
        </View>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    clicked: PropTypes.bool.isRequired,
    setClicked: PropTypes.func.isRequired
};

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center'
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    searchInput: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%'
    }
});
