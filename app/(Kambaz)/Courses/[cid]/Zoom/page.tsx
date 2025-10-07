"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ZoomPage() {
  const params = useParams();
  const cid = params?.cid;
  return (
    <main style={{ padding: 20 }}>
      <h1>Zoom</h1>
      <p>This is a placeholder Zoom page for the course.</p>
      <Link href={`/Courses/${cid}/Home`}>← Back to courses</Link>
    </main>
  );
}
