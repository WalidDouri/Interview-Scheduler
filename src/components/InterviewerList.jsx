import React from 'react';
import 'components/InterviewerList';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
          //Refactoring? ^ and below speak with mentor regarding how its excuted.
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section> 
  );
}



// Our InterviewerList receives three props:

// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
// interviewer:number - a number that represents the id of the currently selected interviewer