<script lang="ts">
    import GameBoySVG from "./GameboyAsset.svelte";
    import GB from "./gb";
    import {onMount} from "svelte";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D
    let gameboy: GB;
    let fileInput: HTMLInputElement;


    async function initGB() {
        gameboy = new GB(ctx);
        fileInput.addEventListener('change', (e) => gameboy.onFileChange(e, fileInput.files));
        const request = await fetch("public/games/brickster.gbc");
        const brickster = await request.blob();
        console.log(brickster)
        await gameboy.loadGame(brickster);
    }


    onMount(async () => {
        ctx = canvas.getContext("2d");
        await initGB();
        canvas.addEventListener("click", async () => {
            await canvas.requestPointerLock();
        });
        canvas.addEventListener('keydown', function (e) {
            e.preventDefault()
            console.log(e);
        });
    })


</script>
<div class="grid h-screen place-items-center">
    <input type="file" bind:this={fileInput} class="file-input mb-4"/>
    <GameBoySVG>
        <canvas bind:this={canvas} tabindex='1'
                style="image-rendering: pixelated; background: yellowgreen;">
            Your browser does not support the canvas element.
        </canvas>
    </GameBoySVG>

</div>
<style>
    /*.gb:focus {*/
    /*    outline: none;*/
    /*}*/
</style>