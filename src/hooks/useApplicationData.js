import { useState, useEffect } from 'react';
import axios from 'axios';

import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = (state, appointments) => {
    const appointmentsArray = getAppointmentsForDay(
      { ...state, appointments }, state.day
    );

    const newSpots = appointmentsArray.reduce(
      (count, appointment) => (!appointment.interview ? (count += 1) : count),
      0
    );

    return [...state.days].map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: newSpots };
      }
      return day;
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

    ]).then((all) => {
      console.log("-----------:", all[0])
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  async function bookInterview(id, interview) {
    // console.log("+++++++++++:", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(
      (res) => {
        setState({ ...state, appointments });
      })
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
      (res) => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      })
  }
  return { state, setDay, bookInterview, cancelInterview };
}
