"use client";

import { useState } from "react";

import { Button } from "@/components/buttons/Button";
import { GITHUB_PROTOCOL_URL } from "@/lib/constants";

const topics = [
  "Using the SDK",
  "Running a node",
  "Security report",
  "Protocol question",
  "Something else",
] as const;

const field =
  "h-[38px] rounded-[8px] border border-line bg-line-strong px-3 text-sm text-fg placeholder:text-subtle";

function Field({
  label,
  children,
  span = false,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${span ? "sm:col-span-2" : ""}`}>
      <span className="text-base font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

/**
 * There is no backend yet, so the form composes a prefilled GitHub issue and the
 * visitor sends it themselves. The destination is shown before anything opens.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>(topics[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");

  const issueUrl = (() => {
    const url = new URL(`${GITHUB_PROTOCOL_URL}/issues/new`);
    url.searchParams.set("title", subject || topic);
    url.searchParams.set(
      "body",
      [`Topic: ${topic}`, handle ? `Contact: ${handle}` : null, "", message]
        .filter((line) => line !== null)
        .join("\n"),
    );
    return url.toString();
  })();

  return (
    <form
      className="relative z-[3] grid grid-cols-1 gap-6 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(issueUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <Field label="Topic">
        <select
          className={field}
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          name="topic"
        >
          {topics.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="GitHub handle or email (optional)">
        <input
          className={field}
          name="contact"
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          placeholder="@you"
          autoComplete="email"
        />
      </Field>
      <Field label="Subject" span>
        <input
          className={field}
          name="subject"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="What is this about?"
        />
      </Field>
      <Field label="Message" span>
        <textarea
          className={`${field} h-[140px] resize-y py-2.5`}
          name="message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Include the command, the cluster, and what you expected."
        />
      </Field>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <Button type="submit">Open a prefilled issue</Button>
        <p className="text-sm text-subtle">
          This page has no mailbox. The button opens a new GitHub issue on the protocol repository
          with the fields above filled in, and you post it from there. For a suspected
          vulnerability, use the repository&rsquo;s private advisory form instead of a public issue.
        </p>
      </div>
    </form>
  );
}
