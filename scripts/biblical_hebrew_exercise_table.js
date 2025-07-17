
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    var i;
   // create the exercise tables in JS on load (includes event listeners) 
   var onloadExerciseTablesClass = document.getElementsByClassName("onload-exercise-table");
   for (i = 0; i < onloadExerciseTablesClass.length; i++) {
      var thisSpec = onloadExerciseTablesClass[i];
      createExerciseTable(thisSpec);
   }	
 	
})	


// -when user clicks on correct answer word it is outlined
// and if there is a translation it is displayed beneath

function exerciseTableAnswerEventListener(ev, tableid){
	var thisElement = ev.target;
	if (thisElement.nextSibling != null){ 
       thisElement.nextSibling.classList.remove("hidden");
    }
	thisElement.classList.add("text-border-lesson-exercise-answer");

    thisElement.classList.remove("notchecked");
	
	var thisTable = document.getElementById(tableid);
	var nUnchecked = thisTable.getElementsByClassName("notchecked").length;
    if (nUnchecked == 0) {
	   var nWrong = thisTable.getElementsByClassName("lesson-exercise-wrong-answer").length;	
	   rewardModalExerciseTable(nWrong); 
    }	  
}	

// -when user clicks on wrong answer class lesson-exercise-wrong-answer is added to the word
function exerciseTableWrongAnswerEventListener(ev, tableid){
	var thisElement = ev.target;
	if (!(thisElement.classList.contains("lesson-exercise-wrong-answer"))){
		thisElement.classList.add("lesson-exercise-wrong-answer");
	}	
}	

// this not currently enabled
function exerciseTableShowTranslationEventListener(ev){
	var i;
	
	var thisElement = ev.target;
	
	var translations = thisElement.parentElement.parentElement.getElementsByClassName("js-translation");

    for (i = 0; i < translations.length; i++) {
		translations[i].classList.remove("hidden");
    }	  
}	

function reCreateExerciseTable(thisTableId){
	// thisTableId is the id of the exercise table
	
   // remove the exercise table if it exists
 	 
   var thisDiv = document.getElementById(thisTableId);	 
   if ( thisDiv != null) {
	   // remove div
	   thisDiv.parentNode.removeChild(thisDiv);
    }

   // now create the list again
   var instructionsDivId = "cr-" + thisTableId;
   var instructionsDiv =  document.getElementById(instructionsDivId);
   createExerciseTable(instructionsDiv);

}	

function createExerciseTable(thisDiv){
	// thisDiv is div with the instructions for creating the exercise table
	var r;
	var i;
    var thisTable = document.createElement("table");
    thisTable.setAttribute("id", thisDiv.id.replace("cr-",""));
    thisTable.classList.add("exercise-table");
	var translations = thisDiv.getElementsByClassName("exercise-table-translation");
	var references = thisDiv.getElementsByClassName("exercise-table-reference");
	var answerAudio = thisDiv.getElementsByClassName("exercise-table-answer-audio");
	var answers = thisDiv.getElementsByClassName("exercise-table-answer");
	
	var audioDir = thisDiv.getElementsByClassName("exercise-table-audio-dir")[0].innerHTML.trim();
	var nselectionDiv = thisDiv.getElementsByClassName("exercise-table-nselection");
	if (nselectionDiv.length > 0) {
		var nItems = nselectionDiv[0].innerHTML.trim();
		if (nItems > translations.length) {var nItems = translations.length;}
	} else 	{ 
		var nItems = translations.length;
	}

    var shuffleOrder = shuffleArray(createIntegerArray(0, translations.length-1));

	
    for (r = 0; r < nItems; r++) {
	
	   var thisRow = document.createElement("tr");
	   
	   var thisTranslation = translations[shuffleOrder[r]];
	   var thisReference = references[shuffleOrder[r]];
	   var thisAnswerAudio = answerAudio[shuffleOrder[r]];
	   var thisAnswer = answers[shuffleOrder[r]];
		 
	   var col1 = document.createElement("td");
 	   var sections = thisTranslation.innerHTML.split(globalDivider1);
	   var para = document.createElement('p');
	   for (i = 0; i < sections.length; i++) {
          var text0 = document.createTextNode(sections[i]);
	      var span0 = document.createElement("span");
		    // put a border round every second block
		  if (i % 2 == 1) {span0.classList.add("text-border-lesson-exercise-question");}
	      span0.appendChild(text0);
	      para.appendChild(span0);
       }
	   col1.appendChild(para);
	   
	   var para = document.createElement('p');
       para.classList.add("biblical-reference");
	   para.innerHTML = thisReference.innerHTML;
	   col1.appendChild(para);
		  
	   thisRow.appendChild(col1);
	   
	   var col2 = document.createElement("td");
       //col2.classList.add("w3-right-align");
	   
	   var answerDiv = document.createElement("div");
	   answerDiv.classList.add("flex-container-rtl");
	   answerDiv.classList.add("flex-container-heb-lessons-exercises");
   
	//   var audioDiv = document.createElement("div");
	//   var para = document.createElement("p");
	//   para.classList.add("start-audio");
	//   para.classList.add("clickable");
    //   addsoundclickEventListener(para); 	   
    //   audioDiv.appendChild(para);
	   
	//   var para = document.createElement("p");
	//   para.classList.add("hidden");
     //  para.innerHTML = addAudioDirToSoundName(thisAnswerAudio.innerHTML.trim(),audioDir);
//test("hello from createExerciseTable, text=" + thisAnswerAudio.innerHTML);
	//   audioDiv.appendChild(para);
	   
	//   answerDiv.appendChild(audioDiv);
	   
//  test("hello from createExerciseTable,r="+r); 
	   var thisAnswerList = thisAnswer.children;
	   var anyTranslations = false;
 	   for (i = 0; i < thisAnswerList.length; i++) {
//test("hello from createExerciseTable, r=" + r + ",thisAnswerlist.length="+ thisAnswerList.length + ", i=" + i);
          var thisAnswerDiv = document.createElement("div");
	      var para = document.createElement("p");
	      para.classList.add("hebrew30");
	      para.classList.add("clickable");
		  if (thisAnswerList[i].classList.contains("js-answer") ||
		      thisAnswerList[i].classList.contains("js-translation") ) {
				  
			  var thisAnswerWordsList =  thisAnswerList[i].children;
			  para.innerHTML = thisAnswerWordsList[0].innerHTML;
			  
              if (thisAnswerList[i].classList.contains("js-answer")) {
		         para.addEventListener("click", function(){exerciseTableAnswerEventListener(event, thisTable.id);});
			     para.classList.add("notchecked");
			  }	  
		      thisAnswerDiv.appendChild(para);
			  
			  if (thisAnswerWordsList.length > 1) {
				 var tipPara = document.createElement("p");
                 tipPara.innerHTML = thisAnswerWordsList[1].innerHTML;
				 tipPara.classList.add("flex-container-lessons-tooltip");
				 tipPara.classList.add("hidden");
				 
				 if (thisAnswerList[i].classList.contains("js-translation")){
				    tipPara.classList.add("js-translation");
					anyTranslations = true;
				 }	 
		         thisAnswerDiv.appendChild(tipPara);
			  }	


			  
		  } else {
		      para.innerHTML = thisAnswerList[i].innerHTML;
 	          para.addEventListener("click", function(){exerciseTableWrongAnswerEventListener(event, thisTable.id);});
		      thisAnswerDiv.appendChild(para);
		  }

		  answerDiv.appendChild(thisAnswerDiv);
        }      

	    col2.appendChild(answerDiv);
	   
	    var br = document.createElement("br");
	    col2.appendChild(br);
  
	    var thisAudio = document.createElement('audio');
        thisAudio.controls = 'controls';
     //  thisAudio.src = setMp3Name(questionAudio[0].innerHTML, false);
        thisAudio.src = setMp3Name(addAudioDirToSoundName(thisAnswerAudio.innerHTML.trim(),audioDir));
        thisAudio.type = 'audio/mpeg';
	    col2.appendChild(thisAudio);

	    var br = document.createElement("br");
	    col2.appendChild(br);
	   
	    thisRow.appendChild(col2);
	   
	    if (anyTranslations){
	       var col3 = document.createElement("td");
	       var span3 = document.createElement("span");
	       span3.classList.add("button-plus");
		   span3.addEventListener("click", function(){exerciseTableShowTranslationEventListener(event);});
           col3.appendChild(span3);
	       thisRow.appendChild(col3);
		}
	    thisTable.appendChild(thisRow);
 	 }

     thisDiv.appendChild(thisTable);
 //test("hello from CreateExerciseTable, thisDivid="+thisDiv.id);	
	
}


