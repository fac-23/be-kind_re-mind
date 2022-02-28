
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Link href="/home">
        <a>Sign in</a>
      </Link>
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
    </div>
  );
}
