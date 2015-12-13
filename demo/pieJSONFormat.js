/**
 * Methods for getting the correct JSON data for our pie chart.
 *
 * For performance gains the data should not be picked up again if
 * we already got them. (esp if we are just changing the time?)
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

    /**
     * yv1 - constructed year value for sifting out data not applicable.
     * yv2 - same as above.
    **/
    formatPieJSON = function (data) {

        var newDiseaseObj = new pieJSON(data.rows[0][0]),
            yv1 = 201501 + dashboard.monthStart,
            yv2 = 201501 + dashboard.monthEnd;

        // summing the data points for the disease
        // skip value if out of bounds
        $.each(data.rows, function(key, val) {

            var date = Number(val[1]);

            if (date > yv1 && date < yv2) {
                newDiseaseObj.y += Number(val[2]);
            }
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
    // this sends the newly acquired data to 
    addPieData = function (diseaseObj) {
        dashboard.updatePie(diseaseObj, redraw);
    };

};
