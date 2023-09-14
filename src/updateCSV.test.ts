import { test } from "vitest";
import { updateCSV } from "./updateCSV";

test("should make commit", async () => {
  const resp = await updateCSV("hello");
});
