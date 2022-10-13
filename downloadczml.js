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

    markerData = e.data.markerLayer;
    propertyData = e.data.property;
    
    if (property.hasOwnProperty('default') && property.default.modelSize) {
      let modelSize = propertyData.default.modelSize;
    }

    if (property.hasOwnProperty('default') && property.default.modelUrl) {
      let modelUrl = propertyData.default.modelUrl;
    }
  });
  console.log(markerData, propertyData);


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

// Handle data to download
// reearth.on("message", data => {
//   marker: marker;
//   property: reearth.widget.property
// });

reearth.on("update", send);
send();

function send() {
  reearth.ui.postMessage({
    markerLayer: marker,
    property: reearth.widget.property
  })
}
