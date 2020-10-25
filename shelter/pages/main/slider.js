$(document).ready(function () {
	$(".ourfriends-slider").slick({
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true,
		arrows: true,
	});
});
$(".ourfriends-slider").on("swipe", function (event, slick, direction) {
	for (let j = 0; j < card.length; j++) {
		let random = Math.floor(Math.random() * 8);
		card[j].children[0].src = pets[random][`img`];
		card[j].children[0].alt = pets[random][`type`];
		card[j].children[1].innerText = pets[random][`name`];
		card[j].setAttribute("data-id", `${pets[random][`id`]}`);
	}
});
