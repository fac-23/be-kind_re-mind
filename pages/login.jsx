import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #009444;

  &:hover {
    background-color: blue;
  }

  &:link {
    background-color: blue;
  }
`;

export default function Login() {
  return (
    <div>
      <h1>Log in</h1>
      <form action="/api/log-in" method="POST">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <StyledButton className="button">Log in</StyledButton>
      </form>
      <Link href={"/"}>
        <a>Back to landing page</a>
      </Link>
    </div>
  );
}
