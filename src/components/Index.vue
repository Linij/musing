<template>
    <div>
        <button id="add" @click="add" style="float: left;position: absolute;">增加</button>

        <div id="container"></div>
    </div>
</template>

<script>
import * as Three from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

let scene,container,camera,renderer,loader = null;
let meshes = [];
let theta = 0;
let radius = 900;
let modelPath = 'models/Horse.glb'

let pos = [0,-200,200,-400,400]

class Horse {
    mixer; // 模型动画
    prevTime; // 上一次更新时间
    size; // 模型尺寸
    obj; // mesh 对象
    speed;

    constructor(obj,size=2,speed=0.0013) {
        this.mixer = null
        this.prevTime = Date.now()
        this.size = size
        this.obj = obj
        this.speed = speed
    }
}

export default {
    name: "Index",
    methods: {
        add() {
            loader.load(modelPath, (gltf) => {
                let mesh = new Horse(gltf.scene.children[0]);
                mesh.obj.scale.set(1.8, 1.8, 1.8);

                mesh.obj.position.x = pos.shift();
                mesh.obj.position.y = -20;
                mesh.obj.position.z = -100;

                scene.add(mesh.obj);

                mesh.mixer = new Three.AnimationMixer(mesh.obj);
                mesh.mixer.clipAction(gltf.animations[0]).setDuration(1).play();

                // setTimeout(()=>{mesh.mixer.clipAction(gltf.animations[0]).setDuration(1).stop();},2000)


                meshes.push(mesh)
            });
        },
        init() {
            container = document.getElementById("container");

            camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.y = 100;

            scene = new Three.Scene();
            scene.background = new Three.Color(0xf0f0f0);

            const light1 = new Three.DirectionalLight(0xefefff, 1.5);
            light1.position.set(1, 1, 1).normalize();
            scene.add(light1);

            const light2 = new Three.DirectionalLight(0xffefef, 1.5);
            light2.position.set(-1, -1, -1).normalize();
            scene.add(light2);

            loader = new GLTFLoader();

            renderer = new Three.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.outputEncoding = Three.sRGBEncoding;

            container.appendChild(renderer.domElement);

            window.addEventListener('resize', this.onWindowResize);
        },
        onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        render() {
            theta += 0.9;

            // camera.position.x = radius * Math.sin(Three.MathUtils.degToRad(theta));
            // camera.position.y = radius * Math.cos(Three.MathUtils.degToRad(380));
            camera.position.z = radius * Math.cos(Three.MathUtils.degToRad(20));

            camera.lookAt(0, 150, 0);

            for (let mesh of meshes) {
                const time = Date.now();
                mesh.mixer.update((time - mesh.prevTime) * mesh.speed);
                mesh.prevTime = time;
            }
            renderer.render(scene, camera);
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.render();
        }
    },
    mounted() {
        this.init();
        this.animate();
        this.add();
    }
};
</script>
<style>
#container {
}

body {
    margin: 0;
}

canvas {
    width: 100%;
    height: 100%
}
</style>
