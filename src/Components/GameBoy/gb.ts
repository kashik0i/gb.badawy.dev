import {Gameboy} from "gameboy-emulator";

export default class GB {
    private gameboy: Gameboy;
    // private readonly fileInput: HTMLInputElement;
    private canvasContext;
    private screenSize: { width: number; height: number };

    constructor(ctx: CanvasRenderingContext2D) {
        this.gameboy = new Gameboy();
        this.canvasContext = ctx;
        // Log out all operations assembly
        // for (const operation of this.gameboy.cpu.operationMap.values()) {
        //     console.log(operation.instruction);
        // }
        // this.gameboy.
        this.screenSize = this.getLargestScreenSize();
        ctx.canvas.style.width = (this.screenSize)!.width + 'px';
        ctx.canvas.style.height = (this.screenSize)!.height + 'px';
        // ctx.canvas.width = ctx.canvas.offsetWidth;
        // ctx.canvas.height = ctx.canvas.offsetHeight;
        ctx.imageSmoothingEnabled = false;
    }

    getLargestScreenSize() {
        const {clientWidth, clientHeight} = document.body;

        const aspectRatio = 10 / 9;
        const borderSize = 60;
        const size = {width: 160, height: 144}; // native res

        if (clientWidth < clientHeight) {
            const portraitModeScreenHeight = (clientHeight / 2) - borderSize; // In portrait mode, screen can take up top half of page

            if ((clientWidth / aspectRatio) <= portraitModeScreenHeight) {
                size.width = clientWidth - borderSize;
                size.height = size.width / aspectRatio;
            } else {
                size.height = portraitModeScreenHeight
                size.width = size.height * aspectRatio;
            }
        } else {
            const topMenuHeight = 80;
            const landscapeModeScreenHeight = clientHeight - borderSize - topMenuHeight;
            const controlsWidth = 410;
            const landscapeWidth = clientWidth - borderSize - controlsWidth;

            if ((landscapeWidth / aspectRatio) <= landscapeModeScreenHeight) {
                size.width = landscapeWidth;
                size.height = size.width / aspectRatio;
            } else {
                size.height = landscapeModeScreenHeight;
                size.width = size.height * aspectRatio;
            }

        }

        return size;
    }

    async onFileChange(event, files) {
        console.log(files)
        if (files && files[0]) {
            const rom = await this.fileToArrayBuffer(files[0]);
            this.gameboy.loadGame(<ArrayBuffer>rom);

            this.gameboy.apu.enableSound();

            this.gameboy.onFrameFinished(imageData => {
                this.canvasContext.putImageData(imageData, 0, 0);
            });
            // this.canvasContext.canvas.style.width="fit-content"
            this.canvasContext.canvas.style.width="660px"
            // this.canvasContext.canvas.style.height="-webkit-fill-available"
            this.canvasContext.canvas.style.height="312px"
            this.gameboy.run(); // Run the game
        }


    }

    fileToArrayBuffer(file) {
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);

            fileReader.onerror = () => {
                fileReader.abort();
                reject(new Error('Error parsing file'))
            }

            fileReader.readAsArrayBuffer(file);
        });
    }
}