import React, { useState, useRef } from "react";

import styles from "./FormStyles.module.css";
import styled from "styled-components";

const ErrorWrapper = styled.p`
  color: red;
`;
const SuccessWrapper = styled.p`
  color: green;
`;

const Form = () => {
  // useRef
  const fullNameRef = useRef(null);
  const fullNameRefError = useRef(null);
  const emailRef = useRef(null);
  const emailRefError = useRef(null);
  const bioRef = useRef(null);
  const bioRefError = useRef(null);
  const genderErrorRef = useRef(null);
  const checkedRef = useRef(null);
  const checkedRefError = useRef(null);
  const successRef = useRef(null);
  // useState
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    bio: "",
    gender: "",
  });
  const [checkbox, setCheckbox] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { fullName, email, bio, gender } = formValues;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let check = 0;
    // Client validation
    if (fullNameRef.current) {
      if (fullNameRef.current.value === "") {
        fullNameRefError.current.textContent = "Field required";
        fullNameRef.current.style.border = "1px solid red";
      } else {
        fullNameRefError.current.textContent = "";
        fullNameRef.current.style.border = "none";
        check++;
      }
    }
    if (emailRef.current) {
      if (emailRef.current.value === "") {
        emailRefError.current.textContent = "Field required";
        emailRef.current.style.border = "1px solid red";
      } else {
        emailRefError.current.textContent = "";
        emailRef.current.style.border = "none";
        check++;
      }
    }
    if (bioRef.current) {
      if (bioRef.current.value === "") {
        bioRefError.current.textContent = "Field required";
        bioRef.current.style.border = "1px solid red";
      } else {
        bioRefError.current.textContent = "";
        bioRef.current.style.border = "none";
        check++;
      }
    }
    if (gender === "") {
      genderErrorRef.current.textContent = "Field required";
    } else {
      genderErrorRef.current.textContent = "";
      check++;
    }
    if (checkedRef.current) {
      if (checkedRef.current.checked === true) {
        checkedRefError.current.textContent = "";
        check++;
      } else {
        checkedRefError.current.textContent = "Field required";
      }
    }
    // Final validation and 'data' object
    if (check === 5) {
      successRef.current.textContent = "Thank you for submitting your data!";
      const data = {
        "Full name": fullName,
        "E-mail": email,
        Bio: bio,
        Gender: gender,
        Terms: checkbox,
      };
      console.log(data);
      // Clear form
      setFormValues({
        fullName: "",
        email: "",
        bio: "",
        gender: "",
      });
      setCheckbox(false);
      setIsDisabled(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.containerForm}>
      <label htmlFor="fullName">Full Name:</label>
      <input
        id={styles.fullName}
        type="text"
        ref={fullNameRef}
        name="fullName"
        value={fullName}
        onChange={handleChange}
      />
      <ErrorWrapper ref={fullNameRefError}></ErrorWrapper>
      <label htmlFor="email">E-mail:</label>
      <input
        id={styles.email}
        type="text"
        ref={emailRef}
        name="email"
        value={email}
        onChange={handleChange}
      />
      <ErrorWrapper ref={emailRefError}></ErrorWrapper>
      <label htmlFor="bio">Provide more information about yourself:</label>
      <textarea
        id={styles.bio}
        rows="5"
        cols="30"
        ref={bioRef}
        name="bio"
        value={bio}
        onChange={handleChange}
      ></textarea>
      <ErrorWrapper ref={bioRefError}></ErrorWrapper>
      <div>
        <input
          id="gender-male"
          type="radio"
          name="gender"
          checked={gender === "Male" ? true : false}
          value="Male"
          onChange={handleChange}
        />
        <label htmlFor="gender-male">Male</label>
        <input
          id="gender-female"
          type="radio"
          name="gender"
          checked={gender === "Female" ? true : false}
          value="Female"
          onChange={handleChange}
        />
        <label htmlFor="gender-female">Female</label>
      </div>
      <ErrorWrapper ref={genderErrorRef}></ErrorWrapper>
      <div>
        <input
          id="terms"
          type="checkbox"
          ref={checkedRef}
          name="terms"
          checked={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}
        />
        <label htmlFor="terms">I agree to the Terms & Conditions</label>
      </div>
      <ErrorWrapper ref={checkedRefError}></ErrorWrapper>
      <button type="submit" disabled={isDisabled}>
        Send
      </button>
      <SuccessWrapper ref={successRef}></SuccessWrapper>
    </form>
  );
};

export default Form;
