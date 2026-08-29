import { evaluatePasswordStrength } from "../component";

describe("evaluatePasswordStrength", () => {
  it("treats an empty password as very weak with no checks passed", () => {
    const r = evaluatePasswordStrength("");
    expect(r.score).toBe(0);
    expect(r.label).toBe("Very weak");
    expect(r.percent).toBe(0);
    expect(r.checks).toEqual({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      symbol: false,
    });
  });

  it("scores a short lowercase-only password as very weak", () => {
    expect(evaluatePasswordStrength("abc").score).toBe(0);
  });

  it("climbs the scale as more requirements are met", () => {
    expect(evaluatePasswordStrength("abcdefgh").label).toBe("Weak"); // length + lower
    expect(evaluatePasswordStrength("Abcdefgh").label).toBe("Fair"); // + upper
    expect(evaluatePasswordStrength("Abcdefg1").label).toBe("Strong"); // + number
  });

  it("gives a full score to a password meeting all five requirements", () => {
    const r = evaluatePasswordStrength("Abcdefg1!");
    expect(r.score).toBe(4);
    expect(r.label).toBe("Very strong");
    expect(r.percent).toBe(100);
    expect(r.checks).toEqual({
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      symbol: true,
    });
  });

  it("keeps percent equal to score * 25 within bounds", () => {
    for (const pw of ["", "a", "abcdefgh", "Abcdefg1", "Abcdefg1!"]) {
      const r = evaluatePasswordStrength(pw);
      expect(r.percent).toBe(r.score * 25);
      expect(r.percent).toBeGreaterThanOrEqual(0);
      expect(r.percent).toBeLessThanOrEqual(100);
    }
  });
});
