"use strict";

  // user has clicked a +/- button
  // replaces showhidenextsiblingclick
function ShowHideParentNextSibling(element){
    var nextSib =  element.parentElement.nextElementSibling;
    nextSib.classList.toggle("hidden"); 

    element.classList.toggle("button-minus");
    element.classList.toggle("button-plus");   
}	


//----------------------------------------------------------------------------------------------

  // user has clicked a +/- button
  // toggles next element with class nextItem
function ShowHideNextItem(element){

	var i;
    var docElements = document.getElementsByTagName("*");
	var afterElement = false;
    for (i=0; i < docElements.length; i++){
	  if (docElements[i] == element) {afterElement = true; }
      if (afterElement){
        if (docElements[i].classList.contains("nextItem")) {
            docElements[i].classList.toggle("hidden"); 
            element.classList.toggle("button-minus");
            element.classList.toggle("button-plus");   
			break;
		 }	 
	  }		 
    }		 
}	

//----------------------------------------------------------------------------------------------


function showHideMenuItem(element, hideMenu=false){
	
	// if menu item is already selected (menu-item-selected and content visible) 
	//       sets to unselected and hides content
	// if menu item is not already selected
	//       checks whether any other menu item selected, if so, unselects (removes menu-item-selected and hides content)
	//       sets item to selected (uses the id of the element to show the appropriate content)
	
	var j;	
 	var prefix = "show-";
    var thisMenuItemTextId = element.parentElement.id.slice(prefix.length);
    var thisMenuItemText = document.getElementById(thisMenuItemTextId);

	if (element.parentElement.classList.contains("menu-item-selected")){
		// only applies if hideMenu is false, in which case the selected menu item will have a dotted frame
		// if hideMenu true then can't click on menu item if it's already selected
		
	     //  this exercise has already been selected, flag unselected, and set button to plus
         element.parentElement.classList.remove("menu-item-selected");
		 
		 //var thisPlusMinusButton = element.firstElementChild;
         element.classList.toggle("button-minus");
         element.classList.toggle("button-plus");   
		 
		 // hide text
         if (!(thisMenuItemText == null)) { 
	         if (!(thisMenuItemText.classList.contains("hidden"))) {thisMenuItemText.classList.add("hidden");}
	     }
   
		
	} else{
		// this exercise not currently selected
		
		// if previous selection, unselect it
	    var selected = element.parentElement.parentElement.getElementsByClassName("menu-item-selected");
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
        element.parentElement.classList.add("menu-item-selected");
			// set button to plus
        element.classList.toggle("button-minus");
        element.classList.toggle("button-plus");   
		
	// optionally, hide menu 
	   if (hideMenu) {
          element.parentElement.parentElement.classList.add("hidden");
	   }  
    }	
	
}	




//function addMenuContentCloseBtnEventListener(element){  
//	 // when close button in menu item clicked
 //  element.addEventListener("click", 
//           function () {  menuContentClose(this) ;}
//     );
//}

//-------------------------------------------------------------------------------

function menuContentClose(element){
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

//----------------------------------------------------------------------------------------------

//function ShowHideNextSibling(element){
//    var nextSib =  element.nextElementSibling;
//    nextSib.classList.toggle("hidden"); 
//
 //   var nextChild = element.firstElementChild;  
//	if (!( nextChild == null)) {
//      if (nextChild.classList.contains("button-plus") || nextChild.classList.contains("button-minus")){
//        nextChild.classList.toggle("button-minus");
//        nextChild.classList.toggle("button-plus");   
//      }	
//	}	
//}	



//-------------------------------------------------------------------------

   // when called from Javascript
function JSshowHideJsToggle(ev){
	var buttonId = ev.target.id;

 	var prefix = "btn-";
    var elementId = buttonId.slice(prefix.length);
	showHideJsToggle(elementId, buttonId);
}
	
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


