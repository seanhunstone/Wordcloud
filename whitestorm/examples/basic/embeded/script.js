import * as UTILS from '../../globals';

const resizer = new WHS.ResizeModule();
const mouse = new WHS.VirtualMouseModule();

const app = new WHS.App([
  new WHS.ElementModule({
    container: document.getElementById('embed')
  }),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 10, 50)
  })),
  new WHS.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    },

    height: 300,
    width: 600
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath
  }),
  new WHS.OrbitControlsModule(),
  resizer,
  mouse
]);

const sphere = new WHS.Sphere({ // Create sphere component.
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

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 100, 0]
});

sphere.addTo(app);
mouse.track(sphere);

sphere.on('mouseover', () => {
  sphere.material.color.set(0xffff00);
  console.log('mouseover');
});

sphere.on('mousemove', () => {
  console.log('mousemove');
});

sphere.on('mouseout', () => {
  sphere.material.color.set(UTILS.$colors.mesh);
  console.log('mouseout');
});

sphere.on('click', () => {
  alert('click!');
});

UTILS.addPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.

// DOM

const sizer = document.getElementById('sizer');
const embed = document.getElementById('embed');
let resize = false;

resizer.trigger();

sizer.addEventListener('mousedown', () => {
  resize = true;
});

window.addEventListener('mouseup', () => {
  resize = false;
});

window.addEventListener('mousemove', e => {
  if (resize) {
    embed.style.width = (+embed.style.width.replace('px', '') + e.movementX) + 'px';
    resizer.trigger();
  }
});
