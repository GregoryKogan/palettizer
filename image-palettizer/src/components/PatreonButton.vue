<template>
    <div>
        <v-btn 
        @click="goToPatreon"
        class="red"
        rounded
        >
            <v-icon left>mdi-patreon</v-icon>
            Become a Patron!
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'PatreonButton',
    methods: {
        goToPatreon(){
            window.open("https://www.patreon.com/bePatron?u=63844149", '_blank').focus()
        },
    }
}
</script>

<style>

</style>