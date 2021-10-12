<template>
    <div 
    v-if="(this.$store.state.status != 'Empty') && (this.$store.state.status != 'Original')" 
    class="progress-bar">
        <span class="status">{{this.$store.state.status}}</span>
        <v-progress-linear 
        :value="this.$store.state.progress"
        color="#bd93f9"
        height="5"
        dark
        rounded
        ></v-progress-linear>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: [],
    data: () => ({}),
}
</script>

<style>
    .progress-bar{
        width: max(350px, min(90vw, 800px));
        margin-top: 20px;
    }
    .progress-bar .status{
        color: #f8f8f2;
        font-size: 19px;
    }
</style>