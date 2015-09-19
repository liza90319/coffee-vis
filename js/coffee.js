var chart;
var height = 200;
var width = 300;

var margin = {top:20, right:20, bottom:30, left:40};
	
var y = d3.scale.linear()
	.range([height,0]);
var x = d3.scale.ordinal()
	.range(["north", "west", "south", "central"]);
	
var svg = d3.select("body").append("svg")
	.attr("width",width + margin.left + margin.right)
	.attr("height", height + margin.top+margin.bottom)
	.append("g")
	.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	
//DEFINE YOUR VARIABLES UP HERE


//Gets called when the page is loaded.
function init(){
  chart = d3.select('#vis').append('svg');
  vis = chart.append('g');
  //PUT YOUR INIT CODE BELOW

 d3.csv('data/ProfitSumByRegion.csv',function(error,data){
	  y.domain([0,d3.max(data,function(d){return d.profit;})]);
	  
	   data.forEach(function(d){
		d.sales = +d.sales; 
		  })
	  
	  var barWidth = width / data.length;
	  
	  var bar=chart.selectAll("#vis")
	 		.data(data)
			.enter().append("g")
			.attr("transform",function(d,i){ return "translate (" + i * barWidth + "0)";});
		  
		  bar.append("rect")
		  	.attr("y",function(d){return y(d.profit);})
			.attr("height", function(d){return height - y (d.profit);})
			.attr("width", barWidth - 1);
			
		  bar.append("text")
		  	.attr("x",barWidth/2)
			.attr("y",function(d){ return y(d.profit) +3;})
			.attr("dy",".75em")
			.text(function(d){return d.profit;})
			
	 
	  
	
	 //append text for sales to body
	   d3.select("body").selectAll("div")
		.data(data)
		.enter()
		.append("div")
		.append("svg")
		.append("text")
		.text(function(d) { return d.profit;});
	  });
		

 
}




//Called when the update button is clicked
function updateClicked(){
	
	var xSelection = getXSelectedOption();
	var ySelection = getYSelectedOption();
	
	
	console.log(xSelection);
	
	if (xSelection == "region" && ySelection== "sales") {
		d3.csv('data/SalesSumByRegion.csv',update);
		
	} else if (xSelection == "category" && ySelection== "sales") {
		d3.csv('data/SalesSumByCategory.csv',update);
	}
	
	//getXSelectedOption();
	//console.log(node);
	
  
}

//Callback for when data is loaded
function update(rawdata){
  //PUT YOUR UPDATE CODE BELOW
  	rawdata.forEach(function(d){
		d.sales = +d.sales; 
		 //xx = dataset;
		 
		 console.log(d.sales);
		  })
	  
	    d3.select("#chart")
	   	.selectAll("div")
			.data(rawdata)
		.enter().append("div")
			.style("width",function(d){return d.sales / 100 + 'px'})
			.text(function(d) { return d.sales;});
		
		d3.select("body").selectAll("p")
		.data(rawdata)
		.text(function(d) { return d.sales;});
		
	
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
