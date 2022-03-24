<template>
    <section class="container home-page">
        <article class="home-content">
            <router-link to="/form-builder">
                <div>Welcome to Quick Base Front End Craft Demo!</div>
                <div>---click here to enter---</div>
            </router-link>
        </article>
    </section>
</template>

<script>
    export default {
        name: 'home-view'
    }
</script>

<style lang="scss" scoped>
    .home-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-bg1);
        font-size: 2.5rem;
        font-weight: bold;
        margin: 1rem auto;
        .home-content {
            text-align: center;
            min-width: 50%;
            border-radius: 10px;
            padding: 1.5rem;
            border: 1px solid white;
            background-color:rgba(255, 255, 255, 0.7);
        }
    }

    @media (max-width: 576px) {
        .home-page {
            font-size: 1.5rem;
        }
    }
</style>
