import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  const formatSpots = spots => {
    if (!spots) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return `${spots} spots remaining`;
  }
  
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}