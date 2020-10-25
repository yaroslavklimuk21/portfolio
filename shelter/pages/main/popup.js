document.querySelector(".burger-wrapper").onclick = function () {
	document.querySelector(".popup").classList.toggle("popup-active"),
		document.querySelector(".burger").classList.toggle("burger-active"),
		document.querySelector(".navbar").classList.toggle("navbar-active"),
		document.querySelector(".notonly").classList.toggle("padding"),
		document
			.querySelector(".logo-mobile")
			.classList.toggle("logo-mobile-active"),
		document.querySelector("HTML").classList.toggle("overflow");
};
document.querySelector(".popup").onclick = function () {
	document.querySelector(".popup").classList.toggle("popup-active");
	document.querySelector(".navbar").classList.toggle("navbar-active"),
		document.querySelector(".burger").classList.toggle("burger-active"),
		document.querySelector(".notonly").classList.toggle("padding"),
		document
			.querySelector(".logo-mobile")
			.classList.toggle("logo-mobile-active"),
		document.querySelector("HTML").classList.toggle("overflow");
};
let learnMoreBtns = document.querySelectorAll(".card");
console.log(learnMoreBtns);
for (let s = 0; s < learnMoreBtns.length; s++) {
	learnMoreBtns[s].onclick = function () {
		document.querySelector(".modal").classList.toggle("modal-active"),
			document
				.querySelector(".popup-modal")
				.classList.toggle("popup-modal-active"),
			document.querySelector("HTML").classList.toggle("overflow");
	};
}

document.querySelector(".modal-btn").onclick = function () {
	document.querySelector(".modal").classList.toggle("modal-active"),
		document
			.querySelector(".popup-modal")
			.classList.toggle("popup-modal-active"),
		document.querySelector("HTML").classList.toggle("overflow");
};
document.querySelector(".popup-modal").onclick = function () {
	document.querySelector(".modal").classList.toggle("modal-active"),
		document
			.querySelector(".popup-modal")
			.classList.toggle("popup-modal-active"),
		document.querySelector("HTML").classList.toggle("overflow");
};
let modalBtn = document.getElementById("modal-btn");
document
	.getElementById("popup-modal")
	.addEventListener("mouseover", function () {
		modalBtn.style.backgroundColor = "#FDDCC4";
		this.addEventListener("mouseout", function () {
			modalBtn.style.backgroundColor = "transparent";
		});
	});
