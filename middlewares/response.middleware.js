const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  // запутался с этим мидлваром :(
  // вроде как вместо того, чтобы делать одно и то же в роутингах нужно было сделать это тут
  next();
};

exports.responseMiddleware = responseMiddleware;
