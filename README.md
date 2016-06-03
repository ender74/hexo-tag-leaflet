#hexo-tag-leaflet

- [About](#about)
- [Basic syntax](#basic-syntax)
- [Simple Example](#simple-example)
- [Loading a route](#loading-a-route)
- [Config](#config)

Version: 1.0.0

Compatible with Hexo Version 3

## About
The leaflet tag plugin is based on the [google map tag](https://github.com/the-simian/hexo-tag-googlemaps) plugin. The base configuration is identical. The difference is, that this plugin does use leaflet as mapping engine and open street map as default map data. You can configure any compatible TMS as source for the map data (see [Config](#config)). Also the configuration besides the initial zoom is different. The content is not a list of markers.

To see this plugin in action you can go to [Thüringer Gipfel - die schönsten Wanderrouten und Fahrradtouren Thüringens](http://www.thueringer-gipfel.de/).

## Basic syntax

The leaflet maps tag plugin for hexo is designed to be a way to add simple maps to your hexo site. The main tag, called `leaflet` requires an endtag called `endleaflet`.

The main tag can have up to 5 arguments, with none being required. If a map is created without a center point, it will default to some fixed point. If a zoom level is not specified, it will default to 8.

```
{% leaflet latitude longitude zoom width height %}
```

##Simple Example

A simple example makes it easy to see how this plugin works.


```md
{% leaflet 50.978056 11.029167 10 100% 450px %}
{% endleaflet %}
```

You may also put as many instances of this plugin on your page as you'd like.

##Loading a route

Probably this configuration is going to change in new versions. I plan to support more options and don't really like the syntax in it's current form (the : delimeter).

This plugin supports loading tracks from GeoJSON files. This tracks will be displayed in the map. The boundingBox of the map will be set to cover the complete track. Here an example how to configure loading GeoJSON files:

```md
{% leaflet 51.307778 11.049167 13 100% 400px %}
geoJSON:/routes/20160522_1431_Hiking.json
{% endleaflet %}
```

##Config

You can configure the plugin within the `_config.yml` file. This plugin uses the section leaflet.

```
leaflet:
  baseLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
```

The given values in this example are the default values, if no configuration is set.
