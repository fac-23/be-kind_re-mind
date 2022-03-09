import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faChartColumn,
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
  }
`;

export default function Layout({ home, children }) {
  return (
    <div>
      <Head>
        <title>Be-Kind Re-Mind</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;1,700&family=Poppins:wght@300;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>
        {home ? (
          <div>
            <Image
              src="/logo.svg"
              alt="bekind remind logo"
              width="200px"
              height="200px"
            ></Image>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/record">
              <a>
                Record
                <FontAwesomeIcon
                  className="icons"
                  size="lg"
                  icon={record.icon}
                />
              </a>
            </Link>
            <Link href="/medication">
              <a>Medication</a>
            </Link>
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
