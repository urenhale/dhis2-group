/**
 * Methods for getting the correct JSON data for our bar chart.
 * 
 **/
function getBarJSON(birthData, areaInfo, redraw) {

    $.getJSON(birthData, function(data) {
		formatBarJSON(data);
    });

    var barJSON = function(name) {
		this.name = name;
		this.data = [];
    },

    // need to sort the JSON data in data, months aren't sorted, maybe do this in JSON file get?
    formatBarJSON = function(data) {
		var newAreaObj = new barJSON(data.rows[0][0]);

		// adding each value point to the data array
		$.each(data.rows, function(key, val) {
		    newAreaObj.data.push(Number(val[2]));
		});

		// finding area name
		$.getJSON(areaInfo, function(data2) {
		    getAreaName(data2, newAreaObj);
		});
    },

    getAreaName = function(data, areaObj) {

		$.each(data.metaData.names, function(key, val) {
		    if (key == areaObj.name) {
				areaObj.name = val;
		    };
		});
		
		addBarData(areaObj);
    },

    addBarData = function(areaObj) {
		dashboard.updateBar(areaObj, redraw);
    };
};
