
"use strict";
// split string by one or more spaces
//const arr = str.trim().split(/\s+/);

function addStressedSyllableEventListener(element){
   // add event listener to add "stressed-syllable"class to the stressed syllable when clicked
   element.addEventListener("click", function() {
	   this.classList.add("stressed-syllable");
	   
	   if (cantillationFinished(this)) {
	       rewardModal("xx"); 
       }	  

   });
}

function cantillationFinished(thisSpec){
   // thisSpec is one of the boxes with syllables in the cantillation flexbox
   // this box has is a <span> with class cantillation-click
   // if all the elements with class cantillation-click also have class stressed-syllable then we're finished  
   var i;
   var finished = true;	
   const questionsFlexdiv = thisSpec.parentNode.parentNode.parentNode;
   const syllables = questionsFlexdiv.getElementsByClassName("cantillation-click");
   for (i = 0; i < syllables.length; i++) {
      if (!(syllables[i].classList.contains("stressed-syllable"))){
		 finished = false;
		 break;
	  }	 
   }
   return finished;
}              

function reCreateCantillationList(thisSpecId){
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
   crCantillationList(thisSpecElement);

}


//function createCantillationList(insertElementId,whichList){
function crCantillationList(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the cantillation exercise
	
    // For each set of inputs:
	//    - sounds specified in <p> separated by |
	//    - hebrew words divided into syllables specified in <div> separated by <p> (tooltips)
   var i;
   var j;

  // set the default specifications for the cantillation exercise 
   var sourceSyllableIds = null;
   var sourceSoundIds  = null; 
   var stress  = null;
   var targetId = null;  // the id of the list to be created
  
   var whichList = "all"
   var audioDir = "words";  
   var containerClass = "flex-container-cantillation";  
   var hebrewClass = "hebrew35"; 
   var syllablesClass = "hebrew35";
   var colorClass = "vocab-color";
   var nSelection = 10; //number of items to be randomly selected for each exercise
  
   // get the specifications for the cantillation exercise
  //------------------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);

   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 
		 if (thisP0 == "whichlist") {
		    whichList = thisP[1].trim();
         } else if(thisP0 == "sourcesyllables"){
		    sourceSyllableIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "stress"){
		    stress = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
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
 	if (!(sourceSoundIds.split(globalDivider2).length == stress.split(globalDivider2).length)) {return;}


    // get contents of new flexbox
    //----------------------------
	var sound0 = [];
	var syllables0 = [];
	var whichSyllable0 = [];
    for (i = 0; i < sourceSyllableIds.split(globalDivider2).length; i++) {
	   var sound1 = getFromHTML(sourceSoundIds.split(globalDivider2)[i].trim(), false);
       var syllables1 = getFromHTML(sourceSyllableIds.split(globalDivider2)[i].trim(), true);  // true cos in separate paragraphs
       var whichSyllable1 = [];
       for (j = 0; j < sound1.length; j++) {
		   whichSyllable1[j] = stress.split(globalDivider2)[i].trim();
	   }
	   sound0 = sound0.concat(sound1);
	   syllables0 = syllables0.concat(syllables1);
	   whichSyllable0 = whichSyllable0.concat(whichSyllable1);
	}	

    // check same number of items in both lists
    if (!(syllables0.length == sound0.length)) { return;}

     // randomly select nSelection items
    var syllables = [];
    var sound = [];
	var whichSyllable = [];
	   
    var selectionList = shuffleArray(createIntegerArray(0, syllables0.length-1));
	for (j=0; j < nSelection; j++) { 
	    syllables[j] = syllables0[selectionList[j]];
	    sound[j] = sound0[selectionList[j]];
	    whichSyllable[j] = whichSyllable0[selectionList[j]];
	}	 

       // now create the new flexbox
	   //---------------------------

    const flexdiv = document.createElement("div");
   
	flexdiv.classList.add(containerClass);
    flexdiv.setAttribute("id", targetId);
    if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
	   
	 // now add contents of each flexbox cell
	 
    for (i=0; i < syllables.length; i++){

	      var theseSyllables = syllables[i].trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
          var stressedSyllableNumber =  getStressedSyllableNumber(syllables[i], whichSyllable[i]);
          var thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(syllables[i], stressedSyllableNumber, sound[i],whichList));
		  const celldiv = document.createElement("div");
		  
          const span1 = document.createElement("span");
          const text1= document.createTextNode(thisHebrew);
	      span1.classList.add(hebrewClass);
	      span1.classList.add("soundclick");
          span1.appendChild(text1);
          celldiv.appendChild(span1);
		  
          //const thisSound = audioDir + "/" + sound[i].trim();
          const span2 = document.createElement("span");
          const thisSound = addAudioDirToSoundName(sound[i], audioDir);
	      const text2= document.createTextNode(thisSound);
	      span2.classList.add("hidden");
	      span2.appendChild(text2);
          celldiv.appendChild(span2);
	 
	      // create the cell with the word divided into syllables
           const para4 = document.createElement("p");
	            
		  for (j = 0; j < theseSyllables.length; j++) {
             var text0 = document.createTextNode(theseSyllables[j]);
 	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
			 if (j  == stressedSyllableNumber) {
				span0.classList.add("cantillation-click");
			 }
	         span0.appendChild(text0);
	         para4.appendChild(span0);
				   
			 // add space between syllables 	   
               //var text00 = document.createTextNode(&emsp);
             var text00 = document.createTextNode(" ");
	         var span00 = document.createElement("span");
	         span00.appendChild(text00);
	         para4.appendChild(span00);
				   
          }
		  para4.classList.add("flex-container-heb-tooltip"); // dotted border
		  if (!(syllablesClass == null)){para4.classList.add(syllablesClass);}

          celldiv.appendChild(para4);
      	  
          flexdiv.appendChild(celldiv);
	}	
 //test(thisSpecElement.id + " " + i); 
 // add order to each cell (used when shuffling)
 //   const divs = flexdiv.children;
 //  for (i=0; i < divs.length; i++){ divs[i].style.order = i; }

 // add event listeners to flexbox
   var flexdivElements =  flexdiv.getElementsByTagName("*");
   for (i=0; i < flexdivElements.length; i++){
     if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	 }else  if (flexdivElements[i].classList.contains("cantillation-click")) {
		 addStressedSyllableEventListener(flexdivElements[i]);
	 }	 
	 
   } 
   

 // add flexbox to document	
   //var thisElement = document.getElementById(insertElementId);
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}

	
function addCantillationToStressedSyllable(syllables, stressedSyllableNumber, audio, whichList = "all")	{
   		   // combine syllables into word with random cantillation mark on stressed syllable
    var j;
	
	var theseSyllables = syllables.trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables

	if (whichList == "all"){var thisCantillation = getCantillationCode(audio);}
	else if (whichList == "pashta-kadma"){var thisCantillation = getCantillationCodePashtaKadma();}
	
    if ((thisCantillation[0] == "pashta") && (stressedSyllableNumber == theseSyllables.length - 1)){
       // add pashta at end of last syllable   
	   theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";
		
    } else {

       theseSyllables[stressedSyllableNumber] = addCantillation(theseSyllables[stressedSyllableNumber], thisCantillation[1]);
	   if (thisCantillation[0] == "pashta") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";} 
	   if (thisCantillation[0] == "sof") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u05C3";} 
    }		   

    var syllablesWithCantillation = theseSyllables[0];
	if (theseSyllables.length > 1 ){
	   for (j = 1; j < theseSyllables.length ; j++) {
		  syllablesWithCantillation = syllablesWithCantillation + " ";
		  syllablesWithCantillation = syllablesWithCantillation + theseSyllables[j];
       }
	}   
    return syllablesWithCantillation;

}	


function addCantillation(inputSyllable, inputCantillation){	
   var i;		  
   var cantillationAdded = false;			  
   var letters = inputSyllable.trim().split("");
   var thisSyllable = letters[0];
   for (i=1; i < letters.length; i++){
	  if (isConsonant(letters[i])) {
		 if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}
		 cantillationAdded = true;
      }
      thisSyllable = thisSyllable + letters[i];				  
   }
   if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}	
   
   return thisSyllable;
}


function getCantillationCode(thisAudio = "xxxx"){
	var i;

    const cantillationCodes1 = ["\u05A5","\u05A3"];
    const cantillationNames1 = ["mercha","munach"];	
	
	  // not sof or etnachta
    const cantillationCodes2 = ["\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames2 = ["tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
							   
    const cantillationCodes3 = ["\u05BD","\u0591","\u0591","\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames3 = ["sof","etnachta","etnachta","tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
    const audio1 = ["w005_et","w005_vuhet","w007_al","w008_el","w009_asher","w013_bnei","w016_kaasher",
	                      "w024_lifnei","w028_ydei","w033_ad","w039_arei","w044_im","w060_ehn","w071_al"];
	const audio2 = ["w014_ki","w043_hinei","w043_vhinei","w072_acharei","w085_koh","w086_mah","w095_tachat","w095_mitachat"];
	
	var answer = [];
	
	var audioMatch = false;
	var thisAudio = thisAudio.trim().toLowerCase();
	
	for (i = 0; i < audio1.length; i++) {
	   if (thisAudio == audio1[i].trim().toLowerCase()){
          var codeNumber = getRandomInteger(0, cantillationCodes1.length - 1);
	      answer[0] = cantillationNames1[codeNumber];
	      answer[1] = cantillationCodes1[codeNumber];
		  audioMatch = true;
		  break;
	   }	  
	}	
		
	if (!audioMatch) {
	   for (i = 0; i < audio2.length; i++) {
	      if (thisAudio == audio2[i].trim().toLowerCase()){
             var codeNumber = getRandomInteger(0, cantillationCodes2.length - 1);
	         answer[0] = cantillationNames2[codeNumber];
	         answer[1] = cantillationCodes2[codeNumber];
		     audioMatch = true;
		     break;
		  }	 
	   }	  

       if (!audioMatch) {
          var codeNumber = getRandomInteger(0, cantillationCodes3.length - 1);
	      answer[0] = cantillationNames3[codeNumber];
	      answer[1] = cantillationCodes3[codeNumber];
	   }	   

	}	

    return answer;
 }	 

function getCantillationCodePashtaKadma(){

    const cantillationCodes = ["\u05A8","\u05A8"];
    const cantillationNames = ["kadma","pashta"];	

  // Returns a random integer from 0 to 9:
  //Math.floor(Math.random() * 10);
    var codeNumber = Math.floor(Math.random() * cantillationCodes.length);
	var answer = [];
	answer[0] = cantillationNames[codeNumber];
	answer[1] = cantillationCodes[codeNumber];
	
    return answer;
 }	 



function testArray(){
	var ttarray = [];
	ttarray[3] = "hello";
	test(ttarray);
	// ok
	ttarray.length = 0;
	test("this is the array with zero length:" + ttarray);
	
}	


function testCantillation(){  

  var p1 = document.getElementById("test1").innerHTML.trim();
  var p2 = document.getElementById("test2").innerHTML.trim();
  
  var cant1 = "";
  var cant2 = "";
  var list = "";
   // sof
  cant1 = "\u05BD";
   // pasuk
  cant2 = "\u05C3";
  list = list + " " + p1 + cant1 + p2 + cant2;
  
   cant2 = ""
 
 // etnachta
   cant1 = "\u0591";
  list = list + " " + p1 + cant1 + p2 + cant2;

 //tipcha
   cant1 = "\u0596";
   list = list + " " + p1 + cant1 + p2 + cant2;

 //tvir
   cant1 = "\u059B";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mercha
   cant1 = "\u05A5";
   list = list + " " + p1 + cant1 + p2 + cant2;
//munach
   cant1 = "\u05A3";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mapach
   cant1 = "\u05A4";
   list = list + " " + p1 + cant1 + p2 + cant2;
//darga
   cant1 = "\u05A7";
   list = list + " " + p1 + cant1 + p2 + cant2;
//katan
   cant1 = "\u0594";
   list = list + " " + p1 + cant1 + p2 + cant2;
//zakef gadol
   cant1 = "\u0595";
   list = list + " " + p1 + cant1 + p2 + cant2;
//rvii
   cant1 = "\u0597";
   list = list + " " + p1 + cant1 + p2 + cant2;
//azla
   cant1 = "\u059C";
   list = list + " " + p1 + cant1 + p2 + cant2;
//gershayim
   cant1 = "\u059E";
   list = list + " " + p1 + cant1 + p2 + cant2;
//pazer
   cant1 = "\u05A1";
   list = list + " " + p1 + cant1 + p2 + cant2;

   // kadma
  cant1 = "\u05A8";
    list = list + " " + p1 + cant1 + p2 + cant2;
 
  // pashta 
   cant1 = "\u05A8";
   cant2 = "\u0599";
   list = list + " " + p1 + cant1 + p2 + cant2;
  
 
 test(list);

}