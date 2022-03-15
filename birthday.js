const request = require("request");
const cheerio = require("cheerio");

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
  let inningArr = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlStr = "";
  for (let i = 0; i < inningArr.length; i++) {
    //team Name
    let teamNameElem = $(inningArr[i]).find(".header-title.label");
    let teamName = teamNameElem.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    // console.log(teamName);

    //table batman
    let tableElement = $(inningArr[i]).find(".table.batsman");
    //getting all bowlers rows
    let allBatMan = $(tableElement).find("tr");
    for (let j = 0; j < allBatMan.length; j++) {
      //getting palyers record in a row through column
      let allColsOfPlayer = $(allBatMan[j]).find("td");
      let isbatsManCal = $(allColsOfPlayer[0]).hasClass("batsman-cell");
      if (isbatsManCal == true) {
        // getting player name
        let playerName = $(allColsOfPlayer[0]).text();
        console.log(`Winning Team ${teamName}  playerName:${playerName}`);
      }
    }
  }
}
