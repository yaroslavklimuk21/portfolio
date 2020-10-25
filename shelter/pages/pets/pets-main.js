let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open("GET", "./pets.json");
request.onload = () => {};
fetch("./pets.json")
	.then((res) => res.json())
	.then((list) => {
		pets = list;

		fullPetsList = (() => {
			let tempArr = [];

			for (let i = 0; i < 6; i++) {
				const newPets = pets;

				for (let j = pets.length; j > 0; j--) {
					let randInd = Math.floor(Math.random() * j);
					const randElem = newPets.splice(randInd, 1)[0];
					newPets.push(randElem);
				}

				tempArr = [...tempArr, ...newPets];
			}
			return tempArr;
		})();

		fullPetsList = sort863(fullPetsList);
		createPets(fullPetsList);
		for (let i = 0; i < fullPetsList.length / 6; i++) {
			const stepList = fullPetsList.slice(i * 6, i * 6 + 6);
		}
		if (currentPage <= 1) {
			prevPage.classList.add("inactive");
			first.classList.add("inactive");
		}
		let modal = document.getElementById("modal");
		let modalChilds = modal.childNodes;
		let modalContent = document.getElementsByClassName("modal-content");
		let modalList = document.getElementsByClassName("modal-list");
		let learnMoreBtns = document.querySelectorAll(".card");
		learnMoreBtns.forEach((el) => {
			el.addEventListener("click", function (e) {
				let dataId = e.target
					.closest(".card-wrapper")
					.getAttribute("data-name");
				let find = fullPetsList.find((pet) => pet.name === dataId);
				let petsId = fullPetsList.indexOf(find);
				modalChilds[1].src = fullPetsList[petsId][`img`];
				modalContent[0].children[0].innerText = fullPetsList[petsId][`name`];
				modalContent[0].children[1].innerText =
					fullPetsList[petsId][`type`] + " - " + fullPetsList[petsId][`breed`];
				modalContent[0].children[2].innerText =
					fullPetsList[petsId][`description`];
				for (let c = 0; c < modalList.length; c++) {
					modalList[c].children[0].innerHTML =
						"<b>Age:</b> " + fullPetsList[petsId][`age`];
					modalList[c].children[1].innerHTML =
						"<b>Inoculations:</b> " + fullPetsList[petsId][`inoculations`];
					modalList[c].children[2].innerHTML =
						"<b>Diseases:</b> " + fullPetsList[petsId][`diseases`];
					modalList[c].children[3].innerHTML =
						"<b>Parasites:</b> " + fullPetsList[petsId][`parasites`];
				}
			});
		});

		// let learnMoreBtns = document.querySelectorAll(".card");
		for (let s = 0; s < learnMoreBtns.length; s++) {
			learnMoreBtns[s].onclick = function () {
				document.querySelector(".modal").classList.toggle("modal-active"),
					document
						.querySelector(".popup-modal")
						.classList.toggle("popup-modal-active"),
					document.querySelector("HTML").classList.toggle("overflow");
			};
		}
		document.querySelector(".burger-wrapper").onclick = function () {
			document.querySelector(".popup").classList.toggle("popup-active"),
				document.querySelector(".burger").classList.toggle("burger-active"),
				document.querySelector(".navbar").classList.toggle("navbar-active"),
				document.querySelector(".header-nav").classList.toggle("header-mobile"),
				document
					.querySelector(".logo-title")
					.classList.toggle("logo-title__mobile"),
				document
					.querySelector(".logo-mobile")
					.classList.toggle("logo-mobile-active"),
				document
					.querySelector(".logo-description")
					.classList.toggle("logo-description__mobile"),
				document.querySelector("header").classList.toggle("header-position"),
				document.querySelector("HTML").classList.toggle("overflow");
		};
		document.querySelector(".popup").onclick = function () {
			document.querySelector(".popup").classList.toggle("popup-active");
			document.querySelector(".navbar").classList.toggle("navbar-active"),
				document.querySelector(".burger").classList.toggle("burger-active"),
				document.querySelector(".header-nav").classList.toggle("header-mobile"),
				document
					.querySelector(".logo-title")
					.classList.toggle("logo-title__mobile"),
				document
					.querySelector(".logo-mobile")
					.classList.toggle("logo-mobile-active"),
				document
					.querySelector(".logo-description")
					.classList.toggle("logo-description__mobile"),
				document.querySelector("header").classList.toggle("header-position"),
				document.querySelector("HTML").classList.toggle("overflow");
		};

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
	});

let last = document.querySelector(".last");
let first = document.querySelector(".first");
let currentPage = 1;
let cardsOnPage = 8;
let learnMoreBtns;

let prevPage = document.querySelector("#previous-page");
prevPage.addEventListener("click", (e) => {
	if (currentPage > 1) {
		currentPage--;
		document.querySelector("#current-page").innerText = currentPage;
	}
	if (document.querySelector("body").offsetWidth > 1280 && currentPage < 6) {
		nextPage.classList.remove("inactive");
		last.classList.remove("inactive");
	}
	if (currentPage <= 1) {
		prevPage.classList.add("inactive");
		first.classList.add("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 768 &&
		document.querySelector("body").offsetWidth < 1280 &&
		currentPage < 9
	) {
		nextPage.classList.remove("inactive");
		last.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 320 &&
		document.querySelector("body").offsetWidth < 768 &&
		currentPage < 16
	) {
		nextPage.classList.remove("inactive");
		last.classList.remove("inactive");
	}
});
let nextPage = document.querySelector("#next-page");
nextPage.addEventListener("click", (e) => {
	if (document.querySelector("body").offsetWidth > 1280 && currentPage < 6) {
		document.querySelector("#current-page").innerText = ++currentPage;
		if (currentPage >= 6) {
			nextPage.classList.add("inactive");
			last.classList.add("inactive");
		}
	} else if (
		document.querySelector("body").offsetWidth > 768 &&
		document.querySelector("body").offsetWidth < 1280 &&
		currentPage < 8
	) {
		document.querySelector("#current-page").innerText = ++currentPage;
	} else if (
		document.querySelector("body").offsetWidth > 320 &&
		document.querySelector("body").offsetWidth < 768 &&
		currentPage < 16
	) {
		document.querySelector("#current-page").innerText = ++currentPage;
	}
	if (currentPage > 1) {
		prevPage.classList.remove("inactive");
		first.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 768 &&
		document.querySelector("body").offsetWidth < 1280 &&
		currentPage >= 8
	) {
		nextPage.classList.add("inactive");
		last.classList.add("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 320 &&
		document.querySelector("body").offsetWidth < 768 &&
		currentPage >= 16
	) {
		nextPage.classList.add("inactive");
		last.classList.add("inactive");
	}
});
let buttons = document.querySelectorAll(".buttons");
for (let btn of buttons) {
	btn.addEventListener("click", function () {
		const elem = document.querySelector(".catalog");
		elem.innerHTML = "";
		let cardsOnPage = 8;
		const checkItemsPerPage = () => {
			if (
				document.querySelector("body").offsetWidth > 768 &&
				document.querySelector("body").offsetWidth < 1280
			) {
				cardsOnPage = 6;
			}
			if (
				document.querySelector("body").offsetWidth > 320 &&
				document.querySelector("body").offsetWidth < 768
			) {
				cardsOnPage = 3;
			}
		};
		checkItemsPerPage();
		fullPetsList / cardsOnPage;

		let start = (currentPage - 1) * cardsOnPage;
		let end = start + cardsOnPage;
		test = fullPetsList.slice(start, end);
		elem.innerHTML += createElements(test);
		learnMoreBtns = document.querySelectorAll(".card");
	});
}
last.addEventListener("click", function () {
	const elem = document.querySelector(".catalog");
	elem.innerHTML = "";
	let cardsOnPage = 8;
	const checkItemsPerPage = () => {
		if (
			document.querySelector("body").offsetWidth > 768 &&
			document.querySelector("body").offsetWidth < 1280
		) {
			cardsOnPage = 6;
		}
		if (
			document.querySelector("body").offsetWidth > 320 &&
			document.querySelector("body").offsetWidth < 768
		) {
			cardsOnPage = 3;
		}
	};
	checkItemsPerPage();
	fullPetsList / cardsOnPage;
	if (document.querySelector("body").offsetWidth > 1280) {
		document.querySelector("#current-page").innerText = currentPage = 6;
		test = fullPetsList.slice(-8);
		last.classList.add("inactive");
		nextPage.classList.add("inactive");
		first.classList.remove("inactive");
		prevPage.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 768 &&
		document.querySelector("body").offsetWidth < 1280
	) {
		document.querySelector("#current-page").innerText = currentPage = 8;
		test = fullPetsList.slice(-6);
		last.classList.add("inactive");
		nextPage.classList.add("inactive");
		first.classList.remove("inactive");
		prevPage.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 320 &&
		document.querySelector("body").offsetWidth < 768
	) {
		document.querySelector("#current-page").innerText = currentPage = 16;
		test = fullPetsList.slice(-3);
		last.classList.add("inactive");
		nextPage.classList.add("inactive");
		first.classList.remove("inactive");
		prevPage.classList.remove("inactive");
	}
	elem.innerHTML += createElements(test);
});
first.addEventListener("click", function () {
	const elem = document.querySelector(".catalog");
	elem.innerHTML = "";
	let cardsOnPage = 8;
	const checkItemsPerPage = () => {
		if (
			document.querySelector("body").offsetWidth > 768 &&
			document.querySelector("body").offsetWidth < 1280
		) {
			cardsOnPage = 6;
		}
		if (
			document.querySelector("body").offsetWidth > 320 &&
			document.querySelector("body").offsetWidth < 768
		) {
			cardsOnPage = 3;
		}
	};
	checkItemsPerPage();
	fullPetsList / cardsOnPage;
	if (document.querySelector("body").offsetWidth > 1280) {
		document.querySelector("#current-page").innerText = currentPage = 1;
		test = fullPetsList.slice(0, 8);
		first.classList.add("inactive");
		prevPage.classList.add("inactive");
		last.classList.remove("inactive");
		nextPage.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 768 &&
		document.querySelector("body").offsetWidth < 1280
	) {
		document.querySelector("#current-page").innerText = currentPage = 1;
		test = fullPetsList.slice(0, 6);
		first.classList.add("inactive");
		prevPage.classList.add("inactive");
		last.classList.remove("inactive");
		nextPage.classList.remove("inactive");
	}
	if (
		document.querySelector("body").offsetWidth > 320 &&
		document.querySelector("body").offsetWidth < 768
	) {
		document.querySelector("#current-page").innerText = currentPage = 1;
		test = fullPetsList.slice(0, 3);
		first.classList.add("inactive");
		prevPage.classList.add("inactive");
		last.classList.remove("inactive");
		nextPage.classList.remove("inactive");
	}
	elem.innerHTML += createElements(test);
});
const createPets = (petsList) => {
	let cardsOnPage = 8;
	const checkItemsPerPage = () => {
		if (
			document.querySelector("body").offsetWidth > 768 &&
			document.querySelector("body").offsetWidth < 1280
		) {
			cardsOnPage = 6;
		}
		if (
			document.querySelector("body").offsetWidth > 320 &&
			document.querySelector("body").offsetWidth < 768
		) {
			cardsOnPage = 3;
		}
	};
	checkItemsPerPage();
	let start = (currentPage - 1) * cardsOnPage;
	let end = start + cardsOnPage;
	test = fullPetsList.slice(start, end);
	const elem = document.querySelector(".catalog");
	elem.innerHTML += createElements(test);
};
createElements = (test) => {
	let str = "";
	for (let i = 0; i < test.length; i++) {
		str += `<div class="card">
		  <div class="card-wrapper full-image" data-name="${test[i].name}">
			  <img src="${test[i].img}" alt="${test[i].type}" class="card-img">
			  <h4 class="card-title">${test[i].name}</h4>
			  <button href="#" class='btn-o'>Learn more</button>
		  </div>
	  </div>`;
	}
	return str;
};
request.send();

const sort863 = (list) => {
	let unique8List = [];
	let length = list.length;
	for (let i = 0; i < length / 8; i++) {
		const uniqueStepList = [];
		for (j = 0; j < list.length; j++) {
			if (uniqueStepList.length >= 8) {
				break;
			}
			const isUnique = !uniqueStepList.some((item) => {
				return item.name === list[j].name;
			});
			if (isUnique) {
				uniqueStepList.push(list[j]);
				list.splice(j, 1);
				j--;
			}
		}
		unique8List = [...unique8List, ...uniqueStepList];
	}
	list = unique8List;

	list = sort6recursively(list);

	return list;
};

const sort6recursively = (list) => {
	const length = list.length;

	for (let i = 0; i < length / 6; i++) {
		const stepList = list.slice(i * 6, i * 6 + 6);

		for (let j = 0; j < 6; j++) {
			const duplicatedItem = stepList.find((item, ind) => {
				return item.name === stepList[j].name && ind !== j;
			});

			if (duplicatedItem !== undefined) {
				const ind = i * 6 + j;
				const which8OfList = Math.trunc(ind / 8);

				list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

				sort6recursively(list);
			}
		}
	}

	return list;
};
let controlBtns = document.querySelectorAll(".control-btns");
for (let el of controlBtns) {
	el.addEventListener("click", function () {
		learnMoreBtns = document.querySelectorAll(".card");
		let modalBtn = document.getElementById("modal-btn");
		document
			.getElementById("popup-modal")
			.addEventListener("mouseover", function () {
				modalBtn.style.backgroundColor = "#FDDCC4";
				this.addEventListener("mouseout", function () {
					modalBtn.style.backgroundColor = "transparent";
				});
			});
		let modal = document.getElementById("modal");
		let modalChilds = modal.childNodes;
		let modalContent = document.getElementsByClassName("modal-content");
		let modalList = document.getElementsByClassName("modal-list");
		let btns = document.querySelectorAll(".card");
		btns.forEach((el) => {
			el.addEventListener("click", function (e) {
				let dataId = e.target
					.closest(".card-wrapper")
					.getAttribute("data-name");
				let find = fullPetsList.find((pet) => pet.name === dataId);
				let petsId = fullPetsList.indexOf(find);
				modalChilds[1].src = fullPetsList[petsId][`img`];
				modalContent[0].children[0].innerText = fullPetsList[petsId][`name`];
				modalContent[0].children[1].innerText =
					fullPetsList[petsId][`type`] + " - " + fullPetsList[petsId][`breed`];
				modalContent[0].children[2].innerText =
					fullPetsList[petsId][`description`];
				for (let c = 0; c < modalList.length; c++) {
					modalList[c].children[0].innerHTML =
						"<b>Age:</b> " + fullPetsList[petsId][`age`];
					modalList[c].children[1].innerHTML =
						"<b>Inoculations:</b> " + fullPetsList[petsId][`inoculations`];
					modalList[c].children[2].innerHTML =
						"<b>Diseases:</b> " + fullPetsList[petsId][`diseases`];
					modalList[c].children[3].innerHTML =
						"<b>Parasites:</b> " + fullPetsList[petsId][`parasites`];
				}
			});
		});

		for (let s = 0; s < learnMoreBtns.length; s++) {
			learnMoreBtns[s].onclick = function () {
				document.querySelector(".modal").classList.toggle("modal-active"),
					document
						.querySelector(".popup-modal")
						.classList.toggle("popup-modal-active"),
					document.querySelector("HTML").classList.toggle("overflow");
			};
		}
		document.querySelector(".burger-wrapper").onclick = function () {
			document.querySelector(".popup").classList.toggle("popup-active"),
				document.querySelector(".burger").classList.toggle("burger-active"),
				document.querySelector(".navbar").classList.toggle("navbar-active"),
				document.querySelector(".header-nav").classList.toggle("header-mobile"),
				document
					.querySelector(".logo-title")
					.classList.toggle("logo-title__mobile"),
				document
					.querySelector(".logo-mobile")
					.classList.toggle("logo-mobile-active"),
				document
					.querySelector(".logo-description")
					.classList.toggle("logo-description__mobile"),
				document.querySelector("HTML").classList.toggle("overflow"),
				document.querySelector("header").classList.toggle("header-position");
		};
		document.querySelector(".popup").onclick = function () {
			document.querySelector(".popup").classList.toggle("popup-active");
			document.querySelector(".navbar").classList.toggle("navbar-active"),
				document.querySelector(".burger").classList.toggle("burger-active"),
				document.querySelector(".header-nav").classList.toggle("header-mobile"),
				document
					.querySelector(".logo-title")
					.classList.toggle("logo-title__mobile"),
				document
					.querySelector(".logo-mobile")
					.classList.toggle("logo-mobile-active"),
				document
					.querySelector(".logo-description")
					.classList.toggle("logo-description__mobile"),
				document.querySelector("header").classList.toggle("header-position"),
				document.querySelector("HTML").classList.toggle("overflow");
		};

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
	});
}
