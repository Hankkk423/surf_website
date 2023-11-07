

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

    // SVG chart dimensions
    // const svgWidth = 400;
    // const svgHeight = 200;
    const svgWidth = 379;
    const svgHeight = 116;

    // Bar chart dimensions and styling
    const barSpacing = 10; // Space between bars
    const maxBarHeight = 126;
    const chartColor = "blue";

    days.forEach((dayData, index) => {
        // Create an SVG element for each day
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);

        // Append the SVG element to the corresponding chart area div
        const chartArea = document.querySelector('.s-wavechart .chart-area-' + (index + 1));
        chartArea.appendChild(svg);

        const numBars = dayData.length;
        const barWidth = (svgWidth - (numBars - 1) * barSpacing - 20) / numBars; // Subtract 20 for spacing

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

            svg.appendChild(rect);
        });
    });

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
        const barId = $(this).attr('id');
        console.log('barId: ', barId);

        // Extract the numerical part from the id attribute
        const barNumber = parseInt(barId.replace('bar', ''));
        console.log('barNumber: ', barNumber);


        ///
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
        ///



        //const tooltipX = barDataToolPos; // Adjust as needed
        console.log('tooltipX: ', tooltipX);


        // Move and show the tooltip
        $tooltipCard.css({ left: tooltipX + 'px' }).show();

        // Update the currently hovered bar
        hoveredBar = barId;


        ///////////
        // $(this).css({ 'stroke': 'black', 'stroke-width': '2' });



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
        const barId = $(this).attr('id');
        console.log('barId: ', barId);

        // Extract the numerical part from the id attribute
        const barNumber = parseInt(barId.replace('bar', ''));
        console.log('barNumber: ', barNumber);


        ///
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
        ///



        //const tooltipX = barDataToolPos; // Adjust as needed
        console.log('tooltipX: ', tooltipX);


        // Move and show the tooltip
        $tooltipCard.css({ left: tooltipX + 'px' }).show();

        // Update the currently hovered bar
        hoveredBar = barId;


        ///////////
        // $(this).css({ 'stroke': 'black', 'stroke-width': '2' });



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



