import { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventSnapshot = {
      type: e.type,
      timeStamp: e.timeStamp,
      target: (e.target as HTMLElement).outerHTML,
      currentTarget: (e.currentTarget as HTMLElement).outerHTML,
      button: e.button,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    };

    setEvent(eventSnapshot);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
