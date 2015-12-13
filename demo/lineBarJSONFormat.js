/**
 * Methods for getting the correct JSON data for our line and bar charts.
 * 
 **/
function getLineJSON(diseaseData, diseaseInfo, redraw) {

    $.getJSON(diseaseData, function(data) {
	formatLineJSON(data);
    });

    var lineJSON = function(name) {
	this.name = name;
	this.data = [];
    }, 
    // need to sort the JSON data in data, months aren't sorted
    formatLineJSON = function(data) {
	var newDiseaseObj = new lineJSON(data.rows[0][0]);

	// adding each value point to the data array
	$.each(data.rows, function(key, val) {
	    newDiseaseObj.data.push(Number(val[2]));
	});

	//console.log("newDiseaseObj: " + JSON.stringify(newDiseaseObj));

	// finding disease name
	$.getJSON(diseaseInfo, function(data2) {
	    getDiseaseName2(data2, newDiseaseObj);
	});
    },
    getDiseaseName2 = function(data, diseaseObj) {
	
	// iterating through the name filed of data looking for disease name
	$.each(data.metaData.names, function(key, val) {
	    if (key == diseaseObj.name) {
		diseaseObj.name = val;
	    };
	});

	//console.log("diseaseObj: " + JSON.stringify(diseaseObj));

	addLineData(diseaseObj);
    },
    addLineData = function(diseaseObj) {
	console.log(diseaseObj);

	dashboard.updateBarLine(diseaseObj, redraw);
    };
};
