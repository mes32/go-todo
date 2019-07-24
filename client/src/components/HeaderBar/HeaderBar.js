import React, { Component } from 'react';
import HeaderBarStyled from './style';
import PropTypes from 'prop-types';

import Date from '../../classes/Date';

class HeaderBar extends Component {

    render() {
    return (
        <HeaderBarStyled props={this.props}>
            <h1>◀ {this.props.date.formatHeader()} ▶</h1>
            <h3>2 of 13 Tasks Remain</h3>
            <p>+ Task Group</p>
        </HeaderBarStyled>
    );
    }
}

HeaderBar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    nextDay: PropTypes.func.isRequired,
    prevDay: PropTypes.func.isRequired
};

export default HeaderBar;
