


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