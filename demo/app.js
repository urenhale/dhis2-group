/**
 * Shorthand function for $(document).ready().
 *
 * Function is invoked once document is marked as ready by browser.
 **/

// temporary global variable
var dashboard;

$(function () {

    dashboard = new Dashboard();


    /**
     *  All the shit beneath this line is essentially legacy shit.
     **/


    // Preparing demo data.
    // The value properties within the following object could possibly serve as another dimension
    // of data display. Currently it is only a way to differentiate the colors of the countries.
    //
    var data = [
        {
            "hc-key": "ug",
            "value": 0
        },
        {
            "hc-key": "ng",
            "value": 1
        },
        {
            "hc-key": "st",
            "value": 2
        },
        {
            "hc-key": "tz",
            "value": 3
        },
        {
            "hc-key": "sl",
            "value": 4
        },
        {
            "hc-key": "gw",
            "value": 5
        },
        {
            "hc-key": "cv",
            "value": 6
        },
        {
            "hc-key": "sc",
            "value": 7
        },
        {
            "hc-key": "tn",
            "value": 8
        },
        {
            "hc-key": "mg",
            "value": 9
        },
        {
            "hc-key": "ke",
            "value": 10
        },
        {
            "hc-key": "cd",
            "value": 11
        },
        {
            "hc-key": "fr",
            "value": 12
        },
        {
            "hc-key": "mr",
            "value": 13
        },
        {
            "hc-key": "dz",
            "value": 14
        },
        {
            "hc-key": "er",
            "value": 15
        },
        {
            "hc-key": "gq",
            "value": 16
        },
        {
            "hc-key": "mu",
            "value": 17
        },
        {
            "hc-key": "sn",
            "value": 18
        },
        {
            "hc-key": "km",
            "value": 19
        },
        {
            "hc-key": "et",
            "value": 20
        },
        {
            "hc-key": "ci",
            "value": 21
        },
        {
            "hc-key": "gh",
            "value": 22
        },
        {
            "hc-key": "zm",
            "value": 23
        },
        {
            "hc-key": "na",
            "value": 24
        },
        {
            "hc-key": "rw",
            "value": 25
        },
        {
            "hc-key": "sx",
            "value": 26
        },
        {
            "hc-key": "so",
            "value": 27
        },
        {
            "hc-key": "cm",
            "value": 28
        },
        {
            "hc-key": "cg",
            "value": 29
        },
        {
            "hc-key": "eh",
            "value": 30
        },
        {
            "hc-key": "bj",
            "value": 31
        },
        {
            "hc-key": "bf",
            "value": 32
        },
        {
            "hc-key": "tg",
            "value": 33
        },
        {
            "hc-key": "ne",
            "value": 34
        },
        {
            "hc-key": "ly",
            "value": 35
        },
        {
            "hc-key": "lr",
            "value": 36
        },
        {
            "hc-key": "mw",
            "value": 37
        },
        {
            "hc-key": "gm",
            "value": 38
        },
        {
            "hc-key": "td",
            "value": 39
        },
        {
            "hc-key": "ga",
            "value": 40
        },
        {
            "hc-key": "dj",
            "value": 41
        },
        {
            "hc-key": "bi",
            "value": 42
        },
        {
            "hc-key": "ao",
            "value": 43
        },
        {
            "hc-key": "gn",
            "value": 44
        },
        {
            "hc-key": "zw",
            "value": 45
        },
        {
            "hc-key": "za",
            "value": 46
        },
        {
            "hc-key": "mz",
            "value": 47
        },
        {
            "hc-key": "sz",
            "value": 48
        },
        {
            "hc-key": "ml",
            "value": 49
        },
        {
            "hc-key": "bw",
            "value": 50
        },
        {
            "hc-key": "sd",
            "value": 51
        },
        {
            "hc-key": "ma",
            "value": 52
        },
        {
            "hc-key": "eg",
            "value": 53
        },
        {
            "hc-key": "ls",
            "value": 54
        },
        {
            "hc-key": "ss",
            "value": 55
        },
        {
            "hc-key": "cf",
            "value": 56
        }
    ];
    
    var mapOptions;
    var mapCount = 0;

    $.each(Highcharts.maps, function (mapGroup, maps) {
	$.each(maps['features'], function(){
	    mapOptions += '<option value=' + this['properties']['hc-key'] +'>' + this['properties']['name'] + '</option>';
	});
    });
    
    $("#mapDropdown").append(mapOptions);
    
    $("#mapDropdown").change(function () {
        var $selectedItem = $("option:selected", this);
	dashboard.updateCountry($selectedItem['0'].value);

	console.log($selectedItem['0'].value);
	
	var mapKey = 'countries/'+$selectedItem['0'].value+'/' + $selectedItem['0'].value + '-all';
	updateMap(mapKey, $selectedItem.text());
    });
    
    function updateMap(mapKey, name){
	Highcharts.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function(){

	    console.log(Highcharts.maps)

	    changeMap(mapKey, name)
	});
    }

    function changeMap(mapKey, name){
	console.log("changing map")
	console.log(Highcharts.maps['mapKey'])

	$('#map').highcharts('Map', {
	    chart : {
		events: {
                    drilldown: function (e) {
			if (!e.seriesOptions) {

                            var chart = this,
                            countryCode = e.point.drilldown,
                            mapKey = 'countries/'+countryCode+'/' + countryCode + '-all',

                            // Handle error, the timeout is cleared on success
                            fail = setTimeout(function () {
				if (!Highcharts.maps[mapKey]) {
                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                    fail = setTimeout(function () {
					chart.hideLoading();
                                    }, 1000);
				}
                            }, 3000);

                            // At this point the country code and mapkey has been determined.
                            // Will use the country code and send it to the functionality that handles chart update!
                            dashboard.updateCountry(countryCode);

                            // Show the spinner
                            chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                            // Load the drilldown map
                            $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

				data = Highcharts.geojson(Highcharts.maps[mapKey]);

				// Set a non-random bogus value
				$.each(data, function (i) {
                                    this.value = i;
				});

				// Hide loading and add series
				chart.hideLoading();
				clearTimeout(fail);
				chart.addSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: data,
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    states: {
					select: {
                                            color: '#a4edba',
                                            borderColor: 'black',
                                            dashStyle: 'shortdot'
					}
                                    },
                                    point: {
					events: {
                                            click: function() {
						dashboard.updateDistrict(this.name);
                                            }
					}
                                    },
                                    dataLabels: {
					enabled: true,
					format: '{point.name}'
                                    }
				    
				    
				});
                            });
			    
			}

			this.setTitle(null, { text: e.point.name });
                    },
                    drillup: function () {
			this.setTitle(null, { text: 'Africa' });

			// Drilled up and loaded what? nothing?
			console.log("Drilled up, update charts?!")

			// "reset" countrycode.
			dashboard.countryCode = null;

                    }
		}
            },

            title : {
		text : name
            },

            subtitle : {
		text : 'Click to display data'
            },

            mapNavigation: {
		enabled: true,
		buttonOptions: {
                    verticalAlign: 'bottom'
		}
            },

            colorAxis: {
		min: 0
            },

            mapNavigation: {
		enabled: true,
		buttonOptions: {
                    verticalAlign: 'bottom'
		}
            },

            series : [{
		data : Highcharts.geojson(Highcharts.maps[mapKey]),
		mapData: Highcharts.maps[mapKey],
		joinBy: 'name',
		name: 'name',
		states: {
                    hover: {
			color: '#BADA55'
                    }
		},
		dataLabels: {
                    enabled: true,
                    format: '{point.name}'
		}
            }],

            drilldown: {
		//series: drilldownSeries,
		activeDataLabelStyle: {
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    textShadow: '0 0 3px #000000'
		},
		drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
			x: 0,
			y: 60
                    }
		}
            }
	})
	
	console.log("HI")
	console.log(Highcharts.geojson(Highcharts.maps[mapKey]))
	this.drilldown = this['hc-key'];
        this.value = this['value'];
	console.log(this.drilldownSeries)
    }
    

    $("#search").click(function() { 
        var str = $("#field").val(); 
        console.log(str);
	// alert("Handler for .click() called." + str );
        return false;
    });
    
    /**
     *  The Map will mainly serve as a way to navigate / select countries and districts.
     *
     *  Once a country or district is selected, the graphs on the right hand side (pie, line and bar)
     *  Should be updated.
     *
     *  The Search Box should have the same functionality but intergrated with Map so that the Map
     *  updates on what country have been searched / selected through the Search Box.
     **/

    // Set drilldown pointers
    $.each(data, function (i) {
        this.drilldown = this['hc-key'];
        this.value = this['value'];
    });

    // Initiate the chart
    $('#map').highcharts('Map', {

        chart : {
            events: {
                drilldown: function (e) {

                    if (!e.seriesOptions) {

                        var chart = this,
                        countryCode = e.point.drilldown,
                        mapKey = 'countries/'+countryCode+'/' + countryCode + '-all',

                        // Handle error, the timeout is cleared on success
                        fail = setTimeout(function () {
                            if (!Highcharts.maps[mapKey]) {
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                fail = setTimeout(function () {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);


                        // At this point the country code and mapkey has been determined.
                        // Will use the country code and send it to the functionality that handles chart update!
                        dashboard.updateCountry(countryCode);

                        // Show the spinner
                        chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                        // Load the drilldown map
                        $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                            data = Highcharts.geojson(Highcharts.maps[mapKey]);

                            // Set a non-random bogus value
                            $.each(data, function (i) {
                                this.value = i;
                            });

                            // Hide loading and add series
                            chart.hideLoading();
                            clearTimeout(fail);
                            chart.addSeriesAsDrilldown(e.point, {
                                name: e.point.name,
                                data: data,
                                allowPointSelect: true,
                                cursor: 'pointer',
                                states: {
                                    select: {
                                        color: '#a4edba',
                                        borderColor: 'black',
                                        dashStyle: 'shortdot'
                                    }
                                },
                                point: {
                                    events: {
                                        click: function() {
                                            dashboard.updateDistrict(this.name);
                                        }
                                    }
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            });
                        });
			
                    }

                    this.setTitle(null, { text: e.point.name });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'Africa' });

                    // Drilled up and loaded what? nothing?
                    console.log("Drilled up, update charts?!")

		    dashboard.getPieData(dashboard.countryCode);
		    dashboard.getLineData(dashboard.countryCode);
		    dashboard.getBarData(dashboard.countryCode);

                    // "reset" countrycode.
                    dashboard.countryCode = null;
                }
            }
        },

        title : {
            text : 'Countries of Africa'
        },

        subtitle : {
            text : 'Click to display data'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['custom/africa'],
            joinBy: 'hc-key',
            name: 'Africa',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }],

        drilldown: {
            //series: drilldownSeries,
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });


    /**
     *  The Slider functionality.
     *
     *  This feature will control the time dimension of the data displayed.
     *
     *
     **/
    var months = [  "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun",
                    "Jul", "Aug", "Sept",
                    "Oct", "Nov", "Dec"],

    /**
     *  Functionality for rounding down to last complete month.
     *  This makes it so that the slider scale is not assymetrical.
     *  Waste of time to create but it annoyed me.
     **/
    lastFinalMonthDate = (function() {

        var month = new Date().getMonth(),
        year = (new Date().getYear() + 1900);

        return new Date(year, month, 1);

    })();

    /**
     *  This is where the rangeslider is created.
     *
     **/
    $("#slider").dateRangeSlider({

        arrows: false,

        step: {
            months: 1
        },

        bounds: {
            min: new Date(2014, 0, 1),
            max: lastFinalMonthDate
        },

        defaultValues: {
            min: new Date(2014, 5, 1),
            max: new Date(2015, 5, 1)
        },

        scales: [{
            first: function(value){ return value; },

            end: function(value) {return value; },

            next: function(value){
                var next = new Date(value);
                return new Date(next.setMonth(value.getMonth() + 1));
            },

            label: function(value){
                return months[value.getMonth()];
            },

            format: function(tickContainer, tickStart, tickEnd){
                tickContainer.addClass("myCustomClass");
            }
        }]

    });

    /**
     *  Functionality for when the values have changed.
     *
     *  Extracting the date objects and sending them to he updateTime function
     **/
    $("#slider").bind("valuesChanged", function(e, data){
        dashboard.updateTime(data.values);
    });



});

/**
 *  Main object controlling charts & information.  
 *
 *
 **/
function Dashboard () {

    //initialize pie, line and bar charts
    this.pie = this.createPie().highcharts();
    this.line = this.createLine().highcharts();
    this.bar = this.createBar().highcharts();

    this.pieData = [];
    this.lineData = [];
    this.barData = [];

    // Current countryCode (if any);
    this.countryCode = null;

    // add initial data to pie chart and line/bar chart
    this.getPieData(this.countryCode);
    this.getLineData(this.countryCode);
    this.getBarData(this.countryCode);

}

/**
 *  Function that takes an object containing the new max and min date to show data from
 *
 **/
Dashboard.prototype.updateTime = function (timespan) {

    var startMonth = timespan.min.getMonth(),
    startYear = timespan.min.getYear(),
    endMonth = timespan.max.getMonth(),
    endYear = timespan.max.getYear();


    console.log("Update the charts to correspond with the following months/years:");
    console.log("From month nr " + startMonth + " year " + startYear);
    console.log("To month nr " + endMonth + " year " + endYear);

    console.log("sorry lord");

}

/**
 * Function that takes country code and returns data for the country (or region amirite)
 * 
 * Should get JSON from the DHIS2 API, but we haven't done that yet.
 * BUT! As we do not have the data for any other country than Sierra Leone, we will shortcut that process.
 **/
Dashboard.prototype.getPieData = function (countryCode, district) {

    if (district != null) {
        console.log("update district");
    }

    // clearing prevoiuos piedata
    this.pieData = [];

    // getting and formatting the disease data!
    getPieJSON("../data/Cholera_SL1_2.js", "../data/Cholera_SL1_1.js", false);
    getPieJSON("../data/Malaria_SL1_2.json", "../data/Malaria_SL1_1.json", false);
    getPieJSON("../data/Measles_SL1_2.json", "../data/Measles_SL1_1.json", true);

}

/**
 *  updatePie
 **/
Dashboard.prototype.updatePie = function (data, redraw) {

    this.pieData.push(data);

    if (redraw) {
	// updating this array last, pieData should be in the correct format from getPieJSON!
        this.pie.series[0].setData(this.pieData);
    }
}


/**
 *  Function that creates the Line specific data based on location selected.
 *
 *  The Bar and Line data looks different as there are multuple series instead of 4 different sets of data for each entry (each of the pizza slices).
 *
 * Should get JSON from the DHIS2 API, but we haven't done that yet.
 **/
Dashboard.prototype.getLineData = function (countryCode, district) {

    if (district != null) {
	console.log("update district plz");
    }

    //clearing previous lineData
    this.lineData = [];

    // getting and formatting the disease data
    getLineJSON("../data/Cholera_SL1_2.js", "../data/Cholera_SL1_1.js", false);
    getLineJSON("../data/Malaria_SL1_2.json", "../data/Malaria_SL1_1.json", false);
    getLineJSON("../data/Measles_SL1_2.json", "../data/Measles_SL1_1.json", true);
}

/**
 *  updateLine
 **/
Dashboard.prototype.updateLine = function (data, redraw) {
    
    this.lineData.push(data);
    
    if (redraw) {
	
	// If initializing data for start page
	if (this.line.series.length == 0) {
	    for (i = 0; i < this.lineData.length; i++) {
		this.line.addSeries(this.lineData[i]);
	    }
	} else {
	    //for updating the values/names of lineChart, lineData should be in correct format from getLineJSON
	    for (i = 0; i < this.lineData.length; i++) {
		this.line.series[i].update({name: this.lineData[i].name}, false);
		this.line.series[i].setData(this.lineData[i].data, false);
	    }
	}
	
	this.line.redraw();
    }
}

/**
 *  Function that creates the Bar specific data based on location selected.
 *
 *  The Bar and Line data looks different as there are multuple series instead of 4 different sets of data for each entry (each of the pizza slices).
 *
 * Should get JSON from the DHIS2 API, but we haven't done that yet.
 **/
Dashboard.prototype.getBarData = function (countryCode, district) {

    if (district != null) {
	console.log("update district plz");
    }

    //clearing previous lineData
    this.barData = [];

    // getting and formatting the disease data
    getBarJSON("../data/Cholera_SL1_2.js", "../data/Cholera_SL1_1.js", false);
    getBarJSON("../data/Malaria_SL1_2.json", "../data/Malaria_SL1_1.json", false);
    getBarJSON("../data/Measles_SL1_2.json", "../data/Measles_SL1_1.json", true);
}

/**
 *  updateBar
 **/
Dashboard.prototype.updateBar = function (data, redraw) {
    
    this.barData.push(data);
    
    if (redraw) {
	
	// If initializing data for start page
	if (this.bar.series.length == 0) {
	    for (i = 0; i < this.barData.length; i++) {
		this.bar.addSeries(this.barData[i]);
	    }
	} else {
	    //for updating the values/names of barChart, barData should be in correct format from getBarJSON
	    for (i = 0; i < this.barData.length; i++) {
		this.bar.series[i].update({name: this.barData[i].name}, false);
		this.bar.series[i].setData(this.barData[i].data, false);
	    }
	}
	
	this.bar.redraw();
    }
}

/**
 *  function that updates aaaaall the charts based on country
 *
 *  The pie chart needs different data than the line and bar charts.
 *  Therefore two different functions are called for getting / formatting this data.
 *
 **/
Dashboard.prototype.updateCountry = function (countryCode) {

    this.countryCode = countryCode;

    this.getLineData(countryCode);
    this.getPieData(countryCode);
    this.getBarData(countryCode);
}

/**
 *  function that updates data relevant to district shit!
 * probably time to overlad.com
 **/
Dashboard.prototype.updateDistrict = function (district) {

    this.getLineData(this.countryCode, district);
    this.getPieData(this.countryCode, district);
    this.getBarData(this.countryCode, district);
}


/**
 *  Function that handles pie chart
 **/
Dashboard.prototype.createPie = function () {

    return $('#pie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Disease shares'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Diseases',
            colorByPoint: true,
	    data: []
        }]
    });
}

/**
 *  function that creates the line chart
 *
 **/
Dashboard.prototype.createLine = function () {

    return $('#line').highcharts({
        title: {
            text: 'Monthly Average Deaths',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: Random',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Deaths'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
    });
}

/**
 * Function that creates the bar chart
 * Might need to make another set of JSON formatting functions, since this is avg births
 * TODO: should use line chart functions?
 **/
Dashboard.prototype.createBar = function () {

    return $('#bar').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Births'
        },
        subtitle: {
            text: 'Source: Random'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Children'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }
    });
}
