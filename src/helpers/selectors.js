
export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  const [getAppointmentsForDay] = state.days.filter((data) => data.name === day);
  // maybe refactor and use map? insted of filter?
  if (!getAppointmentsForDay) {
    return [];
  } else {
    const appointments = getAppointmentsForDay.appointments.filter(
      (id) => id === state.appointments[id].id
    );
    appointments.forEach((appointment) =>
      appointmentsArray.push(state.appointments[appointment])
    );
    return appointmentsArray;
  }
}





// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }