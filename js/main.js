// Joshua Snyder
// VFW 1211
// Project 3

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

	// getElementById Function.
	function $(x) {
			var _element = document.getElementById(x);
			return _element;
	};

	// Create select field element and populate with options.
	function makeCats() {
			var formTag 	= document.getElementsByTagName('form'),
				selectLi 	= $('select'),
				makeSelect 	= document.createElement('select');
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
							$('addRcpForm').style.display 	= "none";
							$('clearAll').style.display 	= "inline";
							$('viewLink').style.display 	= "none";
							$('addRcp').style.display 		= "inline";
							break;
					case "off":
							$('addRcpForm').style.display 	= "block";
							$('clearAll').style.display 	= "inline";
							$('viewLink').style.Display 	= "inline";
							$('addRcp').style.display 		= "none";
							$('items').style.display 		= "none";
							break;
					default:
							return false;
			}
	};

	// Validates the input fields
	var checkFields = function () {
		var catInput 		= $('category').value;	
			rcpNameInput 	= $('rcpName').value;
			directionsInput = $('directions').value;
			valid 			= true;
		if ( catInput == foodCategories[0] ) {
			alert("Please select a Food Category");
			valid = false;
		} 
			// Needs a conditional for the date added input.
		if ( rcpNameInput == "" ) {
			alert("Please add a Recipe Name");
			valid = false;
		}
		if (directionsInput == "") {
			alert("Please add the Directions");
			valid = false;
		}
		return valid;

		//console.log(directionsInput);
	};

	function storeData() {
			var id = Math.floor(Math.random()*100000001);
			// Gather all form values and store it as an object.
			// Object properties contain an array with form labels and inout values.
			getCheckboxValue();
					var item 		= {};
					item.cat 		= ["Category:", $('category').value];
					item.date 		= ["Date Added", $('dateAdded').value];
					item.rcpName 	= ["Recipe Name:", $('rcpName').value];
					item.directions = ["Directions:", $('directions').value];
					item.favorite 	= ["Go-To-Meal?:", favoriteValue];
					item.rating 	= ["Rating:", $('rating').value];				
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
					var makeLi 	= document.createElement('li');
					var linksLi	= document.createElement('li');
					makeList.appendChild(makeLi);
					var key 	= localStorage.key(i);
					var value 	= localStorage.getItem(key);
					var obj 	= JSON.parse(value);
					// JSON.parse converts local storage string value to an object.
					var makeSubList = document.createElement('ul');
					makeLi.appendChild(makeSubList);
					for(var l in obj) {
							var makeSubLi = document.createElement('li');
							makeSubList.appendChild(makeSubLi);
							var optSubText = obj[l][0] + " " + obj[l][1];
							makeSubLi.innerHTML = optSubText;
							makeSubList.appendChild(linksLi);
					}
					// Creates edit and delete link, or button, for each local storage item
					makeItemLinks(localStorage.key(i), linksLi);
			} 
	};

	// Make Item links
	// Creates the edit and delete links for each local storage item
	var makeItemLinks = function (key, linksLi) {
		// adds an individual item edit link
		var editLink 		= document.createElement('a');
		editLink.href 		= "#";
		editLink.key		= key;
		var editText		= "Edit Recipe";
		//editLink.addEventListener('click', editItem);
		editLink.innerHTML	= editText;
		linksLi.appendChild(editLink);

		// Adds a linke break to seperate the edit and delete links
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		// Adds a individual tem delete link
		var deleteLink		= document.createElement('a');
		deleteLink.href	= "#";
		deleteLink.key		= key;
		var deleteText		= "Delete recipe";
		//deleteLink.addEventListener('click', deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
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

	// eventListeners
	var viewLink = $('viewLink');
	viewLink.addEventListener('click', getData);
	var clearLink = $('clearAll');
	clearLink.addEventListener('click', clearData);
	var checkForm = $('addIt');
	checkForm.addEventListener('click', checkFields);
	var save = $('addIt');
	save.addEventListener('click', storeData);
});
