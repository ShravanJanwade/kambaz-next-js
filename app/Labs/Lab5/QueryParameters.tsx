"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  const buildHref = (op: string) =>
    `${HTTP_SERVER}/lab5/calculator?operation=${encodeURIComponent(
      op
    )}&a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      <label htmlFor="wd-query-parameter-a">a</label>
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        value={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
      />

      <label htmlFor="wd-query-parameter-b">b</label>
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        value={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
      />

      <div className="d-flex flex-column gap-1">
        <a
          id="wd-query-parameter-add"
          href={buildHref("add")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add {a} + {b}
        </a>

        <a
          id="wd-query-parameter-subtract"
          href={buildHref("subtract")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Subtract {a} - {b}
        </a>

        <a
          id="wd-query-parameter-multiply"
          href={buildHref("multiply")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Multiply {a} × {b}
        </a>

        <a
          id="wd-query-parameter-divide"
          href={buildHref("divide")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Divide {a} ÷ {b}
        </a>
      </div>

      <hr />
      <p>
        Server: <code>{HTTP_SERVER}</code>
      </p>
    </div>
  );
}
