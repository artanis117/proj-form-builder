<template>
    <a class="custom-button" @click="$emit('click')" :class="{ big: isBig, small: isSmall }">
        {{ text }}
    </a>
</template>

<script>
    export default {
        name: 'button-component',
        props: {
            text: {
                type: String,
                required: true
            },
            size: {
                type: String,
                default: 'big'
            }
        },
        computed: {
            isBig() {
                return this.size === 'big'
            },
            isSmall() {
                return this.size === 'small'
            }
        }
    }
</script>

<style lang="scss">
    .custom-button {
        color: white;
        font-weight: bold;
        border-radius: 5px;
        border: 1px solid #52B153;
        background: #5BB85B;
        cursor: pointer;
        &.big {
            padding: 0.5rem 1rem;
        }
        &.small {
            padding: 0.2rem 0.5rem;
        }
    }
</style>
