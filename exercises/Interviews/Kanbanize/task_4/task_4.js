

document.getElementById('time-period').addEventListener('change', (event) => {
    event.preventDefault()
    window.radioValue = event.target.value
    renderChart(getFinalData(window.data))
})

const renderChart = rowData => {
    const chart = anychart.bar();
    chart.data(rowData);

    chart.title("Cards started by date");

    document.getElementById('chart-container').innerHTML = ''

    chart.container("chart-container");
    chart.draw();
}

const getFinalData = (arrData) => {
    const data = arrData.filter(el => el != [] && !el.includes(""))
    const [, ...rows] = data.filter(el => el[3] != "")

    let dateIdx = 0
    if (window.radioValue === 'Day' || !window.radioValue) dateIdx = 2

    if (window.radioValue === 'Month') dateIdx = 1

    const dates = rows.map(el => el[3].slice(0, 10).split('-')[dateIdx])

    const datesMap = dates.reduce((acc, curV) => {
        !acc.has(curV) ? acc.set(curV, 1) : acc.set(curV, (acc.get(curV)) + 1)
        return acc
    }, new Map())

    const finalData = []
    datesMap.forEach((el, key) => {
        finalData.push([key, el])
    })

    return finalData
}

const handleData = arrData => {
    window.data = arrData
    const finalData = getFinalData(arrData)
    renderChart(finalData)
}

function handleFileChange(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.addEventListener('loadend', ({ target }) => {
        const arrData = CSVToArray(target.result, ",")
        handleData(arrData)
    })
    reader.readAsText(file)
}


function CSVToArray(strData, strDelimiter) {

    strDelimiter = strDelimiter || ",";

    const objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    const arrData = [[]];
    let arrMatches = null;

    while (arrMatches = objPattern.exec(strData)) {

        const strMatchedDelimiter = arrMatches[1];

        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
            arrData.push([]);
        }

        let strMatchedValue;

        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            strMatchedValue = arrMatches[3];
        }

        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}