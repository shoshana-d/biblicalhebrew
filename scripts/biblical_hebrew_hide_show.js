"use strict";

function addShowHideNextSiblingEventListener(element){  
	 // when item clicked, shows or hides the items in the next sibling, usually a div
   element.addEventListener("click", 
           function () {  ShowHideNextSibling(this) ;}
     );
}

function addShowHideNextItemEventListener(element){ 

	 // when item clicked, shows or hides the items in the next element with class = "nextItem"
   element.addEventListener("click", 
           function () {  ShowHideNextItem(this) ;}
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
	// relates to the optional  "Contents" header at the top of the menu items
	// only used in alefbetplus
	
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
	var arrowClick = document.getElementsByClassName("arrowclick");
    if (arrowClick.length > 0){	turnOffArrowSound();}  // in biblical_hebrew_flexbox_list.js
	
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

//----------------------------------------------------------------------------------------------

function ShowHideNextItem(element){

	var i;
    var docElements = document.getElementsByTagName("*");
	var afterElement = false;
    for (i=0; i < docElements.length; i++){
	  if (docElements[i] == element) {afterElement = true; }
      if (afterElement){
        if (docElements[i].classList.contains("nextItem")) {
            docElements[i].classList.toggle("hidden"); 
            if (element.classList.contains("button-plus") || element.classList.contains("button-minus")){
                element.classList.toggle("button-minus");
                element.classList.toggle("button-plus");   
            }	
			break;
		 }	 
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
