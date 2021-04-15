<template>
  <div style="padding:0 15px" @click="nextPage">
    <button type="button" class="ui-button black">{{btnName}}</button>
  </div>
</template>

<script>
export default {
    props: {
        btnName: {
            type: String
        }
    },
    methods: {
        nextPage(){
            this.$emit("next")
        }
    }
};
</script>

<style>
</style>