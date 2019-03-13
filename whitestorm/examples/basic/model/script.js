import * as UTILS from '../../globals';

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 40, 250)
  })
]);

const teapot = new WHS.Importer({
  url: `${process.assetsPath}/models/teapot/utah-teapot-large.json`,

  modules: [
    new PHYSICS.ConcaveModule({
      friction: 1,
      mass: 200,
      restitution: 0.5,
      path: `${process.assetsPath}/models/teapot/utah-teapot-light.json`,
      scale: new THREE.Vector3(4, 4, 4)
    }),
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/teapot.jpg`,
      repeat: new THREE.Vector2(1, 1)
    })
  ],

  useCustomMaterial: true,

  material: new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    side: THREE.DoubleSide
  }),

  position: {
    y: 100
  },

  scale: [4, 4, 4]
});

const ball = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 16,
    heightSegments: 16
  },

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  modules: [
    new PHYSICS.SphereModule({
      restitution: 1,
      mass: 60
    })
  ],

  position: [10, 250, -1.969]
});

teapot.addTo(app).then(() => {
  ball.addTo(app);
});

UTILS.addBoxPlane(app, 500);

new WHS.SpotLight({
  color: 0xffffff,
  intensity: 1,
  distance: 300,
  angle: 180,

  shadowmap: {
    fov: 90
  },

  position: {
    x: 0,
    y: 150,
    z: 50
  }
}).addTo(app);

UTILS.addAmbient(app, 0.3);

app.start();
