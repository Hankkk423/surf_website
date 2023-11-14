

// For Scroll Bar
$(document).ready(function () {
    const scrollBar = $("#scroll-bar");
    const leftArrow = $("#left-arrow");
    const rightArrow = $("#right-arrow");

    leftArrow.click(function () {
        scrollBar.animate({ scrollLeft: scrollBar.scrollLeft() - 200 }, "slow");
    });

    rightArrow.click(function () {
        scrollBar.animate({ scrollLeft: scrollBar.scrollLeft() + 200 }, "slow");
    });
});


// $(document).ready(function () {
//     $('.dropdown-toggle').click(function () {
//         $('.dropdown-menu').toggle();
//     });
// });


// For Tab Bar
$(document).ready(function () {
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
});


// For Local Time
$(document).ready(function () {

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        $('#clock').text(timeString);
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
});



// For Wave Chart SVG
$(document).ready(function () {
    // JSON data for wave heights
    const waveData = {
        "waves_height-surface": [
            0.48507989799255413,
            0.26870220935624706,
            0.2703030639024085,
            0.24349211339402088,
            0.6203252020247032,
            0.26038180148397605,
            0.4315050809330188,
            0.27556301455407833,
            0.303867199134936,
            0.41512659009309827,
            0.44268415763772095,
            0.5351906810551451,
            0.2635027952210286,
            0.8995599735764346,
            0.44556973158857316,
            0.660346565678719,
            0.37544826669897446,
            0.29394593671650354,
            0.35637926401676573,
            0.5439146657037593,
            0.508319194030306,
            0.278684008291131,
            0.3103244275564241,
            0.23673892866988103,
        ]
    };

    // Create an array to separate data into daily segments
    const days = [
        waveData["waves_height-surface"].slice(0, 8),
        waveData["waves_height-surface"].slice(8, 16),
        waveData["waves_height-surface"].slice(16, 24)
    ];


    // Bar chart dimensions and styling
    const barSpacing = 10; // Space between bars
    const maxBarHeight = 116;
    const chartColor = "blue";

    days.forEach((dayData, index) => {
        const waveSvgId = "wave-svg-" + (index + 1);
        const waveSvg = document.getElementById(waveSvgId);
        // const svgWidth = contain.clientWidth/3;
        const waveSvgWidth = waveSvg.clientWidth;

        const numBars = dayData.length;
        const barWidth = (waveSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

        // Generate bars based on JSON data for the day
        dayData.forEach((height, barIndex) => {
            const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
            const barHeight = height * maxBarHeight;
            const y = maxBarHeight - barHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", chartColor);

            console.log("barIndex: ", barIndex);

            rect.setAttribute("id", "bar" + (barIndex + 1));
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

});




// For Wind Chart SVG
$(document).ready(function () {
    // JSON data for wind heights
    const windData = {
        "winds_speed": [
            0.48507989799255413,
            0.26870220935624706,
            0.2703030639024085,
            0.24349211339402088,
            0.6203252020247032,
            0.26038180148397605,
            0.4315050809330188,
            0.27556301455407833,
            0.303867199134936,
            0.41512659009309827,
            0.44268415763772095,
            0.5351906810551451,
            0.2635027952210286,
            0.8995599735764346,
            0.44556973158857316,
            0.660346565678719,
            0.37544826669897446,
            0.29394593671650354,
            0.35637926401676573,
            0.5439146657037593,
            0.508319194030306,
            0.278684008291131,
            0.3103244275564241,
            0.23673892866988103,
        ]
    };

    // Create an array to separate data into daily segments
    const days = [
        windData["winds_speed"].slice(0, 8),
        windData["winds_speed"].slice(8, 16),
        windData["winds_speed"].slice(16, 24)
    ];


    // Bar chart dimensions and styling
    const barSpacing = 10; // Space between bars
    const maxBarHeight = 70;
    const chartColor = "blue";

    days.forEach((dayData, index) => {
        const windSvgId = "wind-svg-" + (index + 1);
        const windSvg = document.getElementById(windSvgId);
        // const svgWidth = contain.clientWidth/3;
        const windSvgWidth = windSvg.clientWidth;

        const numBars = dayData.length;
        const barWidth = (windSvgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

        // Generate bars based on JSON data for the day
        dayData.forEach((height, barIndex) => {
            const x = barIndex * (barWidth + barSpacing) + 10; // Add 10 for spacing on the left
            const barHeight = height * maxBarHeight;
            const y = maxBarHeight - barHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", chartColor);

            console.log("barIndex: ", barIndex);

            rect.setAttribute("id", "bar" + (barIndex + 1));
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

});






// For Tooltip Card for Wave
$(document).ready(function () {
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
        console.log('barId: ', barId);
        const barNumber = parseInt(barId.replace('bar', ''));
        console.log('barNumber: ', barNumber);

        // Calculate the width of the chart area (1/3 of the available space)
        const chartAreaWidth = $('.s-wavechart .chart-area').width();
        console.log('chartAreaWidth: ', chartAreaWidth);

        const tooltipWidth = $tooltipCard.width();
        console.log('tooltipWidth: ', tooltipWidth);

        const tooltipContainerWidth = $tooltipContainer.width();
        console.log('tooltipContainerWidth: ', tooltipContainerWidth);


        // Calculate the maximum left position for the tooltip card to stay within the screen
        const maxLeft = tooltipContainerWidth - tooltipWidth;

        // Calculate the width of each segment (for 8 bars in 1/3 space)
        const segmentWidth = chartAreaWidth / 8;
        console.log('segmentWidth: ', segmentWidth);

        // Calculate the position of the tooltip based on the bar number and screen size
        let tooltipX = (barNumber - 1) * segmentWidth;

        // Ensure the tooltip card doesn't go beyond the screen edge
        tooltipX = Math.min(tooltipX, maxLeft);
        console.log('tooltipX: ', tooltipX);

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
});





// For Tooltip Card for Wind
$(document).ready(function () {
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
        console.log('barId: ', barId);
        const barNumber = parseInt(barId.replace('bar', ''));
        console.log('barNumber: ', barNumber);

        // Calculate the width of the chart area (1/3 of the available space)
        const chartAreaWidth = $('.s-windchart .chart-area').width();
        console.log('chartAreaWidth: ', chartAreaWidth);

        const tooltipWidth = $tooltipCard.width();
        console.log('tooltipWidth: ', tooltipWidth);

        const tooltipContainerWidth = $tooltipContainer.width();
        console.log('tooltipContainerWidth: ', tooltipContainerWidth);


        // Calculate the maximum left position for the tooltip card to stay within the screen
        const maxLeft = tooltipContainerWidth - tooltipWidth;

        // Calculate the width of each segment (for 8 bars in 1/3 space)
        const segmentWidth = chartAreaWidth / 8;
        console.log('segmentWidth: ', segmentWidth);

        // Calculate the position of the tooltip based on the bar number and screen size
        let tooltipX = (barNumber - 1) * segmentWidth;

        // Ensure the tooltip card doesn't go beyond the screen edge
        tooltipX = Math.min(tooltipX, maxLeft);
        console.log('tooltipX: ', tooltipX);

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
});







// For Tide Chart
$(document).ready(function () {

    // Sample JSON data (replace this with your actual JSON data)
    const tideData = {
        "data": [
            { "x": 0, "y": 200, "Date": "", "Time": "" },
            { "x": 1, "y": 100, "Date": "", "Time": "" },
            { "x": 54, "y": 68, "Date": "11/11", "Time": "05:19" },
            { "x": 111, "y": 141, "Date": "11/11", "Time": "11:03" },
            { "x": 171, "y": 55, "Date": "11/11", "Time": "17:01" },
            { "x": 237, "y": 168, "Date": "11/11", "Time": "23:40" },
            { "x": 300, "y": 63, "Date": "11/12", "Time": "05:59" },
            { "x": 356, "y": 137, "Date": "11/12", "Time": "11:34" },
            { "x": 414, "y": 49, "Date": "11/12", "Time": "17:24" },
            { "x": 482, "y": 180, "Date": "11/13", "Time": "00:11" },
            { "x": 547, "y": 61, "Date": "11/13", "Time": "06:38" },
            { "x": 601, "y": 133, "Date": "11/13", "Time": "12:06" },
            { "x": 659, "y": 44, "Date": "11/13", "Time": "17:50" },
            { "x": 719, "y": 100, "Date": "", "Time": "" },
            { "x": 720, "y": 200, "Date": "", "Time": "" },
        ]
    };

    // Set up the SVG container
    const svg = d3.select(".s-tidechart .tide-chart-svg");

    // Calculate scaling factor based on SVG width and height
    const svgWidth = parseInt(svg.style("width"));
    const scaleFactorX = svgWidth / 720; // Assuming the original range is 0 to 720
    const svgHeight = parseInt(svg.style("height"));
    const scaleFactorY = svgHeight / 200; // Assuming the original range is 0 to 200


    // Apply scaling to x-coordinates
    const tempData = JSON.parse(JSON.stringify(tideData));
    tempData.data.forEach(d => {
        d.x = d.x * scaleFactorX;
        d.y = d.y * scaleFactorY;
    });


    // Create a smooth line generator
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        // .curve(d3.curveBasis); // Use curveBasis for a smooth curve
        .curve(d3.curveCardinal.tension(0.1)); // Adjust the tension parameter (0.7 is just an example)

    // Draw the path
    svg.append("path")
        .data([tempData.data])
        .attr("d", line)
        .attr("class", "graph")
        .attr("fill", "rgba(185, 211, 223, 0.4)");

    // Draw the path (for "chart line") stroke="#171717" stroke-width="1.5px" fill="none"
    svg.append("path")
        .data([tempData.data])
        .attr("d", line)
        .attr("class", "outline")
        .attr("stroke", "#171717")
        .attr("stroke-width", "1.5px")
        .attr("fill", "none");


    // Draw vertical strokes for each point
    const verticalStrokes = svg.selectAll("g.vertical-stroke")
        // .data(tempData.data.filter(d => d.x !== 0 && d.x !== 1 && d.x !== 719 && d.x !== 720))
        .data(tempData.data.slice(2, -2)) // Exclude first two and last two elements
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


    // Add text labels with formatted DateTime
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


    // Add text labels with formatted TideHeight
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


    // Function to update tide chart on window resize
    function updateTideChart() {
        // Calculate scaling factor based on updated SVG width and height
        const tideSvg = d3.select(".s-tidechart .tide-chart-svg");
        const tideSvgWidth = parseInt(tideSvg.style("width"));
        const scaleFactorX = tideSvgWidth / 720; // Assuming the original range is 0 to 720
        const tideSvgHeight = parseInt(tideSvg.style("height"));
        const scaleFactorY = tideSvgHeight / 200; // Assuming the original range is 0 to 200

        // Apply scaling to x-coordinates
        const tempData = JSON.parse(JSON.stringify(tideData));
        tempData.data.forEach(d => {
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
            .data([tempData.data])
            .attr("d", line);

        // Update the "outline" path with new data
        tideSvg.select(".tide-chart-svg .outline")
            .data([tempData.data])
            .attr("d", line);

        // Update vertical strokes based on new data
        const verticalStrokes = tideSvg.selectAll("g.vertical-stroke")
            .data(tempData.data.slice(2, -2));

        verticalStrokes.select("line")
            .attr("x1", d => d.x)
            .attr("x2", d => d.x)
            .attr("y1", d => d.y)
            .attr("y2", tideSvgHeight);

        // Update text labels with formatted DateTime
        verticalStrokes.select("text:nth-child(2)")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 17)
            .text(d => `${d.Date} ${d.Time}`);

        // Update text labels with tide height
        verticalStrokes.select("text:last-child")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 8)
            .text(d => {
                const tideheight = ((100 - (d.y / scaleFactorY)) / 100).toFixed(2);
                return `${tideheight} m`;
            });
    }

    // Event listener for window resize
    window.addEventListener("resize", updateTideChart);
    
});
