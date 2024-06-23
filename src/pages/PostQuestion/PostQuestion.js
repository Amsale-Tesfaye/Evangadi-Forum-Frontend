import axios from '../../axiosConfig';
import React, { useRef } from 'react'
import classes from "./PostQuestion.module.css"
import Header from '../Header/Header';


function PostQuestion() {
const titleDom = useRef();
const descriptionDom = useRef();

async function handleSubmit(e) {

    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    console.log(titleValue)


     if (!titleValue || !descriptionValue) {
       alert("Please provide all required information");
       return;
     } 
     try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(
          "/questions/post-question",
          {
            title: titleValue,
            description: descriptionValue,
          },
          config
        );
        alert("Your question has been posted");
     } catch (error) { 
        console.log()
     }
}
  return (
    <section className={classes.container}>
      <Header />
      <div className={classes.steps_container}>
        <h3 className={classes.steps_heading}>
             Steps To Write A Good Question
        </h3>
       
        <ul className={classes.steps_list}>
          <li> Summarize your question in one line</li>
          <li> Describe your question in more detal</li>
          <li> Describe what you tried and what you expected to happen</li>
          <li> Review your question</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className={classes.form}>
        <h2 className={classes.form_heading}>Ask a public Question</h2>
        <p>Go to Question page</p>
        <input
          ref={titleDom}
          type="text"
          size="99"
          placeholder="Enter title"
          className={classes.input_field}
        />
        <textarea
          ref={descriptionDom}
          rows="5"
          cols="97"
          placeholder="Enter description"
          className={classes.textarea}
        ></textarea>
       
        <button type="submit" className={classes.submit_button}>
          Post Your Question
        </button>
      </form>
    </section>
  );
}

export default PostQuestion