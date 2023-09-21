import { test } from "vitest";
import { updateCSV } from "./updateCSV";

test.skip("should make commit", async () => {
  const resp = await updateCSV("hello");
});
