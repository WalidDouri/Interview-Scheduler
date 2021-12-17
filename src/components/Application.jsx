// import React from "react";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

// import useVisualMode from "./useVisualMode";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

  
export default function Application(props) {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
  
    const setDay = day => setState({ ...state, day });
    // const setDays = days => setState(prev => ({ ...prev, days }));

    //implement try catch functions in future refactors
    useEffect(() => {
      Promise.all([
       axios.get('http://localhost:8001/api/days'),
       axios.get('http://localhost:8001/api/appointments'),
       axios.get('http://localhost:8001/api/interviewers')
       
      ]).then((all) => {
        console.log("-----------:",all[0])
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
    }, [])
  
    //Add the line below:
    const appointments = getAppointmentsForDay(state, state.day)

    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
    
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          bookInterview={bookInterview}
          interviewers={getInterviewersForDay(state, state.day)}
          cancelInterview={cancelInterview}
        />
      );
    });


    async function bookInterview(id, interview) {
      console.log("+++++++++++:",id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }

      return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(
        (res) => {setState({...state, appointments});
      });
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
        (res) => {setState({...state, appointments});
      });
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          value={state.day} 
          onChange={setDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview} 
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
