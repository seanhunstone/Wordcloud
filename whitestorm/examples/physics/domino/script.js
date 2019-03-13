import * as UTILS from '../../globals';

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(62, 30, 130)
  })
]);

new WHS.Sphere({
  geometry: [4, 32, 32],

  modules: [
    new PHYSICS.SphereModule({
      mass: 5
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh,
    restitution: 0
  }),

  position: [0, 100, 0]
}).addTo(app);

const tramplin = new WHS.Box({
  geometry: {
    height: 2,
    width: 20,
    depth: 4
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 0,
      restitution: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    x: 0,
    y: 4,
    z: 0
  },

  rotation: {
    z: -Math.PI / 6
  }
});

tramplin.rotation = new THREE.Euler(0, 0, -Math.PI / 6);

tramplin.addTo(app);

const tramplin2 = tramplin.clone();
tramplin2.position.y = 44;
tramplin2.addTo(app);

const tramplin3 = tramplin.clone();
tramplin3.position.set(24, 24, 0);
tramplin3.rotation.z = Math.PI / 6;
tramplin3.addTo(app);

const domino = new WHS.Box({
  geometry: {
    height: 8,
    width: 1,
    depth: 4
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 5
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh,
    restitution: 0.5,
    friction: 1
  }),

  position: {
    x: 20,
    y: 4,
    z: 0
  }
});

let d = domino.clone();
for (let i = 0; i < 13; i++) {
  d = d.clone();
  d.position.x += 8;
  d.addTo(app);
}

UTILS.addBoxPlane(app, 250).then(o => {
  o.position.y = -0.5
});

UTILS.addBasicLights(app);
app.start();
