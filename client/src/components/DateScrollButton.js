import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ButtonStyle } from './Button';

function DateScrollButton({ value, onClick }) {
    return (
        <StyledInput type="button" value={value} onClick={onClick} />
    )
}

DateScrollButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const StyledInput = styled(ButtonStyle)`
    height: 100%;
`;

export default DateScrollButton;