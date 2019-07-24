import React from 'react';
import HeaderBarStyled from './style';

function HeaderBar(props) {
    return (
        <HeaderBarStyled props={props}>
            <h1>◀ {props.date.formatHeader()} ▶</h1>
            <h3>2 of 13 Tasks Remain</h3>
            <p>+ Task Group</p>
        </HeaderBarStyled>
    );
}

export default HeaderBar;
