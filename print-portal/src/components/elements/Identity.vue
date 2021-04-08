<script>
export default {
    name: 'Identity',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Identity">
        <div class="logo-nederland">
            <img
                alt="todo"
                width="45"
                src="assets/img/temp/nederland.png"/>
        </div>
        <div class="pagewrap">
            <img
                class="Identity__image"
                alt="todo"
                height="300"
                src="assets/img/temp/corona-check.png"/>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Identity {
    background: $background-color-1;
    position: relative;
    height: 300px;
    display: flex;
    align-items: flex-end;

    .logo-nederland {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    @include mobile() {
        justify-content: center;

        .Identity__image {
            display: block;
            width: 350px;
            height: auto;
        }
    }
}
</style>
