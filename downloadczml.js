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
    <div id="msg"></div>
      <button id="download" type="button">DOWNLOAD CZML FILE</button>
    </div>
  <script>
  let modelSize;
  let modelUrl;
  let lat;
  let lng;
  const czml;
  let propertyData;
  window.addEventListener("message", function (e) {
    if (e.source !== parent) return;
    propertyData = e.data.propertyData;
    if (propertyData.hasOwnProperty('default') && propertyData.default.modelSize) {
      modelSize = propertyData.default.modelSize;
    }
    if (propertyData.hasOwnProperty('default') && propertyData.default.modelUrl) {
      modelUrl = propertyData.default.modelUrl;
    }
  
    lat - e.data.markerData.lat;
    lng - e.data.markerData.lng;  

    czml = [ 
      { 
        id: "document", 
        name: "CZML Model", 
        version: "1.0", 
      }, 
      { 
        id: "aircraft model", 
        name: "Cesium Air", 
        position: { 
            cartographicDegrees: [ lat, lng],      
        }, 
        model: { 
          gltf: modelUrl,           
          scale: modelSize,                                     
          minimumPixelSize:  128, 
        }, 
      }, 
    ];

    },false);
    document.getElementById("download").addEventListener("click", function(event){
      event.preventDefault();
      download(JSON.stringify(czml));
    });
 
  function download(text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "aaa.czml");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    
  }
  </script>
`


reearth.ui.show(html);

const marker = reearth.layers.find(
  layer => layer.type === "marker"
);


  reearth.on("update", send);
  send();
  
  function send() {
    reearth.ui.postMessage({
      markerData: marker.property.default.location,
      propertyData: reearth.widget.property
    })
  }
