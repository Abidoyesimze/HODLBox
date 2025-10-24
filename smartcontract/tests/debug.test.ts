import { describe, it, expect } from 'vitest';

describe("Debug simnet", () => {
  it("should show simnet structure", async () => {
    console.log("simnet:", simnet);
    console.log("simnet keys:", Object.keys(simnet));
    expect(true).toBe(true);
  });
});
