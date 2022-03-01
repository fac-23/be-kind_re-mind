import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/login">
        <a>Log in</a>
      </Link>
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
    </div>
  );
}
