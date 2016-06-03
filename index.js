//var dots = require("dot").process({path: "views"});
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var filePath = path.join(__dirname, 'maps-template.html');
var filePathToGeoJSON = path.join(__dirname, 'togeojson.js');
var tags = hexo.extend.tag;

function leaflet(args, content) {
  var template = fs.readFileSync(filePath).toString().trim();
  var options = {};

  if (content.length) {
    function toOptions(d) {
      var list = d.split(':');
      options[list[0]] = list[1]
    }

    _.map(content.split('\n'), toOptions);
  }

  var model = {
    id: 'leaflet' + ((Math.random() * 9999) | 0),
    width: args[3] || '100%',
    height: args[4] || '250px',
    zoom: args[2] || 8,
    scrollwheel: false,
    center: {
      latitude: args[0] || markers[0].latitude,
      longitude: args[1] || markers[0].longitude,
    },
    baseLayer: hexo.config.leaflet.baseLayer || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: hexo.config.leaflet.attribution || 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.',
    geoJSON: options.geoJSON
  };


  var compiledMap = _.template(template);
  var toGeoJSONScript = fs.readFileSync(filePathToGeoJSON).toString().trim();

  return compiledMap(model) + '<script>' + toGeoJSONScript + '</script>';

}


tags.register('leaflet', leaflet, {
  async: false,
  ends: true
});
