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
      </Head>
      <header>
        {home ? (
          <div>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/history">
              <a>Calendar</a>
            </Link>
            <Link href="/medication">
              <a>Medication</a>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/history">
              <a>Calendar</a>
            </Link>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </div>
        )}
      </header>
      <form method="POST" action="/api/log-out">
        <button>Log out</button>
      </form>
      <main>{children}</main>
    </div>
  );
}
