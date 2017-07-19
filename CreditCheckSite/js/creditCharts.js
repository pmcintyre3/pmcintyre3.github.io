$(document).ready(function() {
	
	var ctx = $('#leftChart');
	var ctx2 = $('#rightChart');
	
	var data = {
		labels: ['Fair', ''],
		
		datasets: [{
			backgroundColor: ["#1982C4", "#D1D1D1"],
			data: [30, 20]
		}]
	};
		
	var data2 = {
		labels: ['Fair', ''],
		
		datasets: [{
			backgroundColor: ["#1982C4", "#D1D1D1"],
			data: [35, 15]
		}]
	}
	
	var options = {
		circumference: Math.PI,
		rotation: -1 * Math.PI,
		cutoutPercentage: 80,
		legend: {
			display: false
		}
	};
	
	var type = "doughnut";
	
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: type,

		// The data for our dataset
		data: data,

		// Configuration options go here
		options: options
	});
	
	var chart = new Chart(ctx2, {
		// The type of chart we want to create
		type: type,

		// The data for our dataset
		data: data2,

		// Configuration options go here
		options: options
	});
});