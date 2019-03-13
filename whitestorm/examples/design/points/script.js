const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(-8, 5, 20),
    far: 2000,
    near: 1,
    fov: 45
  })),
  new WHS.RenderingModule({
    bgColor: 0xffffff,

    renderer: {
      antialias: false
    }
  }),
  new WHS.OrbitControlsModule({target: new THREE.Vector3(50, 50, 50)}),
  new WHS.ResizeModule()
]);

const size = new THREE.Vector3(100, 100, 100);
const sizel = size.x * size.y * size.z * 3;

const data = new Float32Array(sizel); // 3993000
const colors = new Float32Array(sizel);

let i = 0;
for (let x = 0; x <= size.x; x++) {
  for (let y = 0; y <= size.y; y++) {
    for (let z = 0; z <= size.z; z++) {
      data[i * 3] = x;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = z;
      colors[i * 3] = x / 100;
      colors[i * 3 + 1] = y / 100;
      colors[i * 3 + 2] = z / 100;
      i++;
    }
  }
}

const geom = new THREE.BufferGeometry();

geom.addAttribute('position', new THREE.BufferAttribute(data, 3));
geom.addAttribute('color', new THREE.BufferAttribute(colors, 3));

class Points extends WHS.MeshComponent {
  build(params = {}) {
    return new THREE.Points(params.geom, new THREE.PointsMaterial({vertexColors: THREE.VertexColors, size: 0.1}));
  }
}

new Points({geom}).addTo(app);

// Start rendering.
app.start();
