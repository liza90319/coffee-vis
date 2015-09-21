var chart;
var height = 200;
var width = 300;

var margin = {top:20, right:20, bottom:30, left:40};

var svg = d3.select("#vis").append("svg")
	.attr("width",width + margin.left + margin.right)
	.attr("height", height + margin.top+margin.bottom)
	.append("g")
	.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
var colorScale = d3.scale.category10();
//DEFINE YOUR VARIABLES UP HERE


//Gets called when the page is loaded.
function init(){
  chart = d3.select('#vis').append('svg');
  vis = chart.append('g');
  //PUT YOUR INIT CODE BELOW
	var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		//.tick(4);
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("right")
		.ticks(5);
	
		/*.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");*/
	/*var x2 = d3.scale.ordinal()
			.domain(data.map(function(d) { return d.category; }))
			.rangeRoundBands([0, width], .15);*/
		d3.csv("data/SalesSumByRegion.csv", function(error, data) {
			
			data.forEach(function(d) {
				d.sales = +d.sales;
				d.profit = +d.profit;
				
				//console.log(d.profit);
			});
			
			var colorScale = d3.scale.category10();
			
			var xRegion = d3.scale.ordinal()
				.domain(data.map(function(d) { return d.region; }))
				.rangeRoundBands([0, width], .15);
			
			var xCategory = d3.scale.ordinal()
				.domain(data.map(function(d) { return d.category; }))
				.rangeRoundBands([0, width], .15);
				
			var y = d3.scale.linear().range([height, 0]);
			
			var xAxis = d3.svg.axis()
				.scale(xRegion)
				.orient("bottom")
				//.tick(4);
			
			/*var xAxisCategory = d3.svg.axis()
				.scale(xCategory)
				.orient("bottom")
				//.tick(4);*/
				
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("right")
				.ticks(5);
				
			chart
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g");

			y.domain([0, d3.max(data, function(d) { return d.sales; })]);
		  
			chart.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis)
			.selectAll("text")
			  .style("text-anchor", "end")
			  .attr("dx", "1em")
			  .attr("dy", "1em");
			  //.attr("transform", "rotate(-90)" );
			 
			
			vis
				  .attr("class", "y axis")
				  .attr("transform", "translate("+ width +",0)")
				  .call(yAxis)
				  .append("text")
				 // .attr("y", 10)
				  .attr("dy", "5em")
				  //.style("text-anchor", "end")
				  //.text("Value ($)");
			  
			 chart.selectAll("rect")
				  .data(data)
				.enter().append("rect")
				  //.style("fill", "green")
				  .attr("x", function(d) { return xRegion(d.region); })
				  .attr("width", xRegion.rangeBand())
				  .attr("y", function(d) { return y(d.sales); })
				  .attr("height", function(d) { return height - y(d.sales); })
				  .style("fill",function(d,i){return colorScale(i);})
		});
			
	
	
	}
	


//Called when the update button is clicked
function updateClicked(){
	var xSelection = getXSelectedOption();
	var ySelection = getYSelectedOption();	
	console.log(xSelection);
	console.log(ySelection);
	//d3.csv('data/CoffeeData.csv',update);
	
	if (xSelection == "region" && ySelection== "sales") {
			console.log("load SalesSumByRegion");	
			d3.csv('data/SalesSumByRegion.csv', update);
		}
		
		else if(xSelection == "category" && ySelection== "sales"){
			console.log("load SalesSumByCategory");	
			d3.csv('data/SalesSumByCategory.csv', update);
			
			}
		
		 else if (xSelection == "region" && ySelection== "profit") {
			console.log("load data/ProfitSumByRegion.csv");	
			d3.csv('data/ProfitSumByRegion.csv',update);
		
		}
		else {
			console.log("load data/ProfitSumByCategory.csv");	
			d3.csv('data/ProfitSumByCategory.csv',update);
		}
}

//Callback for when data is loaded

function update(data){
  //PUT YOUR UPDATE CODE BELOW
	chart = d3.select('#vis').select('svg');
	var xSelection = getXSelectedOption();
	var ySelection = getYSelectedOption();
	var test = xSelection;
		
	console.log(data);
	
	data.forEach(function(d,i) {
				d.sales = +d.sales;
				d.profit = +d.profit;
				/*console.log(d.xSelection);
				console.log(d.ySelection);*/
				console.log(data[i][xSelection]);
				console.log(data[i][ySelection]);
			});
	var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .05)
			.domain(data.map(function(d) { return d[xSelection]; }));
	
			
	var y = d3.scale.linear().range([height, 0])
			.domain([0, d3.max(data, function(d) { return d[ySelection]; })]);
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		//.tick(4);
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("right")
		.ticks(5);
	
	  chart
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			  //.select(".x.axis")
			  //.call(x);
		  
		chart.select(".x.axis")
			 // .attr("class", "x axis")
			  //.attr("transform", "translate(0," + height + ")")
			  .call(xAxis)
			  .selectAll("text")
			  //.style("text-anchor", "end")
			  .attr("dx", "1em")
			  .attr("dy", "1em");
			  //.attr("transform", "rotate(-90)" );
			 
		chart.select(".y.axis")
				// .attr("class", "y axis")
				  //.attr("transform", "translate("+ width +",0)")
				  .call(yAxis)
				  .select("text")
				 .attr("y", 10)
				  .attr("dy", "20em")
				  .style("text-anchor", "end")
				  //.text("Value ($)");
			  
		chart.selectAll("rect").data(data)
				  .exit().remove();
					//.enter().select("rect")
		
		chart.selectAll("rect")
				  //.append('rect')
				  	 .style("fill",function(d,i){return colorScale(i);});
					 
		chart.selectAll("rect")	
				  .attr("x", function(d) { return d[xSelection]; })
				  .attr("width", x.rangeBand())
				  .attr("y", function(d) { return d[ySelection]; })
				  .attr("height", function(d) { return height - y(d[ySelection]); })
				 
}

// Returns the selected option in the X-axis dropdown. Use d[getXSelectedOption()] to retrieve value instead of d.getXSelectedOption()
function getXSelectedOption(){
  var node = d3.select('#xdropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}

// Returns the selected option in the X-axis dropdown. 
function getYSelectedOption(){
  var node = d3.select('#ydropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}
