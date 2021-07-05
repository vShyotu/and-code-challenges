const say = require("say");

const sayLines = async (lines) => {
  for (line of lines) {
    try {
      await new Promise((resolve, reject) => {
        say.speak(line, null, null, (err) => {
          if (err) {
            reject(false);
            return;
          }

          console.log("Finished saying:", line);
          resolve(true);
        });
      });
    } catch (e) {
      console.log(`Error whilst trying to say ${line}`);
    }
  }
};

module.exports = { sayLines };
