function createChildElement(name, parent, options) {
  let element = document.createElement(name);

  if (options?.class) {
    // element.set.add(options.class);
    element.setAttribute("class", options.class);
  }

  if (options?.text) {
    element.textContent = options.text;
  }

  if (options?.id) {
    element.setAttribute("id", options.id);
  }

  parent.appendChild(element);
  return element;
}

function createDataCell(parent, price, point) {
  const cellElement = createChildElement("div", parent, {
    class: "grid-data-cell",
  });
  const flexElement = createChildElement("div", cellElement, {
    class: "flex-row flex-center",
  });

  if (price !== null && price !== undefined) {
    const priceElement = createChildElement("div", flexElement, {
      class: "price",
      text: price,
    });
  }

  if (point !== null && point !== undefined) {
    const pointElement = createChildElement("div", flexElement, {
      class: "point",
      text: point,
    });
  }

  return cellElement;
}

function createDataRow(parent, name, spreads, totals, moneyline) {

  const nameContainer = createChildElement("div", parent, {
    class: "grid-name-cell",
  });

  const nameCellElement = createChildElement("div", nameContainer, {
    text: name,
  });

  const spreadsCellElement = createDataCell(parent, spreads[0], spreads[1]);
  const totalsCellElement = createDataCell(parent, totals[0], totals[1]);
  const moneylineCellElement = createDataCell(parent, moneyline[0], moneyline[1]);
}

function createHeaderRow(parent, headers, createDivider = true) {
  const headerElements = headers.map((header, index) => {
    const className = index === 0 ? "grid-header-name" : "grid-header";

    return createChildElement("div", parent, {
      class: className,
      text: header,
    });
  });

  if (createDivider) {
    headerElements.push(
      createChildElement("div", parent, { class: "row-rule" })
    );
  }

  return headerElements;
}

function createGrid(parent, rows, time) {
  const gridContainer = createChildElement("div", parent, {
    class: "grid-container",
  });
  createHeaderRow(gridContainer, [time, "SPREADS", "TOTALS", "MONEYLINE"]);

  const rowElements = rows.map((row) => {
    return createDataRow(
      gridContainer,
      row.name,
      row.spreads,
      row.totals,
      row.moneyline
    );
  });

  return gridContainer;
}

/* PAGE ENTRY POINT  */
function fetchData(parent) {

  fetchApiData("Basketball", "decimal")


    .then((data) => {
      const filteredData = filterResponse(data);
      const marketData = extractMarketData(filteredData);
      const processdData = processMarketData(marketData);

      createPage(parent, processdData)
    })

}

/* PAGE BUILDER */
function createPage (rootDiv, data) {

  data.forEach(game => {


    const date = new Date(game.commence_time);
    const rows = game.marketData.map(team => {
      return {
        name: team.name,
        spreads: [team.spreads.price, team.spreads.point],
        totals: [team.totals.price, team.totals.point],
        moneyline: [team.h2h.price, team.h2h.point],
      }
    })

    createGrid(rootDiv, rows, formateDate(date).toUpperCase())
  })

}