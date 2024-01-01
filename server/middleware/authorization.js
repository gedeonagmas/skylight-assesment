const { db } = require('../config/mysql');
const AppError = require('../utils/AppError');

exports.authorization = async (req, res, next) => {
  const sql = 'SELECT * FROM `skylight`.`permission` WHERE (`adminId`=?)';
  const message = 'you are not authorized to perform this action';
  if (req.user.role === 'superAdmin') {
    return next();
  } else if (req.user.role === 'admin') {
    db.query(sql, [req.user.id], (err, result) => {
      if (err) {
        return next(
          new AppError('something went wrong Unable to get permission', 404)
        );
      } else {
        switch (req.method) {
          case 'GET': 
            if (result[0]?.read === 1) {
              return next();
            } else {
              return next(
                new AppError(
                  message,
                  404
                )
              );
            }
          case 'POST':
            if (result[0]?.create === 1) {
              return next();
            } else {
              return next(
                new AppError(
                  message,
                  404
                )
              );
            }
          case 'PUT':
            if (result[0]?.update === 1) {
              return next();
            } else {
              return next(
                new AppError(
                  message,
                  404
                )
              );
            }
          case 'DELETE':
            if (result[0]?.deletePer === 1) {
              return next();
            } else {
              return next(
                new AppError(
                  message,
                  404
                )
              );
            }
        }
      }
    });
  } else if (req.user.role === 'user') {
    if (req.method === 'GET') {
      return next();
    } else {
      return next(
        new AppError(message, 404)
      );
    }
  } else {
    return next(
      new AppError(message, 404)
    );
  }
};
