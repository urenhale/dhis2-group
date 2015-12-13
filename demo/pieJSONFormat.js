/**
 * Methods for getting the correct JSON data for our pie chart.
 * 
 **/
function getPieJSON(diseaseData, diseaseInfo, redraw) {

    $.getJSON(diseaseData, function(data) {
	   formatPieJSON(data);
    });

    var pieJSON = function (name) {
        this.name = name;
        this.y = 0;
    },

    formatPieJSON = function (data) {
        var newDiseaseObj = new pieJSON(data.rows[0][0]);

	   // summing the data points for the disease
        $.each(data.rows, function(key, val) {
            newDiseaseObj.y += Number(val[2]);
        });

        // Finding disease name
        $.getJSON(diseaseInfo, function(data2) {
            getDiseaseName(data2, newDiseaseObj);
        });
    },
    
    getDiseaseName = function (data, diseaseObj) {

	// iterate through the name field in data looking for disease name
        $.each(data.metaData.names, function(key, val) {
            if (key == diseaseObj.name) {
                diseaseObj.name = val;
            };
        });

        addPieData(diseaseObj);
    },
    addPieData = function (diseaseObj) {
        dashboard.updatePie(diseaseObj, redraw);
    };

};
