/*Funcitonality from : https://stackoverflow.com/questions/16031970/how-to-position-an-unordered-list-in-a-circle */
$(function() {
	circle_radius = 100;
	$links = $('options ul li a');
	total_links = $links.size();
	$links.each(function(index) {
		$(this).attr('data-index',index);
		animateCircle($(this), 1);
	});
	$('li a').hover(function() {
		animateCircle($(this), 1.1)
	}, function() {
		animateCircle($(this), 1)

	});
	
	function animateCircle($link, expansion_scale) {
		index = $link.attr('data-index');
		radians = 2*Math.PI*(index/total_links);
		x = -(Math.sin(radians)*circle_radius*expansion_scale);
		y = -(Math.cos(radians)*circle_radius*expansion_scale);
		$link.animate({ top: x+'px', left: y+'px' }, 200);
	}
});