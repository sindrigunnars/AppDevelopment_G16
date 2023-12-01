import React, { useMemo } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import PropTypes from 'prop-types';

const SortingButtons = (selectedId, setSelectedId) => {
    console.log(setSelectedId);
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Default ',
            value: 'default',
            selected: true
        },
        {
            id: '2',
            label: 'Alphabetical',
            value: 'alphabetical'
        }
    ]), []);

    return (
        <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            layout='row'
        />
    );
};

SortingButtons.propTypes = {
    selectedId: PropTypes.string.isRequired,
    setSelectedId: PropTypes.func.isRequired
};

export default SortingButtons;
