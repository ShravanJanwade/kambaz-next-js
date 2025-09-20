import Link from "next/link";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <section style={{ marginBottom: "20px" }}>
        <h2>Student Information</h2>
        <p>
          <h2>
            <strong>Name:</strong> Shravankumar Janawade <br />
          </h2>
          <h2>
            <strong>Section:</strong> CS5610 - SEC 04 Fall 2025
          </h2>
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h1>Labs</h1>
        <ul>
          <li>
            <Link href="/Labs/Lab1" id="wd-lab1-link">
              Lab 1: HTML Examples
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab2" id="wd-lab2-link">
              Lab 2: CSS Basics
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab3" id="wd-lab3-link">
              Lab 3: JavaScript Fundamentals
            </Link>
          </li>
        </ul>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h3>Kambaz Application</h3>
        <p>
          <Link href="/" id="wd-kambaz-link">
            Go to Kambaz Application
          </Link>
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <h3>Source Code Repositories</h3>
        <ul>
          <li>
            <a href="https://github.com/ShravanJanwade/kambaz-next-js">
              Kambaz Repository
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
