
// 引入 three.js
import * as THREE from "three"
// 引入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// 引入 gsap 动画库
import gsap from "gsap"

// 目标：使用gasp动画库，让我们的动画给流畅

//创建场景
const scene = new THREE.Scene()

// 创建相机
/*
    PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
        fov — 摄像机视锥体垂直视野角度
        aspect — 摄像机视锥体长宽比
        near — 摄像机视锥体近端面
        far — 摄像机视锥体远端面
*/
// 透视相机
const camera = new THREE.PerspectiveCamera(
    75, // 摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示。默认值是50。
    window.innerWidth / window.innerHeight, // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高。默认值是1（正方形画布）。
    0.1, // 摄像机的近端面，默认值是0.1。
    1000 // 摄像机的远端面，默认值 2000
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启抗锯齿
});
// 设置大小
renderer.setSize(
    window.innerWidth, // 宽度
    500 // 高度
);
//挂载到页面
document.body.appendChild(renderer.domElement)

// 添加控制器
const controls = new OrbitControls( camera, renderer.domElement );
// 开启控制器的阻尼效果
controls.enableDamping = true
// 使用控制器
controls.update()

// 添加物体
/*
    width:立方体x轴的长度,
    height:立方体y轴的长度,
    depth:立方体z轴的长度也是深度
*/
let geometry = new THREE.BoxGeometry(5, 5, 5);

// 添加材质
// const material = new THREE.MeshBasicMaterial({ color: 0xffff0000 });

// 添加材质
const materials = []
for(let i = 0; i < 6; i++){
    materials.push(
        new THREE.MeshBasicMaterial({ 
            color: Math.random() * 0x00ff0000 
        })
    )
}

// 添加网格
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

// 设置相机位置
camera.position.z = 50;

// 修改场景背景颜色
scene.background = new THREE.Color(0xffffcc99)

// 添加 三色坐标轴
const axesHelper = new THREE.AxesHelper(20)
scene.add( axesHelper )

// 添加动画-移动
gsap.to(
    cube.position, // 需要执行动画的目标对象
    {// 执行动画的目标参数
        x: 10, // 使盒子移动到 x 轴为 5 的位置
        duration: 5, // 需要的时间，5秒
        ease: 'power1.inOut', // 动画执行方式
        repeat: -1,//动画执行次数，当执行次数为 -1 时，则无限次数执行
        yoyo: true, // 添加往返执行
    }
)
// 添加动画-旋转
gsap.to(
    cube.rotation, // 需要执行动画的目标对象
    {// 执行动画的目标参数
        x: 10, // 使盒子移动到 x 轴为 5 的位置
        duration: 5, // 需要的时间，5秒
        ease: 'power1.inOut', // 动画执行方式
        repeat: -1,//动画执行次数，当执行次数为 -1 时，则无限次数执行
        yoyo: true, // 添加往返执行
    }
)

// 渲染
function animate() {

    // 使用 requestAnimationFrame 执行动画
    requestAnimationFrame(animate)

    controls.update()

    //scene:前面定义的场景,camera:前面定义的相机
    //renderTarget:渲染的目标默认是是渲染到前面定义的render变量中
    //forceClear:每次绘制之前都将画布的内容给清除,即使自动清除标志autoClear为false,也会清除
    renderer.render(scene, camera)
}    

// 渲染
animate()