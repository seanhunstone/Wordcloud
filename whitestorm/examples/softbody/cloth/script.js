import * as UTILS from '../../globals';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 60, 120),
    far: 10000
  })),
  new WHS.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: new THREE.Vector3(0, -9.8, 0),
    softbody: true
  }),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule()
]);

const cloth = new WHS.Plane({ // Softbody (blue).
  geometry: {
    width: 60,
    height: 20,
    wSegments: 120, // 40
    hSegments: 40 // 30
  },

  // buffer: true,

  modules: [
    new PHYSICS.ClothModule({
      mass: 4,
      margin: 1,
      damping: 0.01,
      piterations: 12
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.softbody,
    side: THREE.DoubleSide
  }),

  position: {
    y: 50
  },

  rotation: {
    x: Math.PI / 4
  }
});

cloth.addTo(app);

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 3,
    height: 3,
    depth: 3
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 36
  }
}).addTo(app);

UTILS.addBoxPlane(app, 250);
UTILS.addBasicLights(app, 0.5, [60, 60, 20], 400);

app.start();
