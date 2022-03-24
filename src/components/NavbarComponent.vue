<template>
    <section id="navbar-wrapper">
        <section class="container">
            <router-link to="/">Home</router-link>
            <router-link to="/form-builder">Field Builder</router-link>
            <router-link to="/about">About</router-link>
        </section>
    </section>
</template>

<script>
    export default {
        name: 'navbar-component'
    }
</script>

<style lang="scss">
    #navbar-wrapper {
        padding: 1.5rem;
        background: var(--color-bg1);
        text-align: center;
        border-bottom: 1px solid white;
        .container {
            a {
                font-weight: bold;
                color: white;
                display: inline-block;
                margin-right: 1rem;
                &.router-link-exact-active {
                    text-decoration: underline;
                }
            }
        }
    }

    @media (max-width: 576px) {
        #navbar-wrapper {
            .container {
                a {
                    width: 100%;
                    padding: 1rem;
                    &:hover {
                        color: var(--color-bg1);
                        background-color:rgba(255, 255, 255, 0.7);
                    }
                }
            }
        }
    }
</style>
