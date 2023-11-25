

// Global Variables
let Wave_Data;  // Using WindyAPI
let Wind_Weather_Data; // Using CWA API Playground
let Tide_Data;  // Using CWA API Tide


// For getting All Data for Global Variables from local file
var handleGlobalData_local = function () {
    Wave_Data = sampleData_Wave
    console.log("Wave_Data file: ", Wave_Data);

    Wind_Weather_Data = sampleData_Wind_Weather
    console.log("Wind_Weahter_Data file: ", Wind_Weather_Data);

    Tide_Data = sampleData_Tide
    console.log("Tide_Data file: ", Tide_Data);
}


// For getting All Data for Global Variables from Flask API
var handleGlobalData = function () {

    // Call Self Flask API and Get the Data
    function getApiData(locationID, url) {
        const SERVER_URL = url;

        const sendMessage = async () => {
            const message = locationID;
            if (message !== '') {

                const response = await fetch(SERVER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                console.log("json data: ", data)
            }
        };

        sendMessage();
    }

    Wave_Data = getApiData("A00100", "https://flask_api/port");
}





// For Scroll Bar
var handleScrollBar = function () {
    const scrollBar = $("#scroll-bar");
    const leftArrow = $("#left-arrow");
    const rightArrow = $("#right-arrow");

    leftArrow.click(function () {
        scrollBar.animate({ scrollLeft: scrollBar.scrollLeft() - 200 }, "slow");
    });

    rightArrow.click(function () {
        scrollBar.animate({ scrollLeft: scrollBar.scrollLeft() + 200 }, "slow");
    });
}


// For Tab Bar
var handleTabBar = function () {
    // Initially, set the first tab as active
    $(".tab-item[data-tab='tab1']").addClass("active");
    $(".tab-panel#tab1").addClass("active");

    // Handle tab click events
    $(".tab-item").click(function () {
        const tabId = $(this).data("tab");

        // Remove the "active" class from all tabs and panels
        $(".tab-item").removeClass("active");
        $(".tab-panel").removeClass("active");

        // Add the "active" class to the clicked tab and panel
        $(this).addClass("active");
        $(`.tab-panel#${tabId}`).addClass("active");
    });
}


// For Grid Box Card 1
var handleGridCard_1 = function () {

    // Sample data
    var waveData = Wave_Data;

    // Step 1: Parse timestamps in the JSON data with specific timezone
    const timezone = 'Asia/Taipei';
    const timestamps = waveData["ts"].map(timestamp => new Date(timestamp + ' UTC').toLocaleString('en-US', { timeZone: timezone }));

    // Step 2: Get the current local time in the desired timezone
    const now = new Date().toLocaleString('en-US', { timeZone: timezone });
    const currentTime = new Date(now);

    // Replace 'America/New_York' with your desired timezone
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const timeString = new Date(now).toLocaleTimeString('en-US', timeOptions);
    console.log("timeString: ", timeString);

    // Step 3: Find the closest timestamp to the current time
    const closestTimestamp = timestamps.reduce((prev, curr) => Math.abs(new Date(curr) - new Date(now)) < Math.abs(new Date(prev) - new Date(now)) ? curr : prev);
    const closestTime = new Date(closestTimestamp);

    // Determine if current time is before or after the closest time
    const isBeforeClosestTime = currentTime < closestTime;

    if (isBeforeClosestTime) {
        console.log("Current time is before the closest time.");
        // You can perform actions or update HTML based on being before the closest time
    } else {
        console.log("Current time is after the closest time.");
        // You can perform actions or update HTML based on being after the closest time
    }


    // Step 4: Get the corresponding index for the closest timestamp
    const index = timestamps.indexOf(closestTimestamp);
    console.log("index: ", index, closestTimestamp);

    // Step 5: Get the wave data based on the index
    const wavesData = waveData["waves_height-surface"][index];
    const wavesDirectionData = waveData["waves_direction-surface"][index];

    const feetHeight = $('.s-gridbox .card-1 .feet-height');
    feetHeight.text("23");

    const currentText = $('.s-gridbox .card-1 .current-text');
    currentText.text("OK");

}


// For Grid Box Card 2
var handleGridCard_2 = function () {

    // Sample data
    var windweatherData = Wind_Weather_Data;

    // Step 1: Parse timestamps in the JSON data with specific timezone
    const timezone = 'Asia/Taipei';
    const timestamps = windweatherData["ts"].map(timestamp => new Date(timestamp + ' UTC').toLocaleString('en-US', { timeZone: timezone }));

    // Step 2: Get the current local time in the desired timezone
    const now = new Date().toLocaleString('en-US', { timeZone: timezone });
    const currentTime = new Date(now);

    // Replace 'America/New_York' with your desired timezone
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const timeString = new Date(now).toLocaleTimeString('en-US', timeOptions);
    console.log("timeString: ", timeString);

    // Step 3: Find the closest timestamp to the current time
    const closestTimestamp = timestamps.reduce((prev, curr) => Math.abs(new Date(curr) - new Date(now)) < Math.abs(new Date(prev) - new Date(now)) ? curr : prev);
    const closestTime = new Date(closestTimestamp);

    // Determine if current time is before or after the closest time
    const isBeforeClosestTime = currentTime < closestTime;

    if (isBeforeClosestTime) {
        console.log("Current time is before the closest time.");
        // You can perform actions or update HTML based on being before the closest time
    } else {
        console.log("Current time is after the closest time.");
        // You can perform actions or update HTML based on being after the closest time
    }


    // Step 4: Get the corresponding index for the closest timestamp
    const index = timestamps.indexOf(closestTimestamp);
    console.log("index: ", index, closestTimestamp);

    // Step 5: Get the wave data based on the index
    const windspeedData = windweatherData["winds_speed"][index];
    const windsdirectionData = windweatherData["winds_direction"][index];

    const currentText = $('.s-gridbox .card-2 .current-text');
    currentText.text("Onshore");

    const windSpeed = $('.s-gridbox .card-2 .wind-speed');
    windSpeed.text("33kts");

}


// For Local Time
var handleLocalTime = function () {
    function updateClock() {
        // const now = new Date();
        // const hours = now.getHours().toString().padStart(2, '0');
        // const minutes = now.getMinutes().toString().padStart(2, '0');
        // const seconds = now.getSeconds().toString().padStart(2, '0');
        // const timeString = `${hours}:${minutes}:${seconds}`;
        // $('#clock').text(timeString);


        const now = new Date();
        // Replace 'America/New_York' with your desired timezone
        const timeOptions = { timeZone: 'Asia/Taipei', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        $('#clock').text(timeString);
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
}


// For Wave Chart SVG
var handleWaveChartSvg = function () {
    // JSON data for wave heights
    const waveData = sampleData_Wave["waves_height-surface"]
    // Find the maximum value in the data ("+0.3" prevent the max bar height from being "1")
    const maxDataValue = Math.max(...waveData.slice(0, 24)) + 0.3;

    // Create an array to separate data into daily segments
    const days = [
        waveData.slice(0, 8),
        waveData.slice(8, 16),
        waveData.slice(16, 24)
    ];

    // Bar chart dimensions and styling
    const barSpacing = 10; // Space between bars
    const maxBarHeight = 116;
    const chartColor = "blue";

    days.forEach((dayData, index) => {
        const waveSvgId = "wave-svg-" + (index + 1);
        const waveSvg = document.getElementById(waveSvgId);
        const waveSvgWidth = waveSvg.clientWidth;

        const numBars = dayData.length;
        const barWidth = (waveSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

        // Generate bars based on JSON data for the day
        dayData.forEach((height, barIndex) => {
            const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
            const barHeight = (height / maxDataValue) * maxBarHeight;
            const y = maxBarHeight - barHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", chartColor);

            rect.setAttribute("id", "bar" + ((index * numBars) + barIndex + 1));
            rect.setAttribute("class", "each-bar");

            waveSvg.appendChild(rect);
        });
    });


    // Function to update bar width on window resize
    function updateWaveBarWidth() {
        days.forEach((dayData, index) => {
            const waveSvgId = "wave-svg-" + (index + 1);
            const waveSvg = document.getElementById(waveSvgId);
            const waveSvgWidth = waveSvg.clientWidth;

            const numBars = dayData.length;
            const barWidth = (waveSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

            dayData.forEach((height, barIndex) => {
                const rect = waveSvg.getElementById("bar" + ((index * numBars) + barIndex + 1));
                const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
                rect.setAttribute("x", x);
                rect.setAttribute("width", barWidth);
            });
        });
    }

    // Event listener for window resize
    window.addEventListener("resize", updateWaveBarWidth);
}


// For Tooltip Card for Wave
var handleWaveTooltipCard = function () {
    // Select the tooltip elements
    const $tooltipContainer = $('.s-wavechart .tooltip-container');
    const $tooltipCard = $('.s-wavechart .tooltip-card');

    // Select the chart bars and add unique IDs to each
    const $chartBars = $('.s-wavechart .each-bar');
    $chartBars.each(function (index) {
        $(this).attr('id', 'bar' + (index + 1));
    });

    // Track the currently hovered bar
    let hoveredBar = null;

    // Handle hover events for each bar
    $chartBars.on('mouseenter', function () {
        // Extract the numerical part from the id attribute
        const barId = $(this).attr('id');
        const barNumber = parseInt(barId.replace('bar', ''));

        // Calculate the width of the chart area (1/3 of the available space)
        const chartAreaWidth = $('.s-wavechart .chart-area').width();
        const tooltipContainerWidth = $tooltipContainer.width();
        const tooltipWidth = $tooltipCard.width();

        // Calculate the maximum left position for the tooltip card to stay within the screen
        const maxLeft = tooltipContainerWidth - tooltipWidth;

        // Calculate the width of each segment (for 8 bars in 1/3 space)
        const segmentWidth = chartAreaWidth / 8;
        // Calculate the position of the tooltip based on the bar number and screen size
        let tooltipX = (barNumber - 1) * segmentWidth;
        // Ensure the tooltip card doesn't go beyond the screen edge
        tooltipX = Math.min(tooltipX, maxLeft);

        // Move and show the tooltip
        $tooltipCard.css({ left: tooltipX + 'px' }).show();

        // Update the currently hovered bar
        hoveredBar = barId;
    });

    $chartBars.on('mouseleave', function () {
        // Check if the mouse leaves the currently hovered bar
        if (hoveredBar === $(this).attr('id')) {
            // Hide the tooltip when the mouse leaves the currently hovered bar
            // $tooltipCard.hide();
            // $(this).css({ 'stroke': 'none' });
        }
    });
}


// For Wind Chart SVG
var handleWindChartSvg = function () {
    // JSON data for wind heights
    const windData = Wind_Weather_Data["winds_speed"]
    // Find the maximum value in the data ("+0.3" prevent the max bar height from being "1")
    const maxDataValue = Math.max(...windData.slice(0, 24)) + 0.2;

    // Create an array to separate data into daily segments
    const days = [
        windData.slice(0, 8),
        windData.slice(8, 16),
        windData.slice(16, 24)
    ];

    // Bar chart dimensions and styling
    const barSpacing = 10; // Space between bars
    const maxBarHeight = 70;
    const chartColor = "blue";

    days.forEach((dayData, index) => {
        const windSvgId = "wind-svg-" + (index + 1);
        const windSvg = document.getElementById(windSvgId);
        const windSvgWidth = windSvg.clientWidth;
        const numBars = dayData.length;
        const barWidth = (windSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

        // Generate bars based on JSON data for the day
        dayData.forEach((height, barIndex) => {
            const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
            // const barHeight = height * maxBarHeight;
            const barHeight = (height / maxDataValue) * maxBarHeight;
            const y = maxBarHeight - barHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", chartColor);

            rect.setAttribute("id", "bar" + ((index * numBars) + barIndex + 1));
            rect.setAttribute("class", "each-bar");

            windSvg.appendChild(rect);
        });
    });


    // Function to update bar width on window resize
    function updateWindBarWidth() {
        days.forEach((dayData, index) => {
            const windSvgId = "wind-svg-" + (index + 1);
            const windSvg = document.getElementById(windSvgId);
            const windSvgWidth = windSvg.clientWidth;
            const numBars = dayData.length;
            const barWidth = (windSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

            dayData.forEach((height, barIndex) => {
                const rect = windSvg.getElementById("bar" + ((index * numBars) + barIndex + 1));
                const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
                rect.setAttribute("x", x);
                rect.setAttribute("width", barWidth);
            });
        });
    }

    // Event listener for window resize
    window.addEventListener("resize", updateWindBarWidth);
}


// For Tooltip Card for Wind
var handleWindTooltipCard = function () {
    // Select the tooltip elements
    const $tooltipContainer = $('.s-windchart .tooltip-container');
    const $tooltipCard = $('.s-windchart .tooltip-card');

    // Select the chart bars and add unique IDs to each
    const $chartBars = $('.s-windchart .each-bar');
    $chartBars.each(function (index) {
        $(this).attr('id', 'bar' + (index + 1));
    });

    // Track the currently hovered bar
    let hoveredBar = null;

    // Handle hover events for each bar
    $chartBars.on('mouseenter', function () {
        // Extract the numerical part from the id attribute
        const barId = $(this).attr('id');
        const barNumber = parseInt(barId.replace('bar', ''));

        // Calculate the width of the chart area (1/3 of the available space)
        const chartAreaWidth = $('.s-windchart .chart-area').width();
        const tooltipContainerWidth = $tooltipContainer.width();
        const tooltipWidth = $tooltipCard.width();

        // Calculate the maximum left position for the tooltip card to stay within the screen
        const maxLeft = tooltipContainerWidth - tooltipWidth;
        // Calculate the width of each segment (for 8 bars in 1/3 space)
        const segmentWidth = chartAreaWidth / 8;
        // Calculate the position of the tooltip based on the bar number and screen size
        let tooltipX = (barNumber - 1) * segmentWidth;

        // Ensure the tooltip card doesn't go beyond the screen edge
        tooltipX = Math.min(tooltipX, maxLeft);

        // Move and show the tooltip
        $tooltipCard.css({ left: tooltipX + 'px' }).show();

        // Update the currently hovered bar
        hoveredBar = barId;
    });

    $chartBars.on('mouseleave', function () {
        // Check if the mouse leaves the currently hovered bar
        if (hoveredBar === $(this).attr('id')) {
            // Hide the tooltip when the mouse leaves the currently hovered bar
            // $tooltipCard.hide();
            // $(this).css({ 'stroke': 'none' });
        }
    });
}


// For Tide Chart
var handleTideChartSvg = function () {
    // Sample JSON data (replace this with your actual JSON data)
    const tideData = Tide_Data["tide_height"]

    // Set up the SVG container
    const svg = d3.select(".s-tidechart .tide-chart-svg");

    // Calculate scaling factor based on SVG width and height
    const svgWidth = parseInt(svg.style("width"));
    const scaleFactorX = svgWidth / 720; // Assuming the original range is 0 to 720
    const svgHeight = parseInt(svg.style("height"));
    const scaleFactorY = svgHeight / 200; // Assuming the original range is 0 to 200

    // Apply scaling to x-coordinates
    const tempData = JSON.parse(JSON.stringify(tideData));
    tempData.forEach(d => {
        d.x = d.x * scaleFactorX;
        d.y = d.y * scaleFactorY;
    });

    // Create a smooth line generator
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveCardinal.tension(0.1)); // Adjust the tension parameter (0.7 is just an example)

    // Draw the path (for "the chart")
    svg.append("path")
        .data([tempData])
        .attr("d", line)
        .attr("class", "graph")
        .attr("fill", "rgba(185, 211, 223, 0.4)");

    // Draw the path (for "chart line" above the chart) stroke="#171717" stroke-width="1.5px" fill="none"
    svg.append("path")
        .data([tempData])
        .attr("d", line)
        .attr("class", "outline")
        .attr("stroke", "#171717")
        .attr("stroke-width", "1.5px")
        .attr("fill", "none");


    // Draw vertical strokes "g" for each point
    const verticalStrokes = svg.selectAll("g.vertical-stroke")
        .data(tempData.slice(2, -2)) // Exclude first two and last two elements
        .enter()
        .append("g")
        .attr("class", "vertical-stroke");

    verticalStrokes.append("line")
        .attr("x1", d => d.x)
        .attr("x2", d => d.x)
        .attr("y1", d => d.y) // Extracting y-coordinate from the curved line path
        .attr("y2", svgHeight) // Adjust the y2 value based on your chart height
        .attr("stroke", "#171717")
        .attr("stroke-width", "1.5px")
        .attr("opacity", "0.4");

    // Add text labels with formatted "DateTime"
    verticalStrokes.append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 17) // Adjust the y-coordinate for text positioning
        .attr("text-anchor", "middle")
        .text(d => {
            const date = d.Date;
            const time = d.Time;
            return `${date} ${time}`;
        })
        .attr("fill", "#171717")
        .attr("font-size", "10px")
        .attr("font-weight", "700");

    // Add text labels with formatted "TideHeight"
    verticalStrokes.append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 8) // Adjust the y-coordinate for text positioning
        .attr("text-anchor", "middle")
        .text(d => {
            const tideheight = ((100 - (d.y / scaleFactorY)) / 100).toFixed(2);  // "/scaleFactorY" bc it "*scaleFactorY" above to fit svg height
            return `${tideheight} m`;
        })
        .attr("fill", "#171717")
        .attr("font-size", "10px")
        .attr("font-weight", "700");

    // Function to update tide chart width on window resize
    function updateTideChartWidth() {
        // Calculate scaling factor based on updated SVG width and height
        const tideSvg = d3.select(".s-tidechart .tide-chart-svg");
        const tideSvgWidth = parseInt(tideSvg.style("width"));
        const scaleFactorX = tideSvgWidth / 720; // Assuming the original range is 0 to 720
        const tideSvgHeight = parseInt(tideSvg.style("height"));
        const scaleFactorY = tideSvgHeight / 200; // Assuming the original range is 0 to 200

        // Apply scaling to x-coordinates
        const tempData = JSON.parse(JSON.stringify(tideData));
        tempData.forEach(d => {
            d.x = d.x * scaleFactorX;
            d.y = d.y * scaleFactorY;
        });

        // Update the line generator with new scaled data
        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCardinal.tension(0.1)); // Adjust the tension parameter (0.7 is just an example)

        // Update the "graph" path with new data
        tideSvg.select(".tide-chart-svg .graph")
            .data([tempData])
            .attr("d", line);

        // Update the "outline" path with new data
        tideSvg.select(".tide-chart-svg .outline")
            .data([tempData])
            .attr("d", line);

        // Update vertical strokes based on new data
        const verticalStrokes = tideSvg.selectAll("g.vertical-stroke")
            .data(tempData.slice(2, -2));

        verticalStrokes.select("line")
            .attr("x1", d => d.x)
            .attr("x2", d => d.x)
            .attr("y1", d => d.y)
            .attr("y2", tideSvgHeight);

        // Update text labels with formatted "DateTime"
        verticalStrokes.select("text:nth-child(2)")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 17)
            .text(d => `${d.Date} ${d.Time}`);

        // Update text labels with "TideHeight"
        verticalStrokes.select("text:last-child")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 8)
            .text(d => {
                const tideheight = ((100 - (d.y / scaleFactorY)) / 100).toFixed(2);
                return `${tideheight} m`;
            });
    }

    // Event listener for window resize
    window.addEventListener("resize", updateTideChartWidth);
}





$(document).ready(function () {
    handleGlobalData_local();

    handleScrollBar();
    handleTabBar();

    handleGridCard_1();
    handleGridCard_2();

    handleLocalTime();
    handleWaveChartSvg();
    handleWaveTooltipCard();
    handleWindChartSvg();
    handleWindTooltipCard();
    handleTideChartSvg();
});