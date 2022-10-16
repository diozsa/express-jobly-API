const { BadRequestError } = require("../expressError");

/*
  Method facilitates making partial upated to the db, on selective properties
  1st param - request.body from the user PATCH route is passed in
  2nd param - jsToSql - takes k/v pair as js field prop/db column like:
        {
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin",
        }
*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
