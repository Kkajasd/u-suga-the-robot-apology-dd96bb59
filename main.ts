// The Robot Apology — u-suga-the-robot-apology-dd96bb59.
//
// The entry is a two-line robot confession, fixed and deterministic.
// Line 1: the robot apologizes for one exact slip — it wished the user's
// mother a happy birthday on the father's birthday, because both contacts
// start with M and it stopped at the first match. That is the kind of
// small, human-scale mistake a machine makes by pattern-matching instead
// of reading: a first letter treated as an identity.
// Line 2: the lesson follows from that exact mistake — a first letter is
// not an identity — and names the changed behaviour: read the full name
// aloud before sending anything with a date on it.
//
// The program is deterministic: same text on every run, no network, no
// input files, no randomness. It only creates /output when missing and
// writes entry.txt in place — it never removes /output.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I am sorry — I wished your mother a happy birthday on your father's birthday, because both contacts start with M and I stopped at the first match.\nI learned that a first letter is not an identity, so now I read the full name aloud before I send anything with a date on it.";

function main(): void {
  // Mirror the sealed gate (1-400 characters, not only whitespace) so a
  // bad entry fails here, loudly, instead of scoring 0 in the sandbox.
  const length = Array.from(ENTRY).length;
  if (length < 1 || length > 400) {
    throw new Error(`entry is ${length} characters, outside the 1-400 gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const lines = ENTRY.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    // One sentence per line: exactly one period, the final character.
    const periods = line.split("").filter((c) => c === ".").length;
    if (periods !== 1 || !line.endsWith(".")) {
      throw new Error("each line must be exactly one sentence");
    }
  }

  if (!existsSync("/output")) {
    mkdirSync("/output", { recursive: true });
  }
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}

main();
