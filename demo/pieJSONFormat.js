/*
 * Methods for getting the correct JSON data for our pie chart.
 * 
**/
function getPieJSON(url1, url2, redraw) {

    $.getJSON(url1, function(data) {
	   formatPieJSON(data);
    });


    var pieJSON = function (name) {
            this.name = name;
            this.y = 0;   
        },

        formatPieJSON = function (data) {

            var newDiseaseObj = new pieJSON(data.rows[0][0]);

            $.each(data.rows, function(key, val) {
               newDiseaseObj.y += Number(val[2]);
            });

            //console.log("newDiseaseObj: " + JSON.stringify(newDiseaseObj));

            // Finding disease name
            $.getJSON(url2, function(data2) {
               getDiseaseName(data2, newDiseaseObj);
            });
        },

        getDiseaseName = function (data, diseaseObj) {
            $.each(data.metaData.names, function(key, val) {

                if (key == diseaseObj.name) {
                    diseaseObj.name = val;
                };
            });

            //console.log("diseaseObj: " + JSON.stringify(diseaseObj));

            addPieData(diseaseObj);
        },

        addPieData = function (diseaseObj) {

            console.log(diseaseObj);

            dashboard.updatePie(diseaseObj, redraw);
        };

};