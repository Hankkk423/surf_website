

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