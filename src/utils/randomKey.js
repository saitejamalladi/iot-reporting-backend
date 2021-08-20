const crypto = require("crypto");

class RandomKeyService {
  generate(size) {
    return new Promise((resolve) => {
      if (!size || size <= 0 || size > 16) {
        size = 16;
      }
      crypto.randomBytes(size, (err, buffer) => {
        let meetingLink = buffer.toString("hex");
        let timestamp = new Date().getTime();
        meetingLink = meetingLink + timestamp;
        resolve(meetingLink);
      });
    });
  }
}
module.exports = new RandomKeyService();
