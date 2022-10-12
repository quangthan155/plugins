
const html = `
  <style>
  
    @import url(https://sandcastle.cesium.com/templates/bucket.css);

  </style>
  <div id="cesiumContainer" class="fullSize"></div>
  <div id="loadingOverlay"><h1>Loading...</h1></div>
  <div id="toolbar"></div>
  <script>
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
  });
  
  function createModel(url, height) {
    viewer.entities.removeAll();
  
    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      height
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );
  
    const entity = viewer.entities.add({
      name: url,
      position: position,
      orientation: orientation,
      model: {
        uri: url,
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });
    viewer.trackedEntity = entity;
  }
  
  const options = [
    {
      text: "Aircraft",
      onselect: function () {
        createModel(
          "https://reeath.000webhostapp.com/windturbine.glb",
          5000.0
        );
      },
    },
    {
      text: "Drone",
      onselect: function () {
        createModel(
          "https://sandcastle.cesium.com/SampleData/models/CesiumDrone/CesiumDrone.glb",
          150.0
        );
      },
    },
    {
      text: "Hot Air Balloon",
      onselect: function () {
        createModel(
          "../3d/windturbin.glb",
          1000.0
        );
      },
    },
  ];
  
  Sandcastle.addToolbarMenu(options);

  </script>
  `;


  reearth.ui.show(html);


