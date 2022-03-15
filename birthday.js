const request = require("request");
const cheerio = require("cheerio");
const { table } = require("console");

request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard",
  cb
);

function cb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else {
    handleHTML(html);
    // console.log(html);
  }
}

function handleHTML(html) {
  let $ = cheerio.load(html);
  //getting value using css selector in form of array
  let teamArr = $(".match-info.match-info-MATCH .team");
  //   let teamName;
  // console.log(teamArr);
  for (let i = 0; i < teamArr.length; i++) {
    //checking the team-gray is present in which class
    let hasclass = $(teamArr[i]).hasClass("team-gray");
    if (hasclass == false) {
      let teamNameElem = $(teamArr[i]).find(".name");
      wTeamName = teamNameElem.text().trim();
      //   console.log(teamNameElem.text());
    }
  }
  let inningArr = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlStr = "";
  for (let i = 0; i < inningArr.length; i++) {
    //   let cHtml=$(inningArr[i]).html();
    //   htmlStr+=cHtml;
    //   console.log(htmlStr);

    //team Name
    let teamNameElem = $(inningArr[i]).find(".header-title.label");
    let teamName = teamNameElem.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    // console.log(teamName);

    let hwtName = "";
    let hwt = 0;
    if (wTeamName == teamName) {
      // console.log(teamName);
      let tableElement = $(inningArr[i]).find(".table.bowler");
      //getting all bowlers rows
      let allBowlers = $(tableElement).find("tr");
      for (let j = 0; j < allBowlers.length; j++) {
        //getting palyers record in a row through column
        let allColsOfPlayer = $(allBowlers[j]).find("td");
        //getting player name
        let playerName = $(allColsOfPlayer[0]).text();
        //Number of wickets
        let wickets = $(allColsOfPlayer[4]).text();
        // console.log(
        //   `Winning Team ${wTeamName}  playerName:${playerName}  Wickets:${wickets}`
        // );

        if (wickets >= hwt) {
          hwt = wickets;
          hwtName = playerName;
        }
      }
      //   console.log(hwtName);
      //   console.log(hwt);
      console.log(
        `Winning Team ${wTeamName}  playerName:${hwtName}  Wickets:${hwt}`
      );
    }
  }
}
