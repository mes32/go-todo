import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function CheckBox({ checked = false, onChange }) {
    return (
        <StyledInput type="checkbox" checked={checked} onChange={onChange} />
    );
}

CheckBox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

const StyledInput = styled.input`

`;

export default CheckBox;