<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const obj = {
    theta: 0,
    stats: null,
    camera: null,
    scene: null,
    renderer: null,
    mixer: null,
    radius: 600,
    prevTime: Date.now(),
    container: null,
    modelPath: 'models/Horse.glb'
};

export default {
  name: "Index",
  methods: {
    init() {
      obj.container = document.getElementById("container");

      obj.camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
      obj.camera.position.y = 100;

      obj.scene = new Three.Scene();
      obj.scene.background = new Three.Color(0xf0f0f0);

      const light1 = new Three.DirectionalLight(0xefefff, 1.5);
      light1.position.set(1, 1, 1).normalize();
      obj.scene.add(light1);

      const light2 = new Three.DirectionalLight(0xffefef, 1.5);
      light2.position.set(-1, -1, -1).normalize();
      obj.scene.add(light2);

      const loader = new GLTFLoader();

      loader.load( obj.modelPath,  ( gltf ) => {
        let mesh = gltf.scene.children[ 0 ];
         mesh.scale.set( 0.7, 0.7, 0.7 );

         mesh.position.x = -101
         mesh.position.y = 100

        obj.scene.add( mesh );

        obj.mixer = new Three.AnimationMixer( mesh );

        obj.mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
      } );


    loader.load( obj.modelPath,  ( gltf ) => {
        let mesh = gltf.scene.children[ 0 ];
        mesh.scale.set( 0.5, 0.5, 0.5 );

        obj.scene.add( mesh );

        let mixer = new Three.AnimationMixer( mesh );

         mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
    } );


      obj.renderer = new Three.WebGLRenderer();
      obj.renderer.setPixelRatio(window.devicePixelRatio);
      obj.renderer.setSize(window.innerWidth, window.innerHeight);

      obj.renderer.outputEncoding = Three.sRGBEncoding;

      obj.container.appendChild(obj.renderer.domElement);

      obj.stats = new Stats();
      obj.container.appendChild(obj.stats.dom);

      window.addEventListener('resize', this.onWindowResize);
    },
    render() {
      obj.theta += 0.9;

      obj.camera.position.x = obj.radius * Math.sin(Three.MathUtils.degToRad(50));
      obj.camera.position.z = obj.radius * Math.cos(Three.MathUtils.degToRad(90));

      obj.camera.lookAt(0, 150, 0);

      if (obj.mixer) {
        const time = Date.now();

        obj.mixer.update((time - obj.prevTime) * 0.001);

        obj.prevTime = time;
      }

      obj.renderer.render(obj.scene, obj.camera);
    },
    onWindowResize() {
      obj.camera.aspect = window.innerWidth / window.innerHeight;
      obj.camera.updateProjectionMatrix();

      obj.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.render();

      obj.stats.update();
    }

  },
  mounted () {
      this.init();
      this.animate();
  }
};
</script>
<style>
#container {
}
body { margin: 0; }
canvas { width: 100%; height: 100% }
</style>
