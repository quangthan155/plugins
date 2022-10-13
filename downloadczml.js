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
  let markerData;
  let propertyData;
 
  window.addEventListener("message", function (e) {
    if (e.source !== parent) return;

    markerData = e.data.marker;
    propertyData = e.data.propertyData;
    console.log(markerData,propertyData.default);
    if (propertyData.hasOwnProperty('default') && propertyData.default.modelSize) {
      let modelSize = propertyData.default.modelSize;
      
    }

    if (propertyData.hasOwnProperty('default') && propertyData.default.modelUrl) {
      let modelUrl = propertyData.default.modelUrl;
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

// Handle data to download
// reearth.on("message", data => {
//   marker: marker;
//   property: reearth.widget.property
// });



  reearth.on("update", send);
  send();
  
  function send() {
    reearth.ui.postMessage({
      markerData: marker.property.default.location,
      propertyData: reearth.widget.property
    })
  }
  console.log(marker);