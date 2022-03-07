import styled from "styled-components";

export const Button = styled.button`
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: var(--heading-font);
  font-size: 1.2rem;
  line-height: 20px;
  list-style: none;
  margin: 10px auto;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  border: none;
  width: 100%;
  background-color: var(--color-one);
  ${(p) => p.secondary && `background-color: var(--color-two);`}
`;
