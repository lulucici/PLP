/**
 * central-click.js
 */
d3.svg.BubbleChart.define("central-click", function (options) {
  var self = this;
  var page = 0;
  self.setup = (function (node) {
    var original = self.setup;
    return function (node) {
      var fn = original.apply(this, arguments);
      self.event.on("click", function(node) {
        if (node.selectAll("text.central-click")[0].length === 1) {
          //window.parent.test(9);
          //  console.log(JSON.stringify(node));
          //  console.log(node.text());
            var pureString = node.text().match(/\d*\.\d*%?(.*)/)[1];
            var language;
            if (pureString.indexOf('(See more detail)') != -1) {
                language = pureString.match(/(.*)\(See more detail\)/)[1];
            } else {
                language = pureString;
            }
            thirdPage(language);
        }
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      node.select("text.central-click").remove();
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      var transition = self.getTransition().centralNode;
      transition.each("end", function() {
        node.append("text").classed({"central-click": true})
          .attr(options.attr)
          .style(options.style)
          .attr("x", function (d) {page=d.item.page; return d.cx;})
          .attr("y", function (d) {return d.cy;})
          .text(options.text)
          .style("opacity", 0).transition().duration(self.getOptions().transitDuration / 2).style("opacity", "0.8");
      });
      return fn;
    };
  })();
});