/*
 * Methods for getting the correct JSON data for our pie chart.
 * 
 * ATM only testing with one set of disease data, Cholera_SL1_1.js
 * and Cholera_SL1_2.js.
 */
function getPieJSON(url, pieObj) {
    $.getJSON(url, function(data) {
	formatPieJSON(data, pieObj);
    });
};

function formatPieJSON(data, pieObj) {
    var newDiseaseObj = new diseaseJSON(data.rows[0][0]);

    $.each(data.rows, function(key, val) {
	newDiseaseObj.y += Number(val[2]);
    });
    console.log("newDiseaseObj: " + JSON.stringify(newDiseaseObj));

    var url = "../data/Cholera_SL1_1.js";
    $.getJSON(url, function(data2) {
	getDiseaseName(data2, newDiseaseObj, pieObj);
    });
};

function getDiseaseName(data, diseaseObj, pieObj) {
    $.each(data.metaData.names, function(key, val) {
	if (key == diseaseObj.name) {
	    diseaseObj.name = val;
	};
    });

    console.log("diseaseObj: " + JSON.stringify(diseaseObj));

    addPieData(diseaseObj, pieObj);
};

function addPieData(diseaseObj, pieObj) {
    // not very... good?
    if (pieObj instanceof pieJSON2) {
	pieObj.data.push(diseaseObj);
    } else {
	pieObj.push(diseaseObj);
    };

    console.log("pieObj: " + JSON.stringify(pieObj));  
    // add to series part of pie object here - hoooow?
    // maybe make pieJSON like the pie object in createPie()?
    // needs to be reset?
};

// better name plz
function pieJSON2() {
    this.name = "Diseases";
    this.colorByPoint = true;
    this.data = [];
};

function pieJSON(name) {
    this.name = name;
    this.y = 0;
};

function diseaseJSON(name) {
    this.name = name;
    this.y = 0;
};
