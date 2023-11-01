"use strict";


function addShowHideMenuItemEventListener(element){  

	 // when item clicked, shows or hides the items in the next <div>
   element.addEventListener("click", 
           function () {  showHideMenuItem(this) ;}
     );
}



function showHideMenuItem(element){

	// first hides any exercises in the parent parent div (parent of flexbox) which are visible
	// if element has the class exercise-visible removes class exercise-visible
	// else uses the id of element to show the appropriate exercise and sets class of element to exercise-visible
	
	var j;	
 	var prefix = "show-";
    var thisExerciseId = element.id.slice(prefix.length);
    var thisExercise = document.getElementById(thisExerciseId);

	if (element.classList.contains("dotted-border")){
	   // this exercise has already been selected, unselect it and remove border
       element.classList.remove("dotted-border");
       if (!(thisExercise == null)) { 
	      if (!(thisExercise.classList.contains("hidden"))) {thisExercise.classList.add("hidden");}
	   }
		
	} else{
		// this exercise not currently selected
		// remove dotted border (if any) from previous selection
		// if previous selection, unselect it
			
	    var selected = element.parentElement.getElementsByClassName("dotted-border");
		if (selected.length > 0) {
 		    var selectedExerciseId = selected[0].id.slice(prefix.length);
	        var selectedExercise = document.getElementById(selectedExerciseId);
            if (!(selectedExercise == null)) { 
	           if (!(selectedExercise.classList.contains("hidden"))) {selectedExercise.classList.add("hidden");}
			}
			selected[0].classList.remove("dotted-border");
	    }

		// select exercise referred to by this selection
	   if (!(thisExercise == null)) { thisExercise.classList.remove("hidden");}
	   
       element.classList.add("dotted-border");
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
  //  if (element.classList.contains("plus") || element.classList.contains("minus")){
  //      element.classList.toggle("minus");
  //      element.classList.toggle("plus");   
  //  }	
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
