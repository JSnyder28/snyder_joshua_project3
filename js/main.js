// Joshua Snyder
// VFW 1211
// Project 2

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

			// getElementById Function.
			function $(x) {
					var _element = document.getElementById(x);
					return _element;
			};

			// Create select field element and populate with options.
			function makeCats() {
					var formTag = document.getElementsByTagName('form'),
							selectLi = $('select'),
							makeSelect = document.createElement('select');
							makeSelect.setAttribute('id', 'category');
					for(var i=0, j=foodCategories.length; i<j; i++) {
							var makeOption = document.createElement('option');
							var optText = foodCategories[i];
							makeOption.setAttribute('value', optText);
							makeOption.innerHTML = optText;
							makeSelect.appendChild(makeOption);
					}
					selectLi.appendChild(makeSelect);
			};

			// Find value of checkbox.
			var getCheckboxValue = function () {
					if($('goToMeal').checked) {
							favoriteValue = $('goToMeal').value;
					} else {
							favoriteValue = "No";
					}
			};

			// Toggle form visibility on/off.
			var toggleControls = function (t) {
					switch(t) {
							case "on":
									$('addRcpForm').style.display = "none";
									$('clearAll').style.display 	= "inline";
									$('viewLink').style.display 	= "none";
									$('addRcp').style.display 		= "inline";
									break;
							case "off":
									$('addRcpForm').style.display = "block";
									$('clearAll').style.display 	= "inline";
									$('viewLink').style.Display 	= "inline";
									$('addRcp').style.display 		= "none";
									$('items').style.display 			= "none";
									break;
							default:
									return false;
					}
			};

			function storeData() {
					var id = Math.floor(Math.random()*100000001);
					// Gather all form values and store it as an object.
					// Object properties contain an array with form labels and inout values.
					getCheckboxValue();
							var item 						= {};
							item.cat 				= ["Category:", $('category').value];
							item.date 			= ["Date Added", $('dateAdded').value];
							item.rcpName 		= ["Recipe Name:", $('rcpName').value];
							item.directions = ["Directions:", $('directions').value];
							item.favorite 	= ["Go-To-Meal?:", favoriteValue];
							item.rating 		= ["Rating:", $('rating').value];				
					// Save data to local storage using stringify.
					localStorage.setItem(id, JSON.stringify(item));
					alert("Recipe added!");
					window.location.reload();
			};

			var getData = function () {
					toggleControls("on");
					if(localStorage.length === 0) {
							alert("No recipes to view");
					};
					// Write data from the local storage to the browser.
					var makeDiv = document.createElement('div');
					makeDiv.setAttribute("id", "items");
					var makeList = document.createElement('ul');
					makeDiv.appendChild(makeList);
					document.body.appendChild(makeDiv);
					// Just in case "items" doesn't display through the toggle function.
					$('items').style.display 			= "block";
					for(var i=0, j=localStorage.length; i<j; i++) {
							var makeLi = document.createElement('li');
							makeList.appendChild(makeLi);
							var key 	= localStorage.key(i);
							var value = localStorage.getItem(key);
							var obj 	= JSON.parse(value);
							// JSON.parse converts local storage string value to an object.
							var makeSubList = document.createElement('ul');
							makeLi.appendChild(makeSubList);
							for(var l in obj) {
									var makeSubLi = document.createElement('li');
									makeSubList.appendChild(makeSubLi);
									var optSubText = obj[l][0] + " " + obj[l][1];
									makeSubLi.innerHTML = optSubText;
							}
					} 
			};

			var clearData = function () {
					if(localStorage.length === 0) {
							alert("You have no saved recipes!");
					} else {
						localStorage.clear();
						alert("All recipes have been removed");
						window.location.reload();
						return false;
					}
			};

			// Variable Defaults
			var foodCategories = ["--Choose One--", "American", "Chinese", "Italian", "Japanese", "Mexican", "Seasonal"];
					favoriteValue = "No";
			makeCats();

			// Set Link $ Submit Click Events
			var viewLink = $('viewLink');
			viewLink.addEventListener('click', getData);
			var clearLink = $('clearAll');
			clearLink.addEventListener('click', clearData);
			var save = $('addIt');
			save.addEventListener('click', storeData);
});
