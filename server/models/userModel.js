const { ObjectId } = require("mongodb");

class User {
  constructor(username, email, passwordHash, country = "Canada") {
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.country = country;
  }
}
module.exports = User;
