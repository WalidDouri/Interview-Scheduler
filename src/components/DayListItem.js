import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = spots => {
  if (!spots) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `${spots} spot remaining`;
  }
  return `${spots} spots remaining`;
}


export default function DayListItem(props) {
  const msg = formatSpots(props.spots);
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })
  //day-list__item all the time
  // day-list__item--selected class name if props.selected is true
  // day-list__item--full class name if props.spots is 0.

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{msg}</h3>
    </li>
  );
}