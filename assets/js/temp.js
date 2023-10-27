// For Tooltip Card
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
        const chartAreaWidth = $('.s-wavechart .chart-area').width();
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