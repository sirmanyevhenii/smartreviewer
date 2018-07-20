// burger menu
$('.toggle-btn').click(function() {
	$('.top-menu').toggleClass('top-menu--active');
	$('.toggle-btn').toggleClass('active');
});

$(document).click(function(event) {
	if ($(event.target).closest('.toggle-btn').length ) return;
	$('.toggle-btn').removeClass('active');
	$('.top-menu').removeClass('top-menu--active');
	event.stopPropagation();
});

// scroll
$(function() {
    $('.smooth').on('click', function(event) {
        let target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 750);
        }
    });
});

// masonry
$('.catalog').masonry({
	columnWidth: '.catalog-item',
	itemSelector: '.catalog-item',
	// percentPosition: true,
	horizontalOrder: true,
	isFitWidth: true,
	gutter: 16
});