<script>
export default {
    name: 'TooBusyButton',
    components: {}
}
</script>

<template>
    <div>
        <button
            type="button"
            :disabled="true"
            class="btn">
            {{$t('views.collectVaccination.loginDigid')}}
        </button>
        <div class="too-busy-message">
            {{$t('tooBusy')}}
        </div>
    </div>
</template>

<style lang="scss">

</style>
