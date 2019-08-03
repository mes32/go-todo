import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function EditButton({ value, onClick }) {
    return (
        <StyledButton onClick={onClick}>
            {value}
        </StyledButton>
    )
}

EditButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const StyledButton = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    vertical-align: center;

    padding: 0.2rem 5px;

    font-size: 1rem;
    font-weight: 500;

    color: #373d3f;
    background-color: transparent;
    border: none;
    border-radius: 2px;

    &:hover {
        color: #408bf9;
        background-color: #e4ebf6;
    }

    &:active {
        background-color: #f0f0f0;
    }
`;

export default EditButton;