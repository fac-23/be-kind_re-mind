import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ home, children }) {
  return (
    <div>
      <Head>
        <title>Be-Kind Re-Mind</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
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
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/record">
              <a>Record</a>
            </Link>
            <Link href="/medication">
              <a>Medication</a>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/record">
              <a>Record</a>
            </Link>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </div>
        )}
      </header>
      <form method="POST" action="/api/log-out">
        <button id="logout">Log out</button>
      </form>
      <main>{children}</main>
    </div>
  );
}
