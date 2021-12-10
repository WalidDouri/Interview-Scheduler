import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(dayObj => {
 
    return (
      <DayListItem
      key={props.id} 
      name={props.name} 
      spots={props.spots} 
      selected={props.name === props.value}
      setDay={props.onChange}
     />
    )
  })
  return <ul>{schedule}</ul>
}