<script>
export default {
    name: 'HolderIdentityCharacters',
    components: {},
    data() {
        return {
            genericHolder: {
                firstNameInitial: 'G',
                lastNameInitial: 'W',
                birthDayStyled: '01',
                birthDayMonthStyled: 'FEB'
            }
        }
    },
    computed: {
        testResult() {
            return this.$store.state.testResult;
        },
        holder() {
            return this.testResult ? this.testResult.holder : this.genericHolder;
        }
    },
    methods: {}
}
</script>

<template>
    <div class="HolderIdentityCharacters">
        <div class="HolderIdentityCharacters__set">
            <div class="HolderIdentityCharacters__label">
                1
            </div>
            <div class="HolderIdentityCharacters__value">
                {{holder.firstNameInitial}}
            </div>
        </div>
        <div class="HolderIdentityCharacters__set">
            <div class="HolderIdentityCharacters__label">
                2
            </div>
            <div class="HolderIdentityCharacters__value">
                {{holder.lastNameInitial}}
            </div>
        </div>
        <div class="HolderIdentityCharacters__set">
            <div class="HolderIdentityCharacters__label">
                3
            </div>
            <div class="HolderIdentityCharacters__value">
                {{holder.birthDayStyled}}
            </div>
        </div>
        <div class="HolderIdentityCharacters__set">
            <div class="HolderIdentityCharacters__label">
                4
            </div>
            <div class="HolderIdentityCharacters__value">
                {{holder.birthDayMonthStyled}}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.HolderIdentityCharacters {
    display: flex;

    .HolderIdentityCharacters__set {
        width: 56px;
        margin-right: 12px;

        .HolderIdentityCharacters__label {
            text-align: center;
            margin-bottom: 16px;
            font-size: 12px;
        }

        .HolderIdentityCharacters__value {
            height: 44px;
            border: 2px solid $black-1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 700;
            border-radius: 4px;
        }
    }
}
</style>
