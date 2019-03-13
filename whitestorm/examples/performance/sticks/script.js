import * as UTILS from '../../globals';

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 50)
  }, UTILS.appDefaults.rendering, {
    ammo: process.ammoPath,
    gravity: new THREE.Vector3(0, -10, 0)
  })
]);

const stick = new WHS.Box({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  material: new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh}),

  modules: [
    new PHYSICS.BoxModule({
      mass: 1,
      restitution: 0,
      friction: 0.5,
      state: 4
    })
  ],

  shadow: {
    cast: false,
    receive: false
  },

  position: {
    y: 0.5
  }
});

const stick2 = stick.clone();
stick2.position.set(0, 4, 20);

const height = 10; // BASE: 6, 0, 2, 2.
const delta = 0;
const cols = 4,
  rows = 4;

let objects = 0;

for (let k = 0; k < rows; k++) {
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < height; i++) {
      const newStick = stick.clone(false, true);
      const newStick2 = stick2.clone(false, true);

      newStick.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));
      newStick2.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));

      if (i % 2 === 0) {
        newStick.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick.position.set(1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);
      } else {
        newStick.position.y = 0.5 + delta + (1 + delta) * i;
        newStick2.position.y = 0.5 + delta + (1 + delta) * i;
        newStick.position.z = 6 * j;
        newStick2.position.z = 2 + 6 * j;
        newStick.position.x = newStick2.position.x = 6 * k;
      }

      objects += 2;

      newStick.addTo(app);
      newStick2.addTo(app);
    }
  }
}

document.querySelector('.object_count').innerText = `${objects} objects`;

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10
    })
  ],

  material: new THREE.MeshStandardMaterial({
    emissive: 0xaaaaaa,
    color: UTILS.$colors.mesh,
    metalness: 0.8,
    roughness: 0.5
  }),

  position: {
    x: -20,
    y: 3
  }
});

sphere.addTo(app).then(sphere => sphere.use('physics')).then(physics => {
  const mx = 96,
    mz = 32;

  physics.setAngularVelocity({x: mx, y: 0, z: mz});
  physics.setLinearVelocity({x: mx, y: 0, z: mz});
});

UTILS.addBoxPlane(app, 250).then(o => {
  o.position.y = -1;
});

UTILS.addBasicLights(app, 0.5, [100, 100, 100], 200);

app.start();
