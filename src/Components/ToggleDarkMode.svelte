<script>
    import FaMoon from 'svelte-icons/fa/FaMoon.svelte'

    function toggle() {
        window.document.body.classList.toggle('dark-mode')
    }
</script>
<div on:click={toggle} class="cursor-pointer">
    <FaMoon />
</div>
<style>
    div {
        margin-left: 97%;
        margin-top: 1%;
        display: flex;
        width: 20px;
    }

    :global(body.dark-mode) div {
        background-color: #1d3040;
        color: white;
    }
</style>