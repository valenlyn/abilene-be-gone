/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let queryNewRoom = (data, callback) => {


    console.log("************************")
    console.log("************************")

    console.log("url: ", data.url)
    console.log("url: ", data.topic)
    console.log("************************")
    console.log("************************")


    const values = [data.url, data.topic];
    queryText = 'INSERT INTO rooms (url, topic) VALUES ($1, $2) RETURNING *';

    dbPoolInstance.query(queryText, values, (error, queryResult) => {
      if (error) {

        console.log("have errr in quering", error)
        // invoke callback function with results after query has executed
        callback(error, null);
      } else {
        // invoke callback function with results after query has executed

        callback( null, queryResult.rows );

      }
    });
  };

  let querySpecificRoom = (data, callback) => {

    dbPoolInstance.query(`SELECT * FROM rooms WHERE url='${data.queryUrl}'`, (error, queryResult) => {
      if (error) {
        // invoke callback function with results after query has executed
        callback(error, null);
      } else {
        // invoke callback function with results after query has executed

        callback( null, queryResult.rows );

      }
    });
  }

  let createOptions = (data, callback) => {

    const values = [data.option, data.room_id, data.user_id];
    queryText = 'INSERT INTO options (option, room_id, user_id) VALUES ($1, $2, $3) RETURNING id'

     dbPoolInstance.query(queryText, values, (error, queryResult) => {

      if (error) {

        callback(error, null);

      } else {

            dbPoolInstance.query(`INSERT INTO ratings (rating, user_id, option_id) VALUES ('${data.rating}', '${data.user_id}', '${queryResult.rows[0].id}')`, (errorTwo, queryResultTwo) => {

                if (errorTwo) {

                    callback(errorTwo, null);

                } else {

                    callback( null, queryResultTwo.rows );

                }
            })

      }
    });


  }

  return {
    queryNewRoom,
    querySpecificRoom,
    createOptions
  };
};