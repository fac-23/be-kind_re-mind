import Head from "next/head";
import Link from "next/link";

export default function Layout({ home, children }) {
  console.log(home);
  return (
    <div>
      <Head>
        <title>Be-Kind Re-Mind</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        {home ? (
          <div>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/">
              <a>Calendar</a>
            </Link>
            <Link href="/medication">
              <a>Medication</a>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Be-Kind Re-Mind</h1>
            <Link href="/">
              <a>Calendar</a>
            </Link>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
