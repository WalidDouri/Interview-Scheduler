import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(day => {
 
    //review the input name convention
    return (
      <DayListItem
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={props.onChange}
     />
    )
  })
  return <ul>{schedule}</ul>
}