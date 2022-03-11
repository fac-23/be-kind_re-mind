import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faChartColumn,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const record = {
  route: "/record",
  icon: faChartColumn,
  label: "record",
};

const house = {
  route: "/home",
  icon: faHouseChimney,
  label: "home",
};

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledLogOut = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;

  & > button {
    margin: 0 auto;
    background: var(--color-two);
    box-shadow: var(--box-shadow);
    border-radius: 5px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: block;
    font-family: var(--heading-font);
    font-size: 1.2rem;
    line-height: 20px;
    list-style: none;
    outline: none;
    padding: 0.5rem;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    border: none;
    width: 100%;

    & :hover {
      background: #cc8c10;
      transform: scale(0.99);
    }
  }
`;

export default function Layout({ home, children }) {
  return (
    <div>
      <Head>
        <title>Be-Kind Re-Mind</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <header>
        {home ? (
          <div className="flexbox-center-col">
            <FlexRowDiv>
              <Link href="/record">
                <a>
                  <FontAwesomeIcon
                    className="icons"
                    size="lg"
                    icon={record.icon}
                  />
                </a>
              </Link>
              <Image
                src="/logo.svg"
                alt="bekind remind logo"
                width="120px"
                height="120px"
              ></Image>
              <Link href="/medication">
                <a>
                  <FontAwesomeIcon className="icons" size="lg" icon={faPills} />
                </a>
              </Link>
            </FlexRowDiv>
          </div>
        ) : (
          <div className="flexbox-center-col">
            <FlexRowDiv>
              <Link href="/record">
                <a>
                  <FontAwesomeIcon
                    className="icons"
                    size="lg"
                    icon={record.icon}
                  />
                </a>
              </Link>
              <Image
                src="/logo.svg"
                alt="bekind remind logo"
                width="120px"
                height="120px"
              ></Image>
              <Link href="/home">
                <a>
                  <FontAwesomeIcon
                    className="icons"
                    size="lg"
                    icon={house.icon}
                  />
                </a>
              </Link>
            </FlexRowDiv>
          </div>
        )}
      </header>

      <main>{children}</main>
      <StyledLogOut method="POST" action="/api/log-out">
        <button id="logout">Log out</button>
      </StyledLogOut>
    </div>
  );
}
