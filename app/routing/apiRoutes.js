// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends.js", function(req, res) {
    res.json(friendData);
  });


  app.post("/api/friends", function(req, res) {
   
    let newEntry = req.body;

    let bestMatch;
    let bestTotal;

    friendData.forEach(e => {
      
      let runningTotal;
      for(let i = 0; i < e.scores.length; i++){

        let diff
        if(e.scores[i] >= newEntry.scores[i]){

          diff = e.scores[i] - newEntry.scores[i];

        } else {

          diff = newEntry.scores[i] - e.scores[i];
        }

        if(!runningTotal){

          runningTotal = diff;
        } else {

          runningTotal += diff;
        }
      }

      if(runningTotal < bestTotal) {

        bestTotal = runningTotal;
        bestMatch = e;
      }
    });


    res.send({data: bestMatch});
  });

};
