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
      <button id="download" type="button">DOWNLOAD CZML FILE</button>
    </div>
  <script>
  var markerData;
  var propertyData;
 
  window.addEventListener("message", function (e) {
    if (e.source !== parent) return;

    markerData = e.data.marker;
    propertyData = e.data.propertyData;
      console.log(e.data.marker.property.default.location);
    if (propertyData.hasOwnProperty('form') && propertyData.default.modelSize) {
      let modelSize = propertyData.form.modelSize;
      
    }

    if (propertyData.hasOwnProperty('form') && propertyData.default.modelUrl) {
      let modelUrl = propertyData.form.modelUrl;
      
    }
 
    document.getElementById("download").addEventListener("click", myFunction);
    function myFunction() {
      const czml = [ 
        { 
          id: "document", 
          name: "CZML Model", 
          version: "1.0", 
        }, 
        { 
          id: "aircraft model", 
          name: "Cesium Air", 
          position: { 
              cartographicDegrees: [markerData.lat , markerData.lng],      
          }, 
          model: { 
            gltf: modelUrl,           
            scale: modelSize,                                                
            minimumPixelSize:  128, 
          }, 
        }, 
      ];
      console.log(czml);
      saveStaticDataToFile(czml);
    }
  });

  function saveStaticDataToFile(data) {
    var blob = new Blob([data],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "demo.czml");
  }
  </script>
`


reearth.ui.show(html);

const marker = reearth.layers.find(
  layer => layer.type === "marker"
);

console.log(marker.property.default.location);
  reearth.on("update", send);
  send();
  
  function send() {
    reearth.ui.postMessage({
      markerData: marker.property.default.location,
      propertyData: reearth.widget.property
    })
  }
 