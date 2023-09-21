import { test } from "vitest";
import { calculateRange } from "./calculateRange";

test("validateRate", () => {
  console.log("small", calculateRange(800, 1100, "small"));
  console.log("mid", calculateRange(2400, 2300, "mid"));
  console.log("big", calculateRange(2400, 2300, "big"));
});
