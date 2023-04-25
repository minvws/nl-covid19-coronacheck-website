const downloads_cc_number = document.getElementById('downloads_cc_number');
const downloads_ccs_number = document.getElementById('downloads_ccs_number');

const cc_table = document.getElementById("downloads_cc_table");
const ccs_table = document.getElementById("downloads_ccs_table");

// Dutch statistics
const CoronaCheck_downloads_plot = document.getElementById('CoronaCheck_downloads_plot_nl');
const CoronaCheckScanner_downloads_plot = document.getElementById('CoronaCheckScanner_downloads_plot_nl');

// English statistics
const CoronaCheck_downloads_plot_EN = document.getElementById('CoronaCheck_downloads_plot_en');
const CoronaCheckScanner_downloads_plot_EN = document.getElementById('CoronaCheckScanner_downloads_plot_en');

const firstEntry = new Date(2021, 03, 28);
const today = new Date();
const thisMonthYear = today.toLocaleString("nl", { "month": "numeric" }) + today.toLocaleString("nl", { "year": "numeric" });
const thisMonthNumber = parseInt(today.toLocaleString("nl", { "month": "numeric" }));
const nextMonth = thisMonthNumber + 1;
const nextMonthString = nextMonth.toString() + today.toLocaleString("nl", { "year": "numeric" });

try {
    if (CoronaCheck_downloads_plot != null) {
        CoronaCheck_downloads_plot.appendChild(
            Plot.plot({
                marginBottom: 80,
                marginTop: 40,
                x: {
                    label: "Maand →",
                    tickRotate: -45,
                    tickFormat: (
                        (f) => {
                            const date = f.toLocaleString("nl", { "month": "short", "year": "numeric" });
                            const monthYear = f.toLocaleString("nl", { "month": "numeric" }) + f.toLocaleString("nl", { "year": "numeric" });
                            return monthYear === thisMonthYear ? `${date} *` : date;
                        }
                    ),
                    ticks: d3.utcMonth.every(1),
                },
                y: {
                    label: "↑ Aantal downloads CoronaCheck (miljoen)",
                    labelOffset: -20,
                    transform: d => d / 1000000,
                    grid: true,
                    tickFormat: (f => `${f}M`),
                    domain: [0, 18],
                },
                marks: [
                    Plot.line(CC_downloads_plot, {
                        x: "date",
                        y: "downloads",
                        stroke: "#ec025f",
                        strokeWidth: 3
                    }),
                    Plot.ruleY([0]),
                ],
            })
        );
    };

    if (CoronaCheckScanner_downloads_plot != null) {
        CoronaCheckScanner_downloads_plot.appendChild(
            Plot.plot({
                marginBottom: 80,
                marginTop: 40,
                x: {
                    label: "Maand →",
                    tickRotate: -45,
                    tickFormat: (
                        (f) => {
                            const date = f.toLocaleString("nl", { "month": "short", "year": "numeric" });
                            const monthYear = f.toLocaleString("nl", { "month": "numeric" }) + f.toLocaleString("nl", { "year": "numeric" });
                            return monthYear === thisMonthYear ? `${date} *` : date;
                        }
                    ),
                    ticks: d3.utcMonth.every(1),
                },
                y: {
                    label: "↑ Aantal downloads CoronaCheck Scanner (miljoen)",
                    labelOffset: -20,
                    transform: d => d / 1000000,
                    grid: true,
                    tickFormat: (f => `${f}M`),
                    domain: [0, 4],
                },
                marks: [
                    Plot.line(CCScanner_downloads_plot, {
                        x: "date",
                        y: "downloads",
                        stroke: "#ec025f",
                        strokeWidth: 3
                    }),
                    Plot.ruleY([0]),
                ],
            })
        );
    };

    if (CoronaCheck_downloads_plot_EN != null) {
        CoronaCheck_downloads_plot_EN.appendChild(
            Plot.plot({
                marginBottom: 80,
                marginTop: 40,
                x: {
                    label: "Month →",
                    tickRotate: -45,
                    tickFormat: (
                        (f) => {
                            const date = f.toLocaleString("en", { "month": "short", "year": "numeric" });
                            const monthYear = f.toLocaleString("nl", { "month": "numeric" }) + f.toLocaleString("nl", { "year": "numeric" });
                            return monthYear === thisMonthYear ? `${date} *` : date;
                        }
                    ),
                    ticks: d3.utcMonth.every(1),
                },
                y: {
                    label: "↑ Number of downloads CoronaCheck (million)",
                    labelOffset: -20,
                    transform: d => d / 1000000,
                    grid: true,
                    tickFormat: (f => `${f}M`),
                    domain: [0, 18],
                },
                marks: [
                    Plot.line(CC_downloads_plot, {
                        x: "date",
                        y: "downloads",
                        stroke: "#ec025f",
                        strokeWidth: 3
                    }),
                    Plot.ruleY([0]),
                ],
            }));
    };

    if (CoronaCheckScanner_downloads_plot_EN != null) {
        CoronaCheckScanner_downloads_plot_EN.appendChild(
            Plot.plot({
                marginBottom: 80,
                marginTop: 40,
                x: {
                    label: "Maand →",
                    tickRotate: -45,
                    tickFormat: (
                        (f) => {
                            const date = f.toLocaleString("en", { "month": "short", "year": "numeric" });
                            const monthYear = f.toLocaleString("nl", { "month": "numeric" }) + f.toLocaleString("nl", { "year": "numeric" });
                            return monthYear === thisMonthYear ? `${date} *` : date;
                        }
                    ),
                    ticks: d3.utcMonth.every(1),
                },
                y: {
                    label: "↑ Number of downloads CoronaCheck Scanner (million)",
                    labelOffset: -20,
                    transform: d => d / 1000000,
                    grid: true,
                    tickFormat: (f => `${f}M`),
                    domain: [0, 4],
                },
                marks: [
                    Plot.line(CCScanner_downloads_plot, {
                        x: "date",
                        y: "downloads",
                        stroke: "#ec025f",
                        strokeWidth: 3
                    }),
                    Plot.ruleY([0]),
                ],
            }));
    };
} catch { }

function constructTable(selectedData, selected_table) {
    // loop through all the data objects in the requested JSON
    for (let i = 0; i < selectedData.length; i++) {
        // store object in a variable
        const statsObject = Object.values(selectedData[i]);

        // turn today's date into a string we can compare to a date string in the JSON
        const today = new Date();

        // get the number of key value pairs
        let number_of_key_value_pairs = Object.values(selectedData[i]).length;

        // convert the value shown in the table column later
        function getColumnValue(valueID) {
            if (typeof (statsObject[valueID]) == 'number') {
                columnValue = Math.round(statsObject[valueID]);

                if (pageLang === 'nl') {
                    return new Intl.NumberFormat('nl-NL', {}).format(columnValue)
                } else {
                    return new Intl.NumberFormat('en-GB', {}).format(columnValue)
                }
            } else {
                return statsObject[valueID];
            }
        }

        const lastUpdate = document.getElementById("lastUpdate");

        // create a row string, adding html and content to it
        let statsRow = ``;

        statsRow += `<tr>`;

        if (pageLang === 'nl') {
            statsRow += `<td>
                    ${statsObject[0].toLocaleString("nl", { "day": "numeric", "month": "long", "year": "numeric" })} 
                    </td>`;
            lastUpdate.innerHTML = statsObject[0].toLocaleString("nl", {
                "weekday": "long",
                "day": "numeric",
                "month": "long",
                "year": "numeric"
            })
        } else {
            statsRow += `<td>
                    ${statsObject[0].toLocaleString("en", { "day": "numeric", "month": "long", "year": "numeric" })} 
                    </td>`;
            lastUpdate.innerHTML = statsObject[0].toLocaleString("en", {
                "weekday": "long",
                "day": "numeric",
                "month": "long",
                "year": "numeric"
            })
        }

        for (let j = 1; j < number_of_key_value_pairs; j++) {
            statsRow += `<td>${getColumnValue(j)}</td>`
        }

        statsRow += `</tr>`;
        selected_table.innerHTML += statsRow;

    }
}

function updateStatisticNumber(selectedData, selectedKey, selectedElement) {
    for (let i = 0; i < selectedData.length; i++) {
        if (i == (selectedData.length - 1)) {
            function getValue(valueID) {
                valueToGet = Math.round(valueID);

                if (pageLang === 'nl') {
                    return new Intl.NumberFormat('nl-NL', {}).format(valueToGet)
                } else {
                    return new Intl.NumberFormat('en-GB', {}).format(valueToGet)
                }
            }

            statisticNumber = getValue(selectedData[i][selectedKey]);
        }
    }

    selectedElement.innerHTML = statisticNumber;
}

// constructTable(selectedData, selected_table) 
constructTable(CC_downloads_plot, cc_table);
constructTable(CCScanner_downloads_plot, ccs_table);

// updateStatisticNumber(selectedData, selectedKey, selectedElement) 
updateStatisticNumber(CC_downloads_plot, 'downloads', downloads_cc_number);
updateStatisticNumber(CCScanner_downloads_plot, 'downloads', downloads_ccs_number);

if (pageLang === 'nl') {
    // CoronaCheck 
    const cc_graph_title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    cc_graph_title.textContent = ccdownloads_graphalt;

    const cc_graph = CoronaCheck_downloads_plot.getElementsByTagName('svg')[0];
    cc_graph.setAttribute('role', 'img');
    cc_graph.insertBefore(cc_graph_title, cc_graph.firstChild);

    // CoronaCheck Scanner 
    const ccs_graph_title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    ccs_graph_title.textContent = ccsdownloads_graphalt;

    const ccs_graph = CoronaCheckScanner_downloads_plot.getElementsByTagName('svg')[0];
    ccs_graph.setAttribute('role', 'img');
    ccs_graph.insertBefore(ccs_graph_title, ccs_graph.firstChild);
}

if (pageLang === 'en') {
    // CoronaCheck English
    const cc_graph_title_en = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    cc_graph_title_en.textContent = ccdownloads_graphalt;

    const cc_graph_en = CoronaCheck_downloads_plot_EN.getElementsByTagName('svg')[0];
    cc_graph_en.setAttribute('role', 'img');
    cc_graph_en.insertBefore(cc_graph_title_en, cc_graph_en.firstChild);

    // CoronaCheck Scanner English 
    const ccs_graph_title_en = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    ccs_graph_title_en.textContent = ccsdownloads_graphalt;

    const ccs_graph_en = CoronaCheckScanner_downloads_plot_EN.getElementsByTagName('svg')[0];
    ccs_graph_en.setAttribute('role', 'img');
    ccs_graph_en.insertBefore(ccs_graph_title_en, ccs_graph_en.firstChild);
}

const js_generated_content = document.getElementById('js_generated_content');

js_generated_content.removeAttribute('hidden');
