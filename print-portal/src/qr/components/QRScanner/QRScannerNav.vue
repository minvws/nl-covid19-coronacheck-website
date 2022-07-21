<template>
  <header>
    <router-link
      class="link"
      v-for="{ name, params, title, description, icon, replace} in routes"
      :to="{ name, params }"
      :replace="replace"
      :key="description"
    >
      <div class="inner">
        <img v-if="icon && icon.position !== 'after'" class="icon" :src="icon.src" alt=""/>
        <div class="inner-content">
            <div class="link-title">{{ title }}</div>
            <div class="link-description">{{ description }}</div>
        </div>
        <img v-if="icon && icon.position === 'after'" class="icon" :src="icon.src" alt=""/>
        <img class="next" src="@/qr/assets/icons/next.svg" alt=""/>
      </div>
    </router-link>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        routes: {
            type: Array,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/typography.scss";
.link {
    display: block;
    font-family: $font-main;
    color: #383836;
    background: #F6FAFB;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 9px;
    margin-bottom: 24px;
    text-decoration: none;

    &-title {
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        padding: 16px 0 8px 0;
    }
    &-description {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        padding-bottom: 16px;
    }
}
.inner {
    display: flex;
    flex-direction: row;
    &-content {
        flex-grow: 1;
        margin-left: 18px;
    }
}

.icon {
    width: 24px;
    height: 24px;
    align-self: center;
    margin-left: 18px;
}
.next {
    width: 16px;
    height: 16px;
    align-self: center;
    margin: 0 18px;
}
</style>
