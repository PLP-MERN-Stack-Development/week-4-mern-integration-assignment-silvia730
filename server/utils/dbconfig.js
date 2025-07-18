const encodeMongoURI = (username, password, cluster, dbName) => {
  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);
  return `mongodb+srv://${encodedUsername}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`;
};

module.exports = encodeMongoURI;