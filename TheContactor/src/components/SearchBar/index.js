import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button, Keyboard } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import styles from './styles';

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
