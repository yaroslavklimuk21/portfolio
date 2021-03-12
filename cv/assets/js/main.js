/* eslint-disable no-restricted-globals */
const htmlBar = document.querySelector('.htmlBar');
const cssBar = document.querySelector('.cssBar');
const jsBar = document.querySelector('.jsBar');
const animItems = document.querySelectorAll('.anim-items');
const timeLineItems = document.querySelectorAll('.timeline-item');
const timeLineDate = document.querySelectorAll('.timeline-date');
window.onload = () => {
	const io = new IntersectionObserver((e) => {
		if (e[0].isIntersecting) {
			htmlBar.ldBar.set(85);
			cssBar.ldBar.set(80);
			jsBar.ldBar.set(55);
			for (let i = 0; i < animItems.length; i++) {
				const animItem = animItems[i];
				animItem.classList.add('_active');
			}
		}
	}, { threshold: 0.5 });
	io.observe(htmlBar);
};

function offset(el) {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
function animOnScroll() {
	for (let i = 0; i < timeLineItems.length; i++) {
		const timeLineItem = timeLineItems[i];
		const timeLineItemHeight = timeLineItem.offsetHeight;
		const timeLineItemOffset = offset(timeLineItem).top;
		const animStart = 1;
		const dateItem = timeLineDate[i];

		// eslint-disable-next-line prefer-const
		let timeLineItemPoint = window.innerHeight - timeLineItemHeight / animStart;
		if (timeLineItemHeight > window.innerHeight) {
			timeLineItemPoint = window.innerHeight - window.innerHeight / animStart;
		}

		if ((pageYOffset > timeLineItemOffset - timeLineItemPoint)
    && pageYOffset < (timeLineItemOffset + timeLineItemHeight)) {
			timeLineItem.classList.add('_active');
			timeLineItem.classList.add('anim');
			dateItem.classList.add('point_active');
		}
	}
}
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
}
