import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5

/**
 * Object
 */
const fontLoader  = new FontLoader();
fontLoader.load(
    '/fonts/Boba Cups_Regular.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Richard Nyande',
            {
                font : font,
                size: 0.5,
                height: 0.2,
                curveSegments:12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelOffset:0,
                bevelSegments: 5
            }
        );
        
        const textGeometry2 = new TextGeometry(
            'Portfolio',
            {
                font: font,
                size: 0.175,
                height: 0.2,
                curveSegments:12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        );


        textGeometry.computeBoundingBox();
        textGeometry.center();

        textGeometry2.computeBoundingBox();
        textGeometry2.translate(
            -(textGeometry2.boundingBox.max.x) * -1.5,
            -(textGeometry2.boundingBox.max.y) * 2.25,
            -(textGeometry2.boundingBox.max.z - 0.02) * 0.5,
        )


        const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
        const matcapTexture2 = textureLoader.load('/textures/matcaps/5E5855_C6C4CD_C89B67_8F8E98-256px.png');
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2})


        const text = new THREE.Mesh(textGeometry, material);
        const text2 = new THREE.Mesh(textGeometry2, material);
        scene.add(text);
        scene.add(text2);
        camera.lookAt(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

        for(let i=0; i < 50; i++)
        {
            
            const donut = new THREE.Mesh(donutGeometry, material);
            const donut2 = new THREE.Mesh(donutGeometry,material2);

            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut2.position.x = (Math.random() - 0.5) * 10;
            donut2.position.y = (Math.random() - 0.5) * 10;
            donut2.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;
            donut2.rotation.x = Math.random() * Math.PI;
            donut2.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale,scale,scale);
            donut2.scale.set(scale,scale,scale);

            scene.add(donut,donut2);
        }

    }
)

scene.add(camera)



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})





// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()