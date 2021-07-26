<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
import * as THREE from 'three'

export default {
    name: 'Index',
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
            d:null,
        }
    },
    methods: {
        inits: function () {
            // this.scene = new THREE.Scene();
            // this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
            //
            // this.renderer = new THREE.WebGLRenderer();
            // this.renderer.setSize( window.innerWidth, window.innerHeight );
            //
            // document.getElementById('container').append(this.renderer.domElement)
        },
        init: function () {
            let container = document.getElementById('container')
            this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
            this.camera.position.z = 0.6
            this.scene = new THREE.Scene()
            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
            let material = new THREE.MeshNormalMaterial()
            this.mesh = new THREE.Mesh(geometry, material)
            this.scene.add(this.mesh)

            this.renderer = new THREE.WebGLRenderer({antialias: true})
            this.renderer.setSize(container.clientWidth, container.clientHeight)
            container.appendChild(this.renderer.domElement)
        },
        animate: function () {
            requestAnimationFrame(this.animate)
            this.mesh.rotation.x += 0.01
            this.mesh.rotation.y += 0.02
            this.renderer.render(this.scene, this.camera)
        }
    },
    mounted() {
        this.init()
        this.animate()
    }

}
</script>
<style scoped>
#container {
    height: 400px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
