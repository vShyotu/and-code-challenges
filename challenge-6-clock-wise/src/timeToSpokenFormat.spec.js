const { timeToSpokenFormat } = require("./timeToSpokenFormat");

describe("timeToSpokenFormat", () => {
  it.each([
    ["00:00", `It's twelve a.m.`],
    ["01:00", `It's one a.m.`],
    ["12:00", `It's twelve p.m.`],
    ["13:00", `It's one p.m.`],
    ["00:01", `It's twelve o' one a.m.`],
    ["01:10", `It's one ten a.m.`],
    ["00:21", `It's twelve twenty one a.m.`],
    ["16:54", `It's four fifty four p.m.`],
    // Input cases (that weren't covered)
    ["16:22", `It's four twenty two p.m.`],
    ["20:01", `It's eight o' one p.m.`],
    ["19:18", `It's seven eighteen p.m.`],
    ["06:00", `It's six a.m.`],
    ["09:09", `It's nine o' nine a.m.`],
    ["13:40", `It's one forty p.m.`],
    ["03:59", `It's three fifty nine a.m.`],
  ])(
    "should convert the time into spoken format - Case: %s - %s",
    (input, expected) => {
      const result = timeToSpokenFormat(input);

      expect(result).toBe(expected);
    }
  );
});
