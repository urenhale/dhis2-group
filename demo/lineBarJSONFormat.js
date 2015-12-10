/*
 * Methods for getting the correct JSON data for our line and bar charts.
 * 
 */
function getLineJSON(url1, url2, redraw) {
    $.getJSON(url1, function(data) {
	formatLineJSON(data);
    });

    var lineJSON = function(name) {
	this.name = name;
	this.data = [];
    }, 
    // need to sort the JSON data in data, months aren't sorted
    formatLineJSON = function(data) {
	var newDiseaseObj = new lineJSON(data.rows[0][0]);

	$.each(data.rows, function(key, val) {
	    newDiseaseObj.data.push(Number(val[2]));
	});

	//console.log("newDiseaseObj: " + JSON.stringify(newDiseaseObj));

	$.getJSON(url2, function(data2) {
	    getDiseaseName2(data2, newDiseaseObj);
	});
    },
    getDiseaseName2 = function(data, diseaseObj) {
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
