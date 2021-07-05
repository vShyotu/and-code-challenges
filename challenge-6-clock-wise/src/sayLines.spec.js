const { sayLines } = require("./sayLines");

const mockSpeak = jest.fn();

jest.mock("say", () => {
  return {
    speak: (text, voice, speed, callback) =>
      mockSpeak(text, voice, speed, callback),
  };
});

describe("sayLines", () => {
  it("should say each of the lines", async () => {
    mockSpeak.mockImplementation((text, voice, speed, callback) => {
      callback();
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const testLines = ["line1", "line2", "line3"];

    await sayLines(testLines);

    expect(mockSpeak).toHaveBeenCalledTimes(3);
    expect(mockSpeak).toHaveBeenCalledWith(
      "line1",
      null,
      null,
      expect.any(Function)
    );
    expect(mockSpeak).toHaveBeenCalledWith(
      "line2",
      null,
      null,
      expect.any(Function)
    );
    expect(mockSpeak).toHaveBeenCalledWith(
      "line3",
      null,
      null,
      expect.any(Function)
    );

    consoleSpy.mockRestore();
  });

  it("should log errors if it failed to speak any lines", async () => {
    mockSpeak.mockImplementation((text, voice, speed, callback) => {
      callback(true);
    });
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const testLines = ["line1", "line2", "line3"];

    await sayLines(testLines);

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith(
      `Error whilst trying to say line1`
    );
    expect(console.log).toHaveBeenCalledWith(
      `Error whilst trying to say line2`
    );
    expect(console.log).toHaveBeenCalledWith(
      `Error whilst trying to say line3`
    );

    consoleSpy.mockRestore();
  });
});
