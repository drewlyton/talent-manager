import type { CreatorSize } from "@/components/landing/Negotiate";

function randomBuffer(input: number, minPercent: number, maxPercent: number) {
  return input * (Math.random() * (maxPercent - minPercent) + minPercent);
}

const defaultMinRate = {
  big: 5300,
  mid: 2200,
  small: 1900,
} as const;

const defaultMaxRate = {
  big: 7300,
  mid: 2900,
  small: 2300,
} as const;

export function calculateRange(
  rate: number,
  minRate: number,
  profile: CreatorSize,
) {
  let acceptableMinimum =
    Math.ceil(
      Math.max(
        // Min rate + 2.5-15%
        randomBuffer(minRate, 1.025, 1.15),
        // Input rate - 2.5-15%
        randomBuffer(rate, 0.975, 0.85),
        // Default min +/- 2.5-15%
        randomBuffer(defaultMinRate[profile], 1.025, 1.15),
      ) / 100,
    ) * 100;
  let acceptableMaximum =
    Math.ceil(
      Math.max(
        // Min rate +/- 5-20%
        randomBuffer(acceptableMinimum, 1.25, 1.4),
        // Input rate +/- 2.5-15%
        randomBuffer(rate, 1.17, 1.35),
        // Default min +/- 5-15%
        randomBuffer(defaultMaxRate[profile], 1.025, 1.15),
      ) / 100,
    ) * 100;
  return [acceptableMinimum, acceptableMaximum];
}
