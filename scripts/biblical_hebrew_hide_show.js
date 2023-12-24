"use strict";


function addShowHideMenuItemEventListener(element){  

	 // when item clicked, shows or hides the items in the next <div>
   element.addEventListener("click", 
           function () {  showHideMenuItem(this) ;}
     );
}

function addShowHideMenuItemAlefbetPlusEventListener(element){  

	 // when item clicked, shows or hides the items in the next <div>
   element.addEventListener("click", 
           function () {  showHideMenuItemAlefbetPlus(this) ;}
     );
}



function showHideMenuItem(element){

	// first hides any exercises in the parent parent div (parent of flexbox) which are visible
	// if element has the class exercise-visible removes class exercise-visible
	// else uses the id of element to show the appropriate exercise and sets class of element to exercise-visible
	
	var j;	
 	var prefix = "show-";
    var thisMenuItemTextId = element.id.slice(prefix.length);
    var thisMenuItemText = document.getElementById(thisMenuItemTextId);

	if (element.classList.contains("menu-item-selected")){
		
	     //  this exercise has already been selected, flag unselected,  remove border and set button to plus
         element.classList.remove("menu-item-selected");
         element.classList.remove("dotted-border");
		 
		 var thisPlusMinusButton = element.firstElementChild;
         thisPlusMinusButton.classList.toggle("button-minus");
         thisPlusMinusButton.classList.toggle("button-plus");   
		 
		 // hide text
         if (!(thisMenuItemText == null)) { 
	         if (!(thisMenuItemText.classList.contains("hidden"))) {thisMenuItemText.classList.add("hidden");}
	      }
   
		
	} else{
		// this exercise not currently selected
		
		// if previous selection, unselect it
	    var selected = element.parentElement.getElementsByClassName("menu-item-selected");
		if (selected.length > 0) {
			var prevSelected = selected[0];
			// hide previous selected item content
 		    var selectedExerciseId = prevSelected.id.slice(prefix.length);
	        var selectedExercise = document.getElementById(selectedExerciseId);
            if (!(selectedExercise == null)) { 
	           if (!(selectedExercise.classList.contains("hidden"))) {selectedExercise.classList.add("hidden");}
			}
			// remove formatting showing selected from menu item
			prevSelected.classList.remove("dotted-border");
			// remove selected flag
            prevSelected.classList.remove("menu-item-selected");			
			// set button to plus
            prevSelected.firstElementChild.classList.toggle("button-minus");
            prevSelected.firstElementChild.classList.toggle("button-plus");   

	    }

		// select exercise referred to by this selection
	    if (!(thisMenuItemText == null)) { thisMenuItemText.classList.remove("hidden");}
	   
	   	// flag menu item as selected
        element.classList.add("menu-item-selected");
		element.classList.add("dotted-border");
			// set button to plus
        element.firstElementChild.classList.toggle("button-minus");
        element.firstElementChild.classList.toggle("button-plus");   
  
    }	
	
}	


function showHideMenuItemAlefbetPlus(element){

    // in order to click a menu item the menu must be visible (obviously)
	// on clicking
	// - use id of element to show the appropriate text item by removing "hidden" class
	// - set menu to hidden
	// - add plus sign and clickable to contents
	// When Contents clicked:
	//  if menu is visible, do nothing
	//  if menu is not visible
	//    - set all text items to "hidden"
	//    - make menu visible
	//    - remove plus sign and Clickable from Contents

	var i;

	   // has the user clicked on "Contents"?
	if (!(element.parentElement.classList.contains("flex-container-menu-items-alefbetplus"))){
          // yes
		  // only need to do something if the menu is not visible
	   if (element.nextElementSibling.classList.contains("hidden")) {
		   // set the current item contents to hidden
	       var selected = document.getElementsByClassName("alefbet-detail-item");
		   for (i=0; i < selected.length; i++) {
              if (!(selected[i].classList.contains("hidden"))) {selected[i].classList.add("hidden");}
		   }
           // set menu to visible
           element.nextElementSibling.classList.remove("hidden");
		   // remove + sign and clickable from "Contents"
		   element.firstElementChild.classList.remove("button-plus");
       }

    } else {
       // user has clicked on a menu item	
	   // show appropriate menu item text
 	    var prefix = "show-";
        var thisExerciseId = element.id.slice(prefix.length);
        var thisExercise = document.getElementById(thisExerciseId);
	    if (!(thisExercise == null)) { thisExercise.classList.remove("hidden");}
        // hide menu
        element.parentElement.classList.add("hidden");
	    //  remove plus sign and Clickable from Contents
        element.parentElement.previousElementSibling.firstElementChild.classList.add("button-plus");

    }	   
}	

//----------------------------------------------------------------------------------------------
function addShowHideNextSiblingEventListener(element){  
	 // when item clicked, shows or hides the items in the next sibling, usually a div
   element.addEventListener("click", 
           function () {  ShowHideNextSibling(this) ;}
     );
}

function ShowHideNextSibling(element){
    var nextSib =  element.nextElementSibling;
    nextSib.classList.toggle("hidden"); 

    var nextChild = element.firstElementChild;  
	if (!( nextChild == null)) {
      if (nextChild.classList.contains("button-plus") || nextChild.classList.contains("button-minus")){
        nextChild.classList.toggle("button-minus");
        nextChild.classList.toggle("button-plus");   
      }	
	}	
}	


//-------------------------------------------------------------------------

function showHideJsToggle(elementId, buttonId){
	// hides/shows child elements with class list "js-toggle" in the specified element
	// toggles +/- in the button
	var j;

	var parentDiv = document.getElementById(elementId);

    var toggleClass = parentDiv.getElementsByClassName("js-toggle");
    for (j = 0; j < toggleClass.length; j++) {
		toggleClass[j].classList.toggle("hidden");
	}	
	
 	var button = document.getElementById(buttonId);

    button.classList.toggle("button-plus");
    button.classList.toggle("button-minus");  
	
}	

//-----------------------------------------------------------------------------------

function JumpToHidden(id1, id2){
	// id1 is the id with HideShowNNextDiv It is never hidden
	// id2 is within the div after id1 and may be hidden
   test("hi");	
   var nextDiv = document.getElementById(id1).nextElementSibling;
   if (nextDiv.classList.contains("hidden")){ 
         nextDiv.classList.toggle("hidden");  
   }  
   window.scrollTo(0, document.getElementById(id2).offsetTop);
}
