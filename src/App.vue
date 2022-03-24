<template>
    <div id="app">
        <!-- Navbar -->
        <navbar-component />
        <!-- Main page -->
        <router-view class="page-container" />
        <!-- Footer -->
        <footer-component />
		<!-- Global Loader -->
		<loader-component />
    </div>
</template>

<script>
    import NavbarComponent from '@/components/NavbarComponent'
    import FooterComponent from '@/components/FooterComponent'
    import LoaderComponent from '@/components/utils/LoaderComponent'

    export default {
        components: {
            NavbarComponent,
            FooterComponent,
            LoaderComponent
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
        .page-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-top: 1rem;
        }
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: var(--color-bg2);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: auto 80%;
        background-attachment: fixed;
    }
</style>
