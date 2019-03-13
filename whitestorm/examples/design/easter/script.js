import * as UTILS from '../../globals';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: {
      x: 0,
      y: -10,
      z: 0
    },
  }),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(-8, 5, 20),
    fov: 45,
    far: 2000
  })),
  new WHS.RenderingModule({
    bgColor: 0xffffff,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new WHS.ResizeModule()
]);

const camera = app.manager.get('camera');

// camera.lookAt(new THREE.Vector3(0, 0, 0));

// Start rendering.
app.start();

new WHS.Box({
  geometry: {
    width: 100,
    height: 1,
    depth: 100
  },
  modules: [
    new PHYSICS.BoxModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff
  }),

  position: {
    x: 0,
    y: -1,
    z: 0
  }
}).addTo(app);

const egg = new WHS.Importer({
  url: `${process.assetsPath}/models/easter/egg_light.json`,

  modules: [
    new PHYSICS.ConvexModule({
      path: `${process.assetsPath}/models/easter/egg_low.json`
    }),
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/easter/egg1.jpg`
    })
  ],

  useCustomMaterial: true,

  material: new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    side: THREE.DoubleSide
  }),

  position: {
    y: 0,
    x: -10
  },

  rotation: {
    x: Math.PI / 2,
    y: Math.PI / 8
  }
});

const rabbit = new WHS.Importer({
  url: `${process.assetsPath}/models/easter/rabbit.json`,

  modules: [
    new PHYSICS.ConcaveModule({
      path: `${process.assetsPath}/models/easter/rabbit_low.json`,
      scale: new THREE.Vector3(0.5, 0.5, 0.5)
    })
  ],

  position: {
    y: 5,
    x: -3
  },

  rotation: {
    x: Math.PI / 2
  },

  scale: [0.5, 0.5, 0.5]
});

rabbit.addTo(app);

new WHS.SpotLight({
  color: 0xffffff,
  decay: 1,
  distance: 150,
  intensity: 1,

  shadowmap: {
    left: -20,
    top: 20,
    bottom: -20,
    right: 20,

    bias: -0.0001,

    width: 4096,
    height: 4096,

    near: 1,
    far: 100,

    fov: 10
  },

  position: {
    z: 20,
    x: 20,
    y: 20
  },

  target: {
    x: -10,
    y: 0,
    z: 0
  }
}).addTo(app);

new WHS.AmbientLight({
  intensity: 0.9,
  color: 0xffffff
}).addTo(app);

let egg2, egg3, egg4, egg5, egg6, egg7, egg8, egg9;

egg.addTo(app).then((object) => {
  egg2 = object.clone(false, true);
  egg2.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg2.jpg`);

  egg2.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg3 = object.clone(false, true);
  egg3.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg3.jpg`);

  egg3.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg4 = object.clone(false, true);
  egg4.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg4.jpg`);

  egg4.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0);
    obj.position.setZ(-1.5);
  });

  egg5 = object.clone(false, true);
  egg5.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg1.jpg`);

  egg5.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(2.5);
  });

  egg6 = object.clone(false, true);
  egg6.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg2.jpg`);

  egg6.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0.5);
    obj.position.setZ(1.5);
  });

  egg7 = object.clone(false, true);
  egg7.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg3.jpg`);

  egg7.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(-1.5);
  });

  egg8 = object.clone(false, true);
  egg8.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg4.jpg`);

  egg8.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(1);
    obj.position.setZ(2.5);
  });

  egg9 = object.clone(false, true);
  egg9.material.map = WHS.TextureModule.load(`${process.assetsPath}/textures/easter/egg1.jpg`);

  egg9.addTo(app).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(3);
    obj.position.setZ(-1.5);
  });
});

camera.native.lookAt(new THREE.Vector3(-4, 0, 0));

document.body.addEventListener('mousemove', (e) => {
  camera.position.x = -8 + (e.screenX - window.innerWidth / 2) / 40;
  camera.position.y = 5 + (e.screenY - window.innerHeight / 2) / 80;
  camera.native.lookAt(new THREE.Vector3(-4, 0, 0));
});

document.body.addEventListener('click', () => {
  rabbit.use('physics').setLinearVelocity(new THREE.Vector3(0, 5, 0));
  egg.use('physics').setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg2.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg3.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg4.use('physics').setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg5.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg6.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg7.use('physics').setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg8.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg9.use('physics').setAngularVelocity(new THREE.Vector3(0, -10, 0));
});
