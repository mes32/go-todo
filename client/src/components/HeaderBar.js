import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Date from '../classes/Date';

function HeaderBar(props) {
    const renderRemaining = () => {
        if (props.totalTasks && props.remainingTasks) {
            return (<h3>{props.remainingTasks} of {props.totalTasks} Tasks Remain</h3>);
        } else {
            return (<h3>? of ? Tasks Remain</h3>);
        }
    }

    return (
        <StyledHeader props={props}>
            <h1>◀ {props.date.formatHeader()} ▶</h1>
            {renderRemaining()}
            <p>+ Task Group</p>
        </StyledHeader>
    );
}

HeaderBar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    nextDay: PropTypes.func.isRequired,
    prevDay: PropTypes.func.isRequired,
    totalTasks: PropTypes.number,
    remainingTasks: PropTypes.number
};

const StyledHeader = styled.header`
    color: #cdc5cf;
    background-color: #584061;
    text-align: center;
    h1 {
        margin-top: 0;
    }
`;

export default HeaderBar;
