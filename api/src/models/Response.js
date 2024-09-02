import { response_db } from "../factorydb/Responsedb.js";

const Response = {
  create: (callback) => {
    response_db.run("INSERT INTO Response (userId, response) VALUES (?, ?)", [userId, response], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.lastID);
      }
    });
  }
};

export default Response;