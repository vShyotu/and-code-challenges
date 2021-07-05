const { sayLines } = require("./sayLines");
const app = require("./app");

jest.mock("fs", () => ({ readFileSync: () => "00:00\n00:01\n00:02" }));
jest.mock("./sayLines");

describe("app", () => {
  it("should take in a file full of times and output them in speaking clock format, then say them aloud", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    await app();

    expect(consoleSpy).toHaveBeenCalledWith("\nText Output: ");
    expect(consoleSpy).toHaveBeenCalledWith(`It's twelve a.m.`);
    expect(consoleSpy).toHaveBeenCalledWith(`It's twelve o' one a.m.`);
    expect(consoleSpy).toHaveBeenCalledWith(`It's twelve o' two a.m.`);
    expect(consoleSpy).toHaveBeenCalledWith("\nAudio Output: ");
    expect(sayLines).toHaveBeenCalledWith([
      `It's twelve a.m.`,
      `It's twelve o' one a.m.`,
      `It's twelve o' two a.m.`,
    ]);

    consoleSpy.mockRestore();
  });
});
