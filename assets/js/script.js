

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



// For Tooltip Card
$(document).ready(function () {
    // Select the tooltip elements
    const $tooltipContainer = $('.s-chart .tooltip-container');
    const $tooltipCard = $('.s-chart .tooltip-card');

    // Select the chart bars and add unique IDs to each
    const $chartBars = $('.s-chart .each-bar');
    $chartBars.each(function (index) {
        $(this).attr('id', 'bar' + (index + 1));
    });

    // Track the currently hovered bar
    let hoveredBar = null;

    // Handle hover events for each bar
    $chartBars.on('mouseenter', function () {
        const barId = $(this).attr('id');

        console.log('barId: ', barId);


        // Calculate the position of the tooltip based on the hovered bar
        const barX = parseInt($(this).attr('x'));
        console.log('barX: ', barX);


        // Get the position of the currently hovered bar
        const barPosition = $(this).position().left;
        console.log('barPosition: ', barPosition);


        // Extract the numerical part from the id attribute
        const barNumber = parseInt(barId.replace('bar', ''));
        console.log('barNumber: ', barNumber);


        // Read the data-toolpos attribute
        const barDataToolPos = parseFloat($(this).data('toolpos'));
        console.log('barDataToolPos: ', barDataToolPos);



        ///
        // Calculate the width of the chart area (1/3 of the available space)
        const chartAreaWidth = $('.s-chart .chart-area').width();
        console.log('chartAreaWidth: ', chartAreaWidth);
        
        // Calculate the width of each segment (for 8 bars in 1/3 space)
        const segmentWidth = chartAreaWidth / 8;
        console.log('segmentWidth: ', segmentWidth);
        
        // Calculate the position of the tooltip based on the bar number and screen size
        const tooltipX = (barNumber - 1) * segmentWidth;
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