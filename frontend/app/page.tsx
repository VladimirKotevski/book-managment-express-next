import Image from "next/image";
import styles from "./page.module.scss";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <Link legacyBehavior href="/books">
        <a>View Books</a>
      </Link>
      </div>
    </main>
  );
}
