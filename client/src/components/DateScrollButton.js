import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function DateScrollButton({ direction, onClick }) {
    return (
        <StyledButton onClick={onClick}>
            {direction === 'left' ? (<LeftTriangle />) : (<RightTriangle />) }
        </StyledButton>
    )
}

DateScrollButton.propTypes = {
    direction: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const StyledButton = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    vertical-align: center;

    height: 140px;
    width: 50px;
    padding-bottom: 10px;

    color: inherit;
    background-color: rgba(255, 255, 255, 0.08);
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 10px;
    box-shadow: 4px 4px 6px -2px rgba(0,0,0,0.3);

    &:hover {
        background-color: rgba(255, 255, 255, 0.09);
        border: 3px solid rgba(255, 255, 255, 0.05);
    }

    &:active {
        position: relative;
        top: 2px;
        left: 2px;
        box-shadow: 2px 2px 6px -2px rgba(0,0,0,0.3);
    }
`;

const LeftTriangle = styled.span`
    border-top: 10px solid transparent;
    border-right: 20px solid rgba(255, 255, 255, 0.9);
    border-bottom: 10px solid transparent;
    border-radius: 2px;
    font-size: 0rem;
`;

const RightTriangle = styled.span`
    border-top: 10px solid transparent;
    border-left: 20px solid rgba(255, 255, 255, 0.9);
    border-bottom: 10px solid transparent;
    border-radius: 2px;
    font-size: 0rem;
`;

export default DateScrollButton;