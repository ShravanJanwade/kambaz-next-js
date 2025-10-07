"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function PiazzaPage() {
  const params = useParams();
  const cid = params?.cid;
  return (
    <main style={{ padding: 20 }}>
      <h1>Piazza</h1>
      <p>Basic Piazza placeholder page.</p>
      <Link href={`/Courses/${cid}/Home`}>← Back to courses</Link>
    </main>
  );
}
