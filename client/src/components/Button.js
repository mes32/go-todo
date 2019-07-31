import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({ value, onClick }) {
    return (
        <StyledInput type="button" value={value} onClick={onClick} />
    )
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const StyledInput = styled.input`
    display: inline;
    background-color: inherit;
    outline: none;
    color: inherit;
    font-size: inherit;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    cursor: pointer;
`;

export default Button;
export { StyledInput as ButtonStyle };