<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "Index",
  data() {
    return {
      theta: 0,
      stats: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      mixer: null,
      radius: 600,
      prevTime: Date.now(),
      container: null,
      modelPath: 'models/Horse.glb'
    };
  },
  methods: {
    init() {
      this.container = document.getElementById("container");

      this.camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.y = 300;

      this.scene = new Three.Scene();
      this.scene.background = new Three.Color(0xf0f0f0);

      const light1 = new Three.DirectionalLight(0xefefff, 1.5);
      light1.position.set(1, 1, 1).normalize();
      this.scene.add(light1);

      const light2 = new Three.DirectionalLight(0xffefef, 1.5);
      light2.position.set(-1, -1, -1).normalize();
      this.scene.add(light2);

      const loader = new GLTFLoader();

      loader.load( this.modelPath,  ( gltf ) => {
        this.mesh = gltf.scene.children[ 0 ];
        this.mesh.scale.set( 1.5, 1.5, 1.5 );
        this.scene.add( this.mesh );

        this.mixer = new Three.AnimationMixer( this.mesh );

        this.mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
      } );

      this.renderer = new Three.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.renderer.outputEncoding = Three.sRGBEncoding;

      this.container.appendChild(this.renderer.domElement);

      this.stats = new Stats();
      this.container.appendChild(this.stats.dom);

      window.addEventListener('resize', this.onWindowResize);
    },
    render() {
      this.theta += 0.1;

      this.camera.position.x = this.radius * Math.sin(Three.MathUtils.degToRad(this.theta));
      this.camera.position.z = this.radius * Math.cos(Three.MathUtils.degToRad(this.theta));

      this.camera.lookAt(0, 150, 0);

      if (this.mixer) {

        const time = Date.now();

        this.mixer.update((time - this.prevTime) * 0.001);

        this.prevTime = time;

      }

      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.render();

      this.stats.update();
    }

  },
  created() {
    this.init();
    this.animate();
  },
};
</script>
<style>
#container {
}
</style>
