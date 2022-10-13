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


      
reearth.ui.show(html);

const marker = reearth.layers.find(
  layer => layer.type === "marker"
);

// Handle data to download
// reearth.on("message", data => {
//   marker: marker;
//   property: reearth.widget.property
// });