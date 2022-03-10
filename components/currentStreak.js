import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function CurrentStreak({ currentStreak }) {
  return (
    <Link href="/record">
      <a>
        <div>
          <p>
            {" "}
            <FontAwesomeIcon className="iconTrophy" size="lg" icon={faTrophy} />
            Congratulations on your {currentStreak} day streak!
          </p>
        </div>
      </a>
    </Link>
  );
}
