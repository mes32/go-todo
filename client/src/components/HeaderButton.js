import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function HeaderButton({ value, onClick }) {
    return (
        <StyledButton onClick={onClick}>
            {value}
        </StyledButton>
    )
}

HeaderButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const StyledButton = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    vertical-align: center;

    font-size: 1rem;

    color: inherit;
    background-color: rgba(255, 255, 255, 0.08);
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 4px;

    -webkit-box-shadow: 4px 4px 6px -2px rgba(0,0,0,0.3);
    -moz-box-shadow: 4px 4px 6px -2px rgba(0,0,0,0.3);
    box-shadow: 4px 4px 6px -2px rgba(0,0,0,0.3);

    &:hover {
        background-color: rgba(255, 255, 255, 0.09);
        border: 3px solid rgba(255, 255, 255, 0.05);
    }

    &:active {
        position: relative;
        top: 2px;
        left: 2px;

        -webkit-box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3);
        -moz-box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3);
        box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3);
    }
`;

export default HeaderButton;