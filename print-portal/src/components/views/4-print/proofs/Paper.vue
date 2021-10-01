<script>
import LogoRijksoverheid from '@/components/elements/LogoRijksoverheid';

export default {
    name: 'Paper',
    props: {
        region: {
            type: String,
            required: true,
            validator: (value) => {
                return ['domestic', 'european'].indexOf(value) > -1;
            }
        }
    },
    components: { LogoRijksoverheid },
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Paper">
        <div class="Paper__overheid">
            <LogoRijksoverheid
                :width="13" />
        </div>
        <h4>
            {{$t('components.proofRegion.' + region + '.paperTitle')}}
        </h4>
        <div class="Paper__flag">
            <img :src="'assets/img/flags/' + region + '.png'" alt="" />
        </div>
    </div>
</template>

<style lang="scss">
.Paper {
    width: 140px;
    height: 198px;
    background: #fff;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
    position: relative;
    padding: 40px 20px 36px 20px;

    &__overheid {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    &__flag {
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translate(-50%);

        img {
            width: 93px;
            height: auto;
        }
    }

    h4 {
        font-size: calc(13.5rem / 16);
        margin: 0;
        text-align: center;
    }
}
</style>
