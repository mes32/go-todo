import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function CheckBox({ label, checked = false, onChange, color = '#2196F3' }) {
    return (
        <LabelContainer>
            {label}
            <HiddenInput type="checkbox" checked={checked} onChange={onChange} />
            <CustomCheckBox color={color} />
            <CheckMark />
        </LabelContainer>
    );
}

CheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string
}

const LabelContainer = styled.label`
    display: inline;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

`;

const HiddenInput = styled.input`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
`;

const CustomCheckBox = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: #eee;

    border: 3px solid ${props => props.color};
    border-radius: 6px;

    &:hover {
        background-color: #ccc;
    }

    ${HiddenInput}:checked ~ & {
        background-color: ${props => props.color};
    }
`;

const CheckMark = styled.div`
    position: absolute;
    display: none;
    left: 10px;
    top: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);

    ${HiddenInput}:checked ~ & {
        display: block;
    }
`;

export default CheckBox;