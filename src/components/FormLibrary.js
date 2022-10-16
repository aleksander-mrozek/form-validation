import { React, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./FormStyles.module.css";
import styled from "styled-components";

const ErrorWrapper = styled.p`
  color: red;
`;
const SuccessWrapper = styled.p`
  color: green;
`;

function FormLibrary() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsDisabled(true);
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerForm}>
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        name="fullName"
        id={styles.fullName}
        style={{ border: errors.fullName ? "1px solid red" : "" }}
        {...register("fullName", {
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors?.fullName?.type === "required" && (
        <ErrorWrapper>This field is required!</ErrorWrapper>
      )}
      {errors?.fullName?.type === "pattern" && (
        <ErrorWrapper>Alphabetical characters only!</ErrorWrapper>
      )}

      <label htmlFor="email">E-mail:</label>
      <input
        type="text"
        name="email"
        id={styles.email}
        style={{ border: errors.email ? "1px solid red" : "" }}
        {...register("email", {
          required: true,
          pattern: emailRegex,
        })}
      />
      {errors?.email?.type === "required" && (
        <ErrorWrapper>This field is required!</ErrorWrapper>
      )}
      {errors?.email?.type === "pattern" && (
        <ErrorWrapper>Please use valid e-mail address!</ErrorWrapper>
      )}

      <label htmlFor="bio">Provide more information about yourself:</label>
      <textarea
        id={styles.bio}
        rows="5"
        cols="30"
        name="bio"
        style={{ border: errors.bio ? "1px solid red" : "" }}
        {...register("bio", { required: true })}
      ></textarea>
      {errors?.bio?.type === "required" && (
        <ErrorWrapper>This field is required!</ErrorWrapper>
      )}

      <div>
        <input
          id="gender-male"
          type="radio"
          name="gender"
          value="Male"
          {...register("gender", { required: true })}
        />
        <label htmlFor="gender-male">Male</label>
        <input
          id="gender-female"
          type="radio"
          name="gender"
          value="Female"
          {...register("gender", { required: true })}
        />
        <label htmlFor="gender-female">Female</label>
      </div>
      {errors?.gender?.type === "required" && (
        <ErrorWrapper>This field is required!</ErrorWrapper>
      )}

      <div>
        <input
          id="terms"
          type="checkbox"
          {...register("terms", { required: true })}
        />
        <label htmlFor="terms">I agree to the Terms & Conditions</label>
      </div>
      {errors?.terms?.type === "required" && (
        <ErrorWrapper>This field is required!</ErrorWrapper>
      )}

      <button type="submit" disabled={isDisabled}>
        Send
      </button>
      {isDisabled && (
        <SuccessWrapper>Thank you for submitting your data!</SuccessWrapper>
      )}
    </form>
  );
}

export default FormLibrary;
