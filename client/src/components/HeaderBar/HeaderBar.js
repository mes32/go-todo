import React from 'react';
import HeaderBarStyled from './style';
import PropTypes from 'prop-types';

import Date from '../../classes/Date';

function HeaderBar(props) {
    const renderRemaining = () => {
        if (props.totalTasks && props.remainingTasks) {
            return (<h3>{props.remainingTasks} of {props.totalTasks} Tasks Remain</h3>);
        } else {
            return (<h3>? of ? Tasks Remain</h3>);
        }
    }

    return (
        <HeaderBarStyled props={props}>
            <h1>◀ {props.date.formatHeader()} ▶</h1>
            {renderRemaining()}
            <p>+ Task Group</p>
        </HeaderBarStyled>
    );
}

HeaderBar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    nextDay: PropTypes.func.isRequired,
    prevDay: PropTypes.func.isRequired,
    totalTasks: PropTypes.number,
    remainingTasks: PropTypes.number
};

export default HeaderBar;
