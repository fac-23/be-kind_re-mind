import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const StyledLogin = styled.a`
  background: #009444;

  & :hover {
    background: #025c2b;
  }
`;

const StyledSignUp = styled.a`
  background: #fbad17;

  & :hover {
    background: #cc8c10;
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
