//https://bl.ocks.org/joegoldwasser/6d48607ecf792afcd14aad9e63c87d14

var svg = d3.select("svg"),
   margin = 20,
   diameter = +svg.attr("width"),
   g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleSequential(d3.interpolateViridis)
   .domain([-4, 4]);


var pack = d3.pack()
   .size([diameter - margin, diameter - margin])
   .padding(2);


var shot_type = "shot_selection";


//https://bl.ocks.org/joegoldwasser/6d48607ecf792afcd14aad9e63c87d14

d3.json("kobe_temp.json", function(error, root) {
     if (error) throw error;


     root = d3.hierarchy(root)
         .sum(function(d) { return d.size; })
         .sort(function(a, b) { return b.value - a.value; });


     var focus = root,
         nodes = pack(root).descendants(),
         view;


     var circle = g.selectAll("circle")
       .data(nodes)
       .enter().append("circle")
         .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
         .style("fill", function(d) { return d.children ? color(d.depth) : null; })
         .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

     var text = g.selectAll("text")
       .data(nodes)
       .enter().append("text")
         .attr("class", "label")
         .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
         .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
         .text(function(d) { return d.data.name; });

     var node = g.selectAll("circle,text");

     svg
         .style("background", color(-1))
         .on("click", function() { zoom(root); });

     zoomTo([root.x, root.y, root.r * 2 + margin]);

     function zoom(d) {

       var focus0 = focus; focus = d;
       console.log(focus.data.name);
       shot_type = focus.data.name;
       var transition = d3.transition()
           .duration(d3.event.altKey ? 7500 : 750)
           .tween("zoom", function(d) {
             var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
             return function(t) { zoomTo(i(t)); };
           });
       transition.selectAll(".label")
         .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
           .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
           .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
           .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
     }

     function zoomTo(v) {
       var k = diameter / v[2]; view = v;
       node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
       circle.attr("r", function(d) { return d.r * k; });
     }
});


////starts here
//https://bl.ocks.org/mbostock/3887118
d3.csv("kobe_loc.csv", function(error, data) {
  var margin = {top: 20, right: 10, bottom: 30, left: 400},
      width = 1000 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom;
    console.log(data)

  var x = d3.scaleLinear()
      .range([-75, 75])

  var y = d3.scaleLinear()
      .range([height,500]);

  var color = d3.scaleOrdinal(d3.schemeCategory20);


  var svg_plot = d3.select("div").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.loc_x; })).nice();
  y.domain(d3.extent(data, function(d) { return d.loc_y; })).nice();

    //  svg_plot.exit().remove();//remove unneeded circles

    d3.select("body").append("button")
        .text("change data")
        .on("click",function(){
            //select new data
            if (shot_type=='shot_selection') {
              dots = svg_plot.selectAll(".dot").remove();
              //console.log(dots)
              //dots.exit().remove();
                svg_plot.selectAll("dot").data(data).enter()
                .append("circle")
                  .attr("class", "dot")
                  .attr("r", 2)
                  .attr("cx", function(d) { return x(d.loc_x); })
                  .attr("cy", function(d) { return y(d.loc_y); })
                  .style("fill", function(d) { return color(d.combined_shot_type); });
                console.log(shot_type)
            } else   {



              dots = svg_plot.selectAll(".dot").remove();

          //    dots.remove();
          var real_data = []
          new_data = data.map(function(d){
              //console.log(d)
              if (d.combined_shot_type == shot_type || d.combined_shot_type == 'Dunk') {
                real_data.push(d)
                return d;
            }
          });

        //data = data.
          console.log(real_data)
              svg_plot.selectAll("dot").data(real_data)
                  .enter()
                  .append("circle")
                  .attr("class", "dot")
                  .attr("r", 3.5)
                  .attr("cx", function(d) { return x(d.loc_x); })
                  .attr("cy", function(d) { return y(d.loc_y); })
                  .style("fill", function(d) { return color(d.combined_shot_type); });
                console.log(shot_type)
            }

    });//end click function




});
