async function fetchApiData(sports, oddsFormat, title) {
  // const url = `https://api.the-odds-api.com/v4/sports/${sports}/odds/?apiKey=4a37c359b0496c540586175232e23f4c&regions=us&markets=spreads,totals,h2h&oddsFormat=${oddsFormat}`;
  // return fetch(url, {
  //         method : "GET",
  //         mode: 'no-cors',
  //     }).then(response => response.json())

  return responseData;

  // console.log(data);
}

function filterResponse(items) {
  return items.map((data) => {
    const filteredBMdata = data.bookmakers.filter((bm) => {
      return bm.key === "draftkings";
    });
    return { ...data, bookmakers: filteredBMdata };
  });
}

function formateDate(date) {
  const currentDate = new Date();
  const tomorrow = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1
  );

  if (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  ) {
    return `tomorrow ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const ordinalSuffix =
      dateNum === 1 || dateNum === 21 || dateNum === 31
        ? "ST"
        : dateNum === 2 || dateNum === 22
        ? "ND"
        : dateNum === 3 || dateNum === 23
        ? "RD"
        : "TH";
    return `${day} ${month} ${dateNum}${ordinalSuffix}`;
  }
}

function extractMarketData(data) {

  return data.flatMap((game) => {
    return game.bookmakers.map((bookmaker) => {
      const marketData = {};

      bookmaker.markets.forEach((market) => {
        market.outcomes.forEach((outcome) => {
          if (!marketData[outcome.name]) {
            marketData[outcome.name] = {
              spreads: null,
              totals: null,
              h2h: null,
            };
          }
          if (market.key === "spreads") {
            marketData[outcome.name].spreads = {
              price: outcome.price,
              point: outcome.point,
            };
          } else if (market.key === "h2h") {
            marketData[outcome.name].h2h = {
              price: outcome.price,
              point: outcome.point,
            };
          } else if (market.key === "totals") {
            marketData[outcome.name].totals = {
              price: outcome.price,
              point: outcome.point,
            };
          }
        });
      });

      return {
        id: game.id,
        commence_time: game.commence_time,
        home_team: game.home_team,
        away_team: game.away_team,
        sport_key: game.sport_key,
        sport_title: game.sport_title,
        marketData,
      };
    });
  });
}

function processMarketData(data) {
  return data.map((game) => {
    const { marketData } = game;

    const teams = Object.keys(marketData)
      .map((name) => {
        if (name !== "Over" && name !== "Under") {
          const imgUrl = getIconUrl(name);

          //SPREADS
          const spreads = {
            price: marketData[name]["spreads"].price,
            point: marketData[name]["spreads"].point,
          };

          //TOTALS
          const totalsCell = document.createElement("td");
          totalsCell.classList.add("data");
          const overPrice =
            marketData["Over"] && marketData["Over"]["totals"]
              ? marketData["Over"]["totals"].price
              : "-";
          const overPoint =
            marketData["Over"] && marketData["Over"]["totals"]
              ? marketData["Over"]["totals"].point
              : "-";
          const underPrice =
            marketData["Under"] && marketData["Under"]["totals"]
              ? marketData["Under"]["totals"].price
              : "-";
          const underPoint =
            marketData["Under"] && marketData["Under"]["totals"]
              ? marketData["Under"]["totals"].point
              : "-";

          const totals = {};

          if (name === "Under") {
            totals.price = underPrice;
            totals.point = underPoint;
          } else {
            totals.price = overPrice;
            totals.point = overPoint;
          }

          //MONEYLINE

          const h2h = {
            price: marketData[name]["h2h"].price,
            point: marketData[name]["h2h"].point,
          };

          return {
            name,
            imgUrl,
            spreads,
            h2h,
            totals,
          };
        }

        return null;
      })
      .filter((x) => x);

    return {
      ...game,
      marketData: teams,
    };
  });
}

const teamsIcons = {};
function getIconUrl(name) {
  const baseUrl = "https://sportsbook.draftkings.com/static/";
  const nameTokens = name?.split(" ");
  const x = nameTokens[nameTokens.length - 1].toLowerCase();

  const a = Object.entries(teamsIcons).map((x) => {
    const key = x[0];
    const value = x[1];

    const teamThing = key.split(" ")[1].toLowerCase();
    return { key: teamThing, value };
  });

  const result = a.filter((b) => b.key === x)[0];

  return result?.value ? baseUrl + result.value : null;
}
