"use strict";

// split string by one or more spaces
//const arr = str.trim().split(/\s+/);

//		  const checkanswer = document.createElement("button");
//      checkanswer.setAttribute('type', 'button');


// -- in alefbet-exercises, exercise to divide hebrew words into syllables

function addConsonantClickEventListener(element){
   // add event listener to make the space to the left of the letter visible when clicked
   element.addEventListener("click", function() {
	   this.nextElementSibling.classList.remove("hidden");
   });
}

function addSpaceClickEventListener(element){
   // add event listener to make the space invisible when clicked
   element.addEventListener("click", function() {
	   this.classList.add("hidden");
   });
}

function addCheckClickEventListener(element){
   element.addEventListener("click", function() {
	   var i;
	   var thisIdNumber = this.parentElement.id.slice(13);   // "syllablesItem" + i
       var thisCorrectAnswer = document.getElementById("syllablesCorrectAnswer" + thisIdNumber).innerHTML;
	   var thisProposedAnswerParent = document.getElementById("syllablesProposedAnswer" + thisIdNumber);
       var thisProposedAnswer = "";
       for (i = 0; i < thisProposedAnswerParent.childElementCount; i++) {
		   if (!(thisProposedAnswerParent.children[i].classList.contains("hidden"))){
			  thisProposedAnswer = thisProposedAnswer + thisProposedAnswerParent.children[i].innerHTML;
		   }	  
	   } 
	   if ( thisProposedAnswer == thisCorrectAnswer ) {
	      this.classList.add("hidden");
	      this.nextElementSibling.classList.remove("hidden");
	      this.previousElementSibling.classList.add("hidden");
		  if (syllablesFinished(this)) {
	         rewardModal("xx"); 
	      }
       } else {
		   syllablesModal(thisCorrectAnswer);
       }	  

	  

   });
}

function syllablesFinished(thisSpec){
   // thisSpec is is the "Check" span
   // if all the elements with the tick are visible then we're finished
   var i;
   var finished = true;	
   const syllablesFlexdiv = thisSpec.parentElement.parentElement;
   const correct = syllablesFlexdiv.getElementsByClassName("tick");
   for (i = 0; i < correct.length; i++) {
      if (correct[i].classList.contains("hidden")){
		 finished = false;
		 break;
	  }	 
   }
   return finished;
}              

function reCreateSyllablesExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications

   var j;
   
   	// first, delete existing list
      // get the id of the flexbox list
   var thisSpecElement = document.getElementById(thisSpecId);
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var targetId = null;
   for (j = 0; j < parameters.length; j++) {
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
			break;
		 } 
   }
   if (targetId==null ) { return;}	// have to specify an id


    // now remove the list if it exists
   var thisList = document.getElementById(targetId);	 
   if (!( thisList== null)) {
	   // remove list
	   thisList.parentNode.removeChild(thisList);
    }
	
   // now create the list again
   crSyllablesExercise(thisSpecElement); 
}

function crSyllablesExercise(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the cantillation exercise
 
    // For each set of inputs:
	//    - sounds specified in <p> separated by |
	//    - hebrew words divided into syllables specified in <div> separated by <p> (tooltips)
    var i;
    var j;

   // set the default specifications for the syllables exercise
    var sourceSoundIds = null;
    var sourceSyllableIds = null;
	var targetId = null;
	
    var audioDir = "words";  
   
    var flexboxClass = "flex-container-ltr"; // used for all example flexboxes
    var containerClass = "flex-container-examples";  
    var hebrewClass = "hebrew35"; 
    var colorClass = "vocab-color";
    var nSelection = 10; //number of items to be randomly selected for each exercise
    //var nSelection = 0;  // use this for testing
	
   // get the specifications for the syllables exercise
  //------------------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);

   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 
		 if (thisP0 == "sourcesyllables"){
		    sourceSyllableIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
         } else if (thisP0 == "selection"){
	        nSelection = thisP[1].trim();
		 } 
   }		

   // check same number of sources
    if (!(sourceSyllableIds.split(globalDivider2).length == sourceSoundIds.split(globalDivider2).length)) {return;}

    // get contents of new flexbox
    //----------------------------
	var sound0 = [];
	var syllables0 = [];
    for (i = 0; i < sourceSyllableIds.split(globalDivider2).length; i++) {
	   var sound1 = getFromHTML(sourceSoundIds.split(globalDivider2)[i].trim(), false);
       var syllables1 = getFromHTML(sourceSyllableIds.split(globalDivider2)[i].trim(), true);  // true cos in separate paragraphs
	   sound0 = sound0.concat(sound1);
	   syllables0 = syllables0.concat(syllables1);
	}	

    // check same number of items in both lists
    if (!(syllables0.length == sound0.length)) { return;}

      // randomly select nSelection items
     var syllables = [];
     var sound = [];
	  
    if (nSelection > 0) {	  
        var selectionList = shuffleArray(createIntegerArray(0, syllables0.length-1));
	    for (j=0; j < nSelection; j++) { 
	       syllables[j] = syllables0[selectionList[j]];
	       sound[j] = sound0[selectionList[j]];
	    }	 
    } else {
		// only used when testing
	    for (j=0; j < sound0.length; j++) { 
	       syllables[j] = syllables0[j];
	       sound[j] = sound0[j];
	    }	 
    }
	
	
       // now create the new flexbox
	   //---------------------------
	   
    const flexdiv = document.createElement("div");
    
	flexdiv.classList.add(flexboxClass);
	flexdiv.classList.add(containerClass);
    flexdiv.setAttribute("id", targetId);
    if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
   
	 // now add contents of each flexbox cell
 
    for (i=0; i < syllables.length; i++){
		//var theseSyllables = syllables[i].trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
		               // syllables separated by a single space
		               // in case original had more than one space somewhere

		//var thisHebrewWord = "";
		//---------------------
		//for (j = 0; j < theseSyllables.length; j++) {
		//   thisHebrewWord = thisHebrewWord + theseSyllables[j];
		//}
	
		var thisHebrewWord = wordFromSyllables(syllables[i]);
		//-------------------------------------------------
		
		var thisHebrewWordInSyllables = removeExtraSpaces(syllables[i]); // in case original had more than one space somewhere
		//---------------------------------------
		          
		//for (j = 1; j < theseSyllables.length ; j++) {
		//   thisHebrewWordInSyllables = thisHebrewWordInSyllables + " ";
		//   thisHebrewWordInSyllables = thisHebrewWordInSyllables + theseSyllables[j];
		//}

		var thisHebrewWordLetters = [];
		//-------------------------
        var thisHebrewWordLettersIndex = -1;
		var letters = thisHebrewWord.trim().split("");  // divides into consonants and vowels
        var thisConsonant = letters[0];
        for (j = 1; j < letters.length; j++) {
	       if (isConsonant(letters[j])){
		      thisHebrewWordLettersIndex = thisHebrewWordLettersIndex + 1;
		      thisHebrewWordLetters[thisHebrewWordLettersIndex] = thisConsonant;
		      thisConsonant = letters[j];
	      } else {
		      thisConsonant = thisConsonant + letters[j]  ;
	      }	  
        }
        thisHebrewWordLettersIndex = thisHebrewWordLettersIndex + 1;
        thisHebrewWordLetters[thisHebrewWordLettersIndex] = thisConsonant;

        // create an item in the flexlist for this word
		  const celldiv = document.createElement("div");
          celldiv.setAttribute("id", "syllablesItem" + i);
		  
	      // create the cell with the Hebrew word to be divided, this has sound attached
          const text1= document.createTextNode(thisHebrewWord);
          const span1 = document.createElement("span");
	      span1.classList.add(hebrewClass);
	      span1.classList.add("soundclick");
          span1.appendChild(text1);
          celldiv.appendChild(span1);
 		  
          //const thisSound = audioDir + "/" + sound[i].trim();
          const thisSound = addAudioDirToSoundName(sound[i].trim(), audioDir);
	      const text2= document.createTextNode(thisSound);
          const para2 = document.createElement("para");
	      para2.classList.add("hidden");
	      para2.appendChild(text2);
          celldiv.appendChild(para2);
			  
		  const br1 = document.createElement("br");
	      celldiv.appendChild(br1);
		  const br2 = document.createElement("br");
		  celldiv.appendChild(br2);
	 
	      // create the cell with the word divided into letters (separated at consonants)
          const para3 = document.createElement("para");
	            
		  for (j = 0; j < thisHebrewWordLetters.length -1; j++) {
             var text0 = document.createTextNode(thisHebrewWordLetters[j]);
	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
		     span0.classList.add("consonantclick");
	         span0.classList.add(hebrewClass);
	         span0.appendChild(text0);
	         para3.appendChild(span0);
				   
			 // add space between letters	   
               //var text00 = document.createTextNode(&emsp);
             var text00 = document.createTextNode(" ");
	         var span00 = document.createElement("span");
	         span00.classList.add(hebrewClass);
		     span00.classList.add("clickable");
		     span00.classList.add("spaceclick");
		     span00.classList.add("hidden");
	         span00.appendChild(text00);
	         para3.appendChild(span00);
				   
          }
		     var text0 = document.createTextNode(thisHebrewWordLetters[thisHebrewWordLetters.length -1]);
	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
	         span0.appendChild(text0);
	         para3.appendChild(span0);

          para3.setAttribute("id", "syllablesProposedAnswer" + i);
		  para3.classList.add("flex-container-tooltip"); // dotted border
		  para3.classList.add(hebrewClass);
		  
          celldiv.appendChild(para3);
		  
		  const br3 = document.createElement("br");
		  celldiv.appendChild(br3);
		  const br4 = document.createElement("br");
		  celldiv.appendChild(br4);
		  
	      // create button to check whether answer correct
          const text4 = document.createTextNode("Check");
          const span4 = document.createElement("span");
	      span4.classList.add("underline");
	      span4.classList.add("soundclick");
	      span4.classList.add("checkclick");
          span4.appendChild(text4);
		  
		  celldiv.appendChild(span4);
		  
	      // create correct answer indicator
          const text5 = document.createTextNode("");
          const span5 = document.createElement("span");
	      span5.classList.add("hidden");
	      span5.classList.add("tick");
          span5.appendChild(text5);
		  
          celldiv.appendChild(span5);
		  
	      // create the cell with the correct division into syllables, for checking with proposed answer
          const text6 = document.createTextNode(thisHebrewWordInSyllables);
          const span6 = document.createElement("span");
	      span6.classList.add("hidden");
          span6.setAttribute("id", "syllablesCorrectAnswer" + i);
	      span6.classList.add(hebrewClass);
          span6.appendChild(text6);
		  
          celldiv.appendChild(span6);

           	  
          flexdiv.appendChild(celldiv);
	}	
 
 // add order to each cell (used when shuffling)
   const divs = flexdiv.children;
   for (i=0; i < divs.length; i++){ divs[i].style.order = i; }

 // add event listeners to flexbox
   var flexdivElements =  flexdiv.getElementsByTagName("*");
   for (i=0; i < flexdivElements.length; i++){
     if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("spaceclick")) {
		 addSpaceClickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("consonantclick")) {
		 addConsonantClickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("checkclick")) {
		 addCheckClickEventListener(flexdivElements[i]);
	 }	 
	 
   } 
   

 // add flexbox to document	
   //var thisElement = document.getElementById(insertElementId);
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}


// end