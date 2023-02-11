
import * as THREE from "three"



/// 创建场景

const scene = new THREE.Scene()



/// 创建相机

/*
    PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
        fov — 摄像机视锥体垂直视野角度
        aspect — 摄像机视锥体长宽比
        near — 摄像机视锥体近端面
        far — 摄像机视锥体远端面
*/

/// 透视相机
const camera = new THREE.PerspectiveCamera(
    75, // 摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示。默认值是50。
    window.innerWidth / window.innerHeight, // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高。默认值是1（正方形画布）。
    0.1, // 摄像机的近端面，默认值是0.1。
    1000 // 摄像机的远端面，默认值 2000
)

/// 创建渲染器
const renderer = new THREE.WebGLRenderer();

/// 设置大小
renderer.setSize(
    1000, // 宽度
    500 // 高度
);
/// 挂载到页面
document.body.appendChild(renderer.domElement)






/// 添加物体

/*
    width:立方体x轴的长度,
    height:立方体y轴的长度,
    depth:立方体z轴的长度也是深度
*/
let geometry = new THREE.BoxGeometry(10, 10, 10);



/// 添加材质
// const material = new THREE.MeshBasicMaterial({ color: 0xffff0000 });

/// 添加材质
const materials = []

for(let i = 0; i < 6; i++){
    materials.push(new THREE.MeshBasicMaterial({ color: Math.random() * 0x00ff0000 }))
}



/// 添加网格
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );


// 设置相机位置
camera.position.z = 50;

// 修改场景背景颜色
scene.background = new THREE.Color(0xffffcc99)


/// 添加 三色坐标轴
const axesHelper = new THREE.AxesHelper(20)
scene.add( axesHelper )


/// 渲染
function animate() {

    // 使用 requestAnimationFrame 执行动画
    requestAnimationFrame(animate)

    // 修改其旋转的度数，让其每次渲染增加0.01的弧段进行渲染
    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    //scene:前面定义的场景,camera:前面定义的相机
    //renderTarget:渲染的目标默认是是渲染到前面定义的render变量中
    //forceClear:每次绘制之前都将画布的内容给清除,即使自动清除标志autoClear为false,也会清除
    renderer.render(scene, camera)
}    

// 渲染
animate()
