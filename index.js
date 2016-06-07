//var dots = require("dot").process({path: "views"});
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var filePath = path.join(__dirname, 'maps-template.html');
var filePathToGeoJSON = path.join(__dirname, 'togeojson.js');
var tags = hexo.extend.tag;

function leaflet(args, content) {
  var template = fs.readFileSync(filePath).toString().trim();
  var options = {
    markers: []
  };

  if (content.length) {
    function toMarker(d) {
      var list = d.split(',');
      var ret = {
        name: list[0] || '',
        latitude: parseFloat(list[1]),
        longitude: parseFloat(list[2]),
        icon: (list[3] || '').trim()
      };
      if (list[4] && list[5] && list[4].trim().length > 0 && list[5].trim().length > 0) {
        ret.iconSize = [list[4], list[5]]
      }
      if (list[6] && list[7] && list[6].trim().length > 0 && list[7].trim().length > 0) {
        ret.iconAnchor = [list[6], list[7]]
      }
      return ret;
    }

    function toOptions(d) {
      var list = d.split(/:(.+)/);
      switch (list[0]) {
        case 'marker':
          options.markers.push(toMarker(list[1]))
          break;
        default:
          options[list[0]] = list[1]
          break;
      }
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
    baseLayer: options.baseLayer || hexo.config.leaflet.baseLayer || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: options.attribution || hexo.config.leaflet.attribution || 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.',
    markers: options.markers,
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
