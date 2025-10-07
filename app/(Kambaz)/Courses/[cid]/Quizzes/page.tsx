"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function QuizzesPage() {
  const params = useParams();
  const cid = params?.cid;
  return (
    <main style={{ padding: 20 }}>
      <h1>Quizzes</h1>
      <p>Quizzes placeholder page.</p>
      <Link href={`/Courses/${cid}/Home`}>← Back to courses</Link>
    </main>
  );
}
