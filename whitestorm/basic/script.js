const app = new WHS.App([
  new WHS.ElementModule({
    container: document.getElementById('app')
  }),
  new WHS.SceneModule(),
  new WHS.CameraModule({
    position: {
      y: 10,
      z: 50
    }
  }),
  new WHS.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }, {shadow: true}),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule()
]);

// box
const box = new WHS.Box({
  geometry: {
    width: 10, 
    height: 10,
    depth: 10
  },

  material: new THREE.MeshPhongMaterial({
    color: 0xF2F2F2
  }),

  position: new THREE.Vector3(0, 5, 0),

});

box.addTo(app);

new WHS.Loop({
	//box.setRotation(0,Math/6,0);
 });

// Plane
new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

  material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(app);

// Lights
new WHS.PointLight({
  light: {
    intensity: 0.5,
    distance: 100
  },

  shadow: {
    fov: 90
  },

  position: new THREE.Vector3(0, 10, 10)
}).addTo(app);

new WHS.AmbientLight({
  light: {
    intensity: 0.4
  }
}).addTo(app);
 

// Start the app
app.start();
