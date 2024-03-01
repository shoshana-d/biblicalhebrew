"use strict";

function addShowHideNextSiblingEventListener(element){  
	 // when item clicked, shows or hides the items in the next sibling, usually a div
   element.addEventListener("click", 
           function () {  ShowHideNextSibling(this) ;}
     );
}

function addShowHideMenuEventListener(element){
	// when "Contents" clicked, makes menu items visible
   element.addEventListener("click", 
           function () {  showHideMenu(this) ;}
     );
}	

function addShowHideMenuItemEventListener(element){  
	 // when item clicked, shows or hides the div specified in the element's id (show-xxx)
   element.addEventListener("click", 
           function () {  showHideMenuItem(this, false) ;}
     );
}

function addShowHideMenuItemHideMenuEventListener(element){  
	 // when item clicked, shows or hides the div specified in the element's id (show-xxx)
   element.addEventListener("click", 
           function () {  showHideMenuItem(this, true) ;}
     );
}


function addMenuContentCloseBtnEventListener(element){  
	 // when close button in menu item clicked
   element.addEventListener("click", 
           function () {  menuContentCloseBtn(this) ;}
     );
}

//-------------------------------------------------------------------------------

function showHideMenu(element){
	// relates to the "Contents" header at the top of the menu items
	
	// if the menu contents are visible, don't do anything
	// if the menu contents are not visible, show them and remove + button
	if (element.nextElementSibling.classList.contains("hidden")) {
       // set menu to visible
       element.nextElementSibling.classList.remove("hidden");
	  // remove + sign and clickable from "Contents"
	   element.firstElementChild.classList.remove("button-plus");
    }
}	

function menuContentCloseBtn(element){
	// stop any audio that's playing in arrow of javascript list
	turnOffArrowSound();  // in biblical_hebrew_flexbox_list.js
	
	// hide this menu item content
	element.parentElement.parentElement.classList.add("hidden");
	
	// mark item in menu as unselected
 	var prefix = "show-";
    var thisMenuItemId = prefix + element.parentElement.parentElement.id;
	var thisMenuItem = document.getElementById(thisMenuItemId);
    thisMenuItem.classList.remove("menu-item-selected");

    thisMenuItem.firstElementChild.classList.toggle("button-minus");
    thisMenuItem.firstElementChild.classList.toggle("button-plus");   

	// show menu
	thisMenuItem.parentElement.classList.remove("hidden");
	
	// remove + from optional Contents header
	var contents = thisMenuItem.parentElement.previousElementSibling;
	if (contents.classList.contains("showhidemenuclick")) {
	   contents.firstElementChild.classList.remove("button-plus");
	}   
	
}	
	
function showHideMenuItem(element, hideMenu){
	
	// if menu item is already selected (menu-item-selected and content visible) 
	//       sets to unselected and hides content
	// if menu item is not already selected
	//       checks whether any other menu item selected, if so, unselects (removes menu-item-selected and hides content)
	//       sets item to selected (uses the id of the element to show the appropriate content)
	
	var j;	
 	var prefix = "show-";
    var thisMenuItemTextId = element.id.slice(prefix.length);
    var thisMenuItemText = document.getElementById(thisMenuItemTextId);

	if (element.classList.contains("menu-item-selected")){
		
	     //  this exercise has already been selected, flag unselected, and set button to plus
         element.classList.remove("menu-item-selected");
		 
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
			// set button to plus
        element.firstElementChild.classList.toggle("button-minus");
        element.firstElementChild.classList.toggle("button-plus");   
		
	// optionally, hide menu and add + to (optional) Contents header
	   if (hideMenu) {
          element.parentElement.classList.add("hidden");

          var contents = element.parentElement.previousElementSibling;
		  if (contents.classList.contains("showhidemenuclick")) {

	          contents.firstElementChild.classList.add("button-plus");
          }
	   }  
    }	
	
}	



//----------------------------------------------------------------------------------------------

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
	// only used with onclick
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
//-----------------------------------------------------------------------------------

function JumpToHidden(id1, id2){
	// id1 is the id with HideShowNNextDiv It is never hidden
	// id2 is within the div after id1 and may be hidden
   var nextDiv = document.getElementById(id1).nextElementSibling;
   if (nextDiv.classList.contains("hidden")){ 
         nextDiv.classList.toggle("hidden");  
   }  
   window.scrollTo(0, document.getElementById(id2).offsetTop);
}

function oldaddShowHideMenuItemAlefbetPlusEventListener(element){  

	 // when item clicked, shows or hides the items in the next <div>
   element.addEventListener("click", 
           function () {  showHideMenuItemAlefbetPlus(this) ;}
     );
}

function oldshowHideMenuItemAlefbetPlus(element){

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
	    //  add plus sign and Clickable to Contents
        element.parentElement.previousElementSibling.firstElementChild.classList.add("button-plus");

    }	   
}	

// is this used???

function oldaddShowHideSpecifiedIdEventListener(element){  

	 // when item clicked, shows or hides the items in the element with id=XXX
	 // element has id show-XXX
   element.addEventListener("click", 
           function () {  showHideSpecifiedId(this) ;}
     );
}

function oldshowHideSpecifiedId(element){
 // toggles classes button-plus and button minus in element's first child
 // element has id show-XXX
 // toggles class hidden in element with id XXX
	
	var j;	
 	var prefix = "show-";
    var thisShowHideItemId = element.id.slice(prefix.length);
    var thisShowHideItem = document.getElementById(thisShowHideItemId);
	
	element.firstElementChild.classList.toggle("button-plus");
	element.firstElementChild.classList.toggle("button-minus");
	thisShowHideItem.classList.toggle("hidden");

}	
