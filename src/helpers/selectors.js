export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];

  const [getAppointmentsForDay] = state.days.filter((data) => data.name === day);

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

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];

  const [getInterviewersForDay] = state.days.filter((data) => data.name === day);

  if (!getInterviewersForDay) {
    return [];
  } else {
    const interviewers = getInterviewersForDay.interviewers.filter(
      (id) => id === state.appointments[id].id
    );
    interviewers.forEach((interviewer) =>
      interviewersArray.push(state.interviewers[interviewer])
    );
    return interviewersArray;
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewersIDs = state.interviewers[interview.interviewer];
    return {
      student: interview.student,
      interviewer: interviewersIDs
    };

  };
};