import Link from "next/link";
import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledCenterLogo = styled.h1`
  margin: 2rem auto;
`;

const StyledSignUp = styled.button`
  background: #009444;

  & :hover {
    background: #025c2b;
    transform: scale(1.02);
  }
`;

const StyledBackBtn = styled.a`
  background: #fbad17;

  & :hover {
    background: #cc8c10;
    transform: scale(1.02);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;

  & > input {
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 0.5px solid #009444;
    border-radius: 5px;
  }

  & > label {
    font-family: "Lora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1.2rem;
  }
`;

const StyledDiv = styled.div`
  max-width: 30%;
  width: 100%;
  margin: 1rem auto;
`;

export default function Signup() {
  return (
    <div className="flexbox-center-col">
      <StyledCenterLogo>
        <Image
          src="/logo.svg"
          alt="bekind remind logo"
          width="200px"
          height="200px"
        ></Image>
      </StyledCenterLogo>
      <StyledDiv>
        <StyledForm action="/api/sign-up" method="POST">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="phone">Phone Number</label>
          <input type="number" id="phone" name="phone" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <StyledSignUp type="submit" className="button">
            Sign up
          </StyledSignUp>
        </StyledForm>
        <Link href={"/"} passHref>
          <StyledBackBtn className="button">Back to landing page</StyledBackBtn>
        </Link>
      </StyledDiv>
    </div>
  );
}
