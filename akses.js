const config = require("../config");

function isOwner(userId) {
  return config.OWNER_IDS.includes(userId);
}

function isPremium(userId) {
  return config.PREMIUM_USERS.includes(userId);
}

module.exports = {
  isOwner,
  isPremium
};

