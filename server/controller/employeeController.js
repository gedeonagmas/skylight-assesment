const asyncCatch = require('express-async-catch');
const { db } = require('../config/mysql');
const AppError = require('../utils/AppError');

exports.getAllEmployee = asyncCatch((req, res, next) => {
  const sql = 'SELECT * FROM `skylight`.`users`';
  db.query(sql, (err, result) => {
    if (err)
      return next(
        new AppError('something went wrong Unable to get employee', 404)
      );
    return res.status(201).json(result);
  });
});
 
exports.updateEmployee = asyncCatch((req, res, next) => {
  const { fullName, email, userName, salary, position, phone, id } = req.body;
  const sql =
    'UPDATE `skylight`.`users` SET `fullName`=?, `userName`=?,`email`=?, `salary`=?,`position`=?, `phone`=? WHERE (`id`=?)';
  db.query(
    sql, 
    [fullName, userName, email, salary, position, phone, id],
    (err, result) => {
      if (err)
        return next(new AppError('something went wrong Unable to update', 404));
      return res.status(201).json({ message: 'successfully updated' });
    }
  );
});

exports.deleteEmployee = asyncCatch((req, res, next) => {
  const sql = 'DELETE FROM `skylight`.`users` WHERE (`id` = ?)';
  db.query(sql, [req.query.id], (err, result) => {
    if (err)
      return next(new AppError('something went wrong Unable to delete', 404));
    return res.status(201).json({ message: 'successfully deleted' });
  });
});

exports.getPermission = asyncCatch((req, res, next) => {
  const sql = 'SELECT * FROM `skylight`.`permission`';
  db.query(sql, (err, result) => {
    if (err)
      return next(
        new AppError('something went wrong Unable to get permission', 404)
      );
    return res.status(201).json(result);
  });
});

exports.updatePermission = asyncCatch((req, res, next) => {
  const sql1 =
    'UPDATE `skylight`.`permission` SET `read`=?,`update`=?,`deletePer`=?,`create`=? WHERE (`adminId`=?)';
  const sql =
    'UPDATE `skylight`.`permission` SET `askedPermissions` = ?, `description` = ? WHERE (`adminId` = ?)';
  
  if (req.body.type === 'grant') {
     db.query(
       sql1,
       [
         req.body.read,
         req.body.update,
         req.body.deletePer,
         req.body.create,
         req.query.id,
       ],
       (err, result) => {
         if (err)
           return next(
             new AppError(
               'something went wrong Unable to update permission',
               404
             )
           );
         return res.status(201).json({ message: 'permission granted successfully' });
       }
     );
  } else if (req.body.type === 'request') {
    db.query(
      sql,
      [req.body.askedPermissions, req.body.description, req.query.id],
      (err, result) => {
        if (err)
          return next(
            new AppError(
              'something went wrong Unable to update permission',
              404
            )
          );
        return res.status(201).json({ message: 'request sent successfully' });
      }
    );
  }
 
});
