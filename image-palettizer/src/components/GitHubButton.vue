<template>
    <div>
        <v-btn 
        @click="goToGitHub"
        class="selection"
        rounded
        >
            <v-icon left>mdi-github</v-icon>
            Project's repository
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'GitHubButton',
    methods: {
        goToGitHub(){
            window.open("https://github.com/GregoryKogan/Palettizer", '_blank').focus()
        },
    }
}
</script>
