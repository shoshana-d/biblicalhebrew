"use strict";

	// hebrew global constants
	// vowels
	const schwah = "\u05B0";
	const chatafSegol = "\u05B1";
	const chatafPatach = "\u05B2";
	const chirik = "\u05B4";
	const tsere = "\u05B5";
	const segol = "\u05B6";
	const patach = "\u05B7";
	const kamatz = "\u05B8";
	const cholam = "\u05B9";
	const dagesh = "\u05BC";
	// consonants
	const alef = "\u05D0";
	const bet = "\u05D1";
	const dalet = "\u05D3";
	const heh = "\u05D4";
    const vav = "\u05D5";
	const yod = "\u05D9";
	const finalChaf = "\u05DA";
	const chaf = "\u05DB";
	const lamed = "\u05DC";
	const mem = "\u05DE";
	const finalMem = "\u05DD";
	const nun = "\u05E0";
	const finalNun = "\u05DF";
	const ayin  = "\u05E2";
	const peh = "\u05E3";
	const resh = "\u05E8";
	const tav = "\u05EA";
	
	// cantillation mark to indicate stressed syllable
	const rvii = "\u0597";
	const kadma = "\u05A8";
	const mapach = "\u05A4";
	
	const hairsp = "\u200A"; // hairspace
	const thinsp = "\u2009"; 

function crReferenceTableSectionHeaderRow(thisHeader){
	
	var thisRow = document.createElement("tr");
	   
	var thisCol = document.createElement("td");
	thisCol.colSpan = "50";
    thisCol.classList.add("reference-table-section-heading");
    thisCol.appendChild(document.createTextNode(thisHeader));
 	thisRow.appendChild(thisCol);


    return thisRow;
}

	
function crSpaceBetweenTables(){
    // create a space between tables
	var thisPara = document.createElement("p");
	thisPara.appendChild(document.createElement("br"));
	
	return thisPara;
}	


	
function crNoteAboutStressedSyllable(){
 	var thisNote = document.createElement("p");

    thisNote.appendChild(document.createTextNode("Note: Where the stress is on the secondlast syllable, this is indicated by cantillation mark  "));
  	   	  var image1 = document.createElement("img");
	      image1.src = setJpgName("mapach", "vowels");
	      image1.classList.add("cantillation-image-intext");
          thisNote.appendChild(image1);
    thisNote.appendChild(document.createTextNode(" or cantillation mark "));
 	   	  var image1 = document.createElement("img");
	      image1.src = setJpgName("kadma", "vowels");
	      image1.classList.add("cantillation-image-intext");
          thisNote.appendChild(image1);
	return thisNote;
}	

