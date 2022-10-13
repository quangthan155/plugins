const html = `
  <style>
    body {
      margin: 0;
    }
    #wrapper {
      height: 100%;
      color: white;
      border: 3px dotted red;
      border-radius: 5px;
      padding: 20px 0;
      text-align: center;
    }
    </style>

    <div id="wrapper">
      <button id="download" type="button" onclick="saveStaticDataToFile(czml)">DOWNLOAD CZML FILE</button>
    </div>
  <script>
  let marker;
  let property;
  window.addEventListener("message", function (e) {
    if (e.source !== parent) return;

    marker = e.data.marker;
    property = e.data.property;
    console.log(marker);
    if (property.hasOwnProperty('default') && property.default.modelSize) {
      let modelSize = property.default.modelSize;
    }

    if (property.hasOwnProperty('default') && property.default.modelUrl) {
      let modelUrl = property.default.modelUrl;
    }
  }
  const czml = "[ 
    { 
      id: "document", 
      name: "CZML Model", 
      version: "1.0", 
    }, 
    { 
       id: "aircraft model", 
       name: "Cesium Air", 
       position: { 
          cartographicDegrees: [marker.property.default.location.lat, marker.property.default.location.lng],      
       }, 
       model: { 
        gltf: modelUrl,           
        scale: modelSize,                                                
        minimumPixelSize:  128, 
      }, 
    }, 
  ]";

  function saveStaticDataToFile(data) {
    var blob = new Blob([data],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "static.txt");
  }
  </script>
`

      
reearth.ui.show(html);

const marker = reearth.layers.find(
  layer => layer.type === "marker"
);

// Handle data to download
reearth.on("message", marker => {
  marker: marker;
  property: reearth.widget.property
});

≈