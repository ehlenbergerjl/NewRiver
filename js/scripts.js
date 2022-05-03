var map = L.map('map', {
  center: [37.87520482184839, -81.03567870074416],
  zoom: 11,
  maxZoom: 18,
  minZoom: 5,
  detectRetina: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var Neri_Mines = null;
var colors = chroma.scale('OrRd').mode('hcl').colors(5);
for (i = 1; i < 5; i++) {
  $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
Neri_Mines = L.geoJson.ajax("assets/neri_mines.geojson", {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3>" +
          feature.properties.FTYPE +
           "</h3><p>" +
      "Notes: " +
      feature.properties.NOTES +
      "</p>",
      //"<img src='" +
      //  feature.properties.img +
      {
        maxWidth: "auto",
      }
    );
  },
  pointToLayer: function(feature, latlng) {
    var id = 0;
    if (feature.properties.FTYPE == "Borehole") {
      id = 0;
    } else if (feature.properties.FTYPE == "Mine") {
      id = 1;
    } else {
      id = null;
    }
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'fab fa-regular fa-archway marker-color-' + (id + 2).toString()
      })
    })

    ;
  },
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://thematicmapping.org">Bjorn Sandvik</a> Shapefile | <a href="https://www.unhcr.org/data.html">UNHCR Data</a> &copy; | <a href="https://data.worldbank.org">World Bank Data</a> &copy; | Map Author: Jason Ehlenberger'
});

Neri_Mines.addTo(map);

colors = chroma.scale('greens').colors(48);

function setColor(MapUnit_ID) {
  var id = 0;
  if (MapUnit_ID == "WSL") {
    id = 47;
  } else if (MapUnit_ID == "WSB") {
    id = 46;
  } else if (MapUnit_ID == "WRCVP") {
    id = 45;
  } else if (MapUnit_ID == "WO") {
    id = 44;
  } else if (MapUnit_ID == "WCTP") {
    id = 43;
  } else if (MapUnit_ID == "WBW") {
    id = 42;
  } else if (MapUnit_ID == "UC") {
    id = 41;
  } else if (MapUnit_ID == "TIP") {
    id = 40;
  } else if (MapUnit_ID == "SRE") {
    id = 39;
  } else if (MapUnit_ID == "SMR") {
    id = 38;
  } else if (MapUnit_ID == "RTH") {
    id = 37;
  } else if (MapUnit_ID == "RR") {
    id = 36;
  } else if (MapUnit_ID == "RP") {
    id = 35;
  } else if (MapUnit_ID == "RI") {
    id = 34;
  } else if (MapUnit_ID == "RD") {
    id = 33;
  } else if (MapUnit_ID == "PP") {
    id = 32;
  } else if (MapUnit_ID == "PD") {
    id = 31;
  } else if (MapUnit_ID == "KP") {
    id = 30;
  } else if (MapUnit_ID == "FTF") {
    id = 29;
  } else if (MapUnit_ID == "FSWP") {
    id = 28;
  } else if (MapUnit_ID == "FSVP") {
    id = 27;
  } else if (MapUnit_ID == "FST") {
    id = 26;
  } else if (MapUnit_ID == "FSBE") {
    id = 25;
  } else if (MapUnit_ID == "FSA") {
    id = 24;
  } else if (MapUnit_ID == "FS") {
    id = 23;
  } else if (MapUnit_ID == "FP") {
    id = 22;
  } else if (MapUnit_ID == "FOTS") {
    id = 21;
  } else if (MapUnit_ID == "FOM") {
    id = 20;
  } else if (MapUnit_ID == "FOHM") {
    id = 19;
  } else if (MapUnit_ID == "FOH") {
    id = 18;
  } else if (MapUnit_ID == "FOE") {
    id = 17;
  } else if (MapUnit_ID == "FMBB") {
    id = 16;
  } else if (MapUnit_ID == "FM") {
    id = 15;
  } else if (MapUnit_ID == "FHOR") {
    id = 14;
  } else if (MapUnit_ID == "FHBTGL") {
    id = 13;
  } else if (MapUnit_ID == "FDTGL") {
    id = 12;
  } else if (MapUnit_ID == "FCTVP") {
    id = 11;
  } else if (MapUnit_ID == "FB") {
    id = 10;
  } else if (MapUnit_ID == "DIST") {
    id = 9;
  } else if (MapUnit_ID == "DEV") {
    id = 8;
  } else if (MapUnit_ID == "COB") {
    id = 7;
  } else if (MapUnit_ID == "CL") {
    id = 6;
  } else if (MapUnit_ID == "CK") {
    id = 5;
  } else if (MapUnit_ID == "BW") {
    id = 4;
  } else if (MapUnit_ID == "BS") {
    id = 3;
  } else if (MapUnit_ID == "BDG") {
    id = 2;
  } else if (MapUnit_ID == "AWCB") {
    id = 1;
  } else {
    id = 0;
  }
  return colors[id];
}

function style(feature) {
  return {
    fillColor: setColor(feature.properties.GDP),
    fillOpacity: 0.8,
    weight: 0.2,
    opacity: 1,
    color: 'black'
  };
}
var vegitation = null;

var info = L.control();

info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;

};

info.update = function(properties) {
  this._div.innerHTML = '<h3>New River National Park</h3>' + (properties ?
    '<b>' + properties.MapUnit_Name + '</b><br />' + properties.Acres + ' Acres' +
    '<br />' +
     properties.Hectares + ' Hectares' :
    'Hover over a feature');
};

info.addTo(map);

function highlightFeature(e) {

  var layer = e.target;

  layer.setStyle({
    weight: 2,
    opacity: 0.8,
    color: 'black',
  });

  layer.bringToFront();


  info.update(layer.feature.properties);

}


function zoomToFeature(e) {

  map.fitBounds(e.target.getBounds());

}


function resetHighlight(e) {

  vegitation.resetStyle(e.target);

  info.update();

}

function onEachFeature(feature, layer) {

  layer.on({
    mouseover: highlightFeature,
    click: zoomToFeature,
    mouseout: resetHighlight

  });

}

vegitation = L.geoJson.ajax("assets/neri_veg.geojson", {
  style: style,
  onEachFeature: onEachFeature

}).addTo(map);
var legend = L.control({
  position: 'bottomleft'
});

legend.onAdd = function() {

  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b>Vegitation</b><br />';
  //div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.8"></i><p>71,742+</p>';
//  div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.8"></i><p>44,491-71,741</p>';
//  div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.8"></i><p>22,793-44,490</p>';
//  div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.8"></i><p>9,506-22,792</p>';
//  div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.8"></i><p> 0-9,505</p>';
  div.innerHTML += '<hr><b>Mines<b><br />';
  div.innerHTML += '<i class="fa-regular fa-archway marker-color-2"></i><p>Mine</p>';
 div.innerHTML += '<i class="fa-regular fa-archway marker-color-4"></i><p>Borehole</p>';
// div.innerHTML += '<i class="fa-solid fa-people-pulling marker-color-3"></i><p>Medium</p>';
//  div.innerHTML += '<i class="fa-solid fa-people-pulling marker-color-2"></i><p>Low</p>';
  return div;
};

legend.addTo(map);

L.control.scale({
  position: 'bottomright'
}).addTo(map);

var popup = L.popup();
