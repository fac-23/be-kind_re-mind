import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const StyledLogin = styled.a`
  background: var(--color-one);

  & :hover {
    background: #025c2b;
    transform: scale(1.02);
  }
`;

const StyledSignUp = styled.a`
  background: var(--color-two);

  & :hover {
    background: #cc8c10;
    transform: scale(1.02);
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  max-width: 30%;
  width: 100%;
  margin: 1rem auto;
`;

export default function Home() {
  return (
    <StyledDiv>
      <Image
        src="/logo.svg"
        alt="bekind remind logo"
        width="200px"
        height="200px"
      ></Image>
      <Link href="/login" passHref>
        <StyledLogin className="button">Log in</StyledLogin>
      </Link>
      <Link href="/signup" passHref>
        <StyledSignUp className="button">Sign up</StyledSignUp>
      </Link>
    </StyledDiv>
  );
}
