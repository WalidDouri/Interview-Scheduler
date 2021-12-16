import React from "react";

import 'components/Appointment/styles.scss';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Form from 'components/Appointment/Form';
// import Status from 'components/Appointment/Status';
// import Confirm from 'components/Appointment/Confirm';
// import Error from 'components/Appointment/Error';


import useVisualMode from "hooks/useVisualMode";
// import { remove } from "store2";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
// const SAVING = "SAVING";
// const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
// const EDIT = "EDIT";



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (<form
        interviewrs={[]}
        onCancel={() => back()}

      />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

    </article>
  )

};


///https://reactjs.org/docs/conditional-rendering.html
