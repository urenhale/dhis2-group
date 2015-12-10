/*
 * Methods for getting the correct JSON data for our line and bar charts.
 * 
 * ATM only testing with one set of disease data, Cholera_SL1_1.js
 * and Cholera_SL1_2.js.
 */
function getLineJSON(url, lineObj) {
    $.getJSON(url, function(data) {
	formatLineJSON(data, lineObj);
    });
};

// need to sort the JSON data in data, months aren't sorted
function formatLineJSON(data, lineObj) {
    var newDiseaseObj = new lineJSON(data.rows[0][0]);

    $.each(data.rows, function(key, val) {
	newDiseaseObj.data.push(Number(val[2]));
    });
    console.log("newDiseaseObj: " + JSON.stringify(newDiseaseObj));

    var url = "../data/Cholera_SL1_1.js";
    $.getJSON(url, function(data2) {
	getDiseaseName2(data2, newDiseaseObj, lineObj);
    });
};

//find a better name
function getDiseaseName2(data, diseaseObj, lineObj) {
    $.each(data.metaData.names, function(key, val) {
	if (key == diseaseObj.name) {
	    diseaseObj.name = val;
	};
    });

    console.log("diseaseObj: " + JSON.stringify(diseaseObj));

    addLineData(diseaseObj, lineObj);
};

function addLineData(diseaseObj, lineObj) {
    if (lineObj instanceof lineJSON) {
	lineObj.data.push(diseaseObj);
    } else {
	lineObj.push(diseaseObj);
    };
    
    console.log("lineObj: " + JSON.stringify(lineObj));  
    // add to series part of line object here - hoooow?
    // needs to be reset?
};

function lineJSON(name) {
    this.name = name;
    this.data = [];
};
