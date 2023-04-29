<script lang="ts">
    import GameBoy from "./Components/GameBoy/Gameboy.svelte";
    import ToggleDarkMode from "./Components/ToggleDarkMode.svelte";

</script>

<main class="flex-col">
    <ToggleDarkMode/>
    <GameBoy/>
</main>

<style lang="postcss">
    :root {
        --svelte-rgb: 255, 62, 0;
    }

    :global(body) {
        background-color: #f2eee2;
        color: #0084f6;
        transition: background-color 0.3s
    }

    :global(body.dark-mode) {
        background-color: #1d3040;
        color: #bfc2c7;
    }
</style>