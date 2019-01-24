import './css/style.styl'
import grassTextureSource from './images/textures/house/grass.jpg'
import secondTextureSource from './images/textures/house/noUsed.jpg'
import * as THREE from 'three'
import Planet from './js/Planet.js'
const human = 1 /*black mirror wow */

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const noUsed = textureLoader.load(secondTextureSource)
const grassTexture = textureLoader.load(grassTextureSource)
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
grassTexture.repeat.x = 4
grassTexture.repeat.y = 4

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

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
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height)
camera.position.z = 0.019
camera.position.y = 0.3
camera.position.x = 0.02
scene.add(camera)

/**
 * Planet
 */
// const planet = new Planet({
//     textureLoader: textureLoader
// })
// scene.add(planet.container)

// /**
//  * cabin
//  */
const cabin = new THREE.Object3D()
scene.add(cabin)

// const walls = new THREE.Mesh(
//     new THREE.BoxGeometry(1.5, 1, 1.5),
//     new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0xffcc99 })
// )
// walls.castShadow = true
// walls.receiveShadow = true
// cabin.add(walls)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(human*1.5,human * 2.5),
    new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, side: THREE.DoubleSide, map: grassTexture })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.position.x = 0
floor.position.y = -0.30
floor.position.z = 0
cabin.add(floor)

const Rwall = new THREE.Mesh(
    new THREE.PlaneGeometry(human*1.5,human * 2.5),
    new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, side: THREE.DoubleSide, map: noUsed })
)
Rwall.receiveShadow = true
Rwall.rotation.x = - Math.PI * 0.5
Rwall.rotation.y = - Math.PI * 0.5
Rwall.position.x = 0.25
floor.position.y = 0

Rwall.position.z = 0
cabin.add(Rwall)

const Lwall = new THREE.Mesh(
    new THREE.PlaneGeometry(human*1.5,human * 2.5),
    new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, side: THREE.DoubleSide, map: noUsed })
)
Lwall.rotation.x = - Math.PI * 0.5
Lwall.rotation.y = - Math.PI * 0.5
Lwall.receiveShadow = true
Lwall.position.x = -0.25
Lwall.position.z = 0
cabin.add(Lwall)

// for(let i = 0; i < 50; i++)
// {
//     const radius = Math.random() * 0.25

//     const bush = new THREE.Mesh(
//         new THREE.SphereGeometry(radius),
//         new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0x55aa55 })
//     )
//     bush.position.x = (Math.random() - 0.5) * 4
//     bush.position.z = (Math.random() - 0.5) * 4
//     bush.position.y = - 0.5 + radius * 0.5
//     bush.castShadow = true
//     bush.receiveShadow = true
//     cabin.add(bush)
// }

// // Roof
// const roof = new THREE.Mesh(
//     new THREE.ConeGeometry(1.25, 0.5, 4),
//     new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0x885522 })
// )
// roof.position.y = 0.5 + 0.25
// roof.rotation.y = Math.PI * 0.25
// roof.castShadow = true
// cabin.add(roof)

/**
 * Lights
 */
const doorLight = new THREE.PointLight()
doorLight.position.x = - 1.02
doorLight.castShadow = true
cabin.add(doorLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1.2)
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = 1.20
sunLight.shadow.camera.bottom = - 1.20
sunLight.shadow.camera.left = - 1.20
scene.add(sunLight)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update camera
    camera.rotation.x = - cursor.y *3.8
    camera.rotation.order = 'YXZ'
    camera.rotation.y = - cursor.x *15
    if(movez == 1)
    {
        camera.position.x  -= (Math.sin(camera.rotation.y)/350)
        camera.position.z -= (Math.cos(camera.rotation.y)/350)
        // camera.position.y += (Math.tan(camera.rotation.x)/350)
    } 
    if(moveq == 1)
    {
        camera.position.x += (Math.sin(-camera.rotation.y - Math.PI/2)/350)
        camera.position.z += (-Math.cos(-camera.rotation.y - Math.PI/2)/350)
    } 
    if(moves == 1)
    {
        camera.position.x  += (Math.sin(camera.rotation.y)/350)
        camera.position.z += (Math.cos(camera.rotation.y)/350)
        // camera.position.y -= (Math.tan(camera.rotation.x)/350)
    } 
    if(moved == 1)
    {
        camera.position.x += (Math.sin(-camera.rotation.y + Math.PI/2)/350)
        camera.position.z += (-Math.cos(-camera.rotation.y + Math.PI/2)/350)
    } 
    // console.log(camera.position)
    // Renderer
    renderer.render(scene, camera)
}
loop()

// // Hot
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         console.log('dispose')
//     })
// }

let movez = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'z')
        {
            movez = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'z')
                {
                    movez = 0
                }
            })

        } 
    })
    let moveq = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'q')
        {
            moveq = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'q')
                {
                    moveq = 0
                }
            })

        } 
    })
    let moves = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 's')
        {
            moves = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 's')
                {
                    moves = 0
                }
            })

        } 
    })
    let moved = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'd')
        {
            moved = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'd')
                {
                    moved = 0
                }
            })

        } 
    })
  

    console.log(camera.position)