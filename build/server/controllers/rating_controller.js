module.exports = (db) => {


    let sendRatings = (request, response) => {

        console.log(request.body)

        const doneWithQuery = (error, result) => {

        response.send(result);
        console.log("*********errrrrrrorrrr for sending ratings**********");
        console.log(error);
        console.log("****************************************************");


        }

        let data = {
            rating: Number(request.body.optionInterest),
            user_id: request.body.user_id,
            option_id: request.body.option_id
        }

        db.rating.querySendRatings(data, doneWithQuery);

    };

    let getRatings = (request, response) => {

        console.log(request.body)

        const doneWithQuery = (error, result) => {

          response.send(result);

        }

        let data = {
             queryUrl: request.params.id
        }

        db.rating.queryGetRatings(data, doneWithQuery);

    };


    let getRatingsVotingPage = (request, response) => {

        console.log(request.body)

        const doneWithQuery = (error, result) => {

          response.send(result);

        }

        let data = {
             queryUrl: request.params.id
        }

        db.rating.queryGetRatingsVotingPage(data, doneWithQuery);

    };




  return {
    sendRatings,
    getRatings,
    getRatingsVotingPage
  };
};