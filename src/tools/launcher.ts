
import {SceneLoader, Engine, Scene} from "babylonjs"

/**
 * 定义加载模型时需传入的参数
 */
interface ILauncher {
    /**
     * 存放资产的目录
     */
    assetUrl: string,
    /**
     * 资产名称
     */
    assetName: string,
    /**
     * 渲染canvas的名称
     */
    container: string;
}

/**
 * 模型加载类
 */
export class Launcher {

    public assetUrl: string;
    public assetName: string;
    public canvas: HTMLCanvasElement;
    /**
     * babylonjs 引擎
     */
    public engine: Engine;
    /**
     * babylonjs 场景
     */
    public scene: Scene;

    /**
     * 类初始化
     * @param params 参数
     */
    constructor(params: ILauncher) {
        this.assetUrl = params.assetUrl;
        this.assetName = params.assetName;
        this.canvas = <HTMLCanvasElement>document.getElementById(<string>params.container);
    }

    public launch() {
        // 新建引擎
        this.engine = new Engine(this.canvas);
        // Resize事件
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        // 调用SceneLoader类加载模型
        SceneLoader.LoadAsync(this.assetUrl, this.assetName).then((scene) => {
            // 加载完成后的处理
            scene.whenReadyAsync().then(() => {
                // 创建默认相机
                scene.createDefaultCamera(true);
                scene.activeCamera.attachControl();
                // 创建默认光
                scene.createDefaultLight();
                // 不断循环渲染
                this.engine.runRenderLoop(() => {
                    scene.render();
                });
            });
        })
    }

}