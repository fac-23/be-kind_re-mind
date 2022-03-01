import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flexbox-center-col">
      <Image
        src="/logo.svg"
        alt="bekind remind logo"
        width="200px"
        height="200px"
      ></Image>
      <Link href="/home">
        <a>Sign in</a>
      </Link>
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
    </div>
  );
}
