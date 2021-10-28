<template>
    <div>
        <v-app-bar
        fixed
        color="#282a36"
        hide-on-scroll
        :scroll-threshold="10"
        dense
        dark
        >
            <v-btn text rounded @click="goToAbout">About</v-btn>
            <v-spacer></v-spacer>
            <v-btn 
            icon 
            style="position: absolute; left: 50%; transform: translate(-50%, 0)"
            @click="goToHome"
            >
                <div class="logo-icon" >
                    <v-img 
                    src="../assets/logo.png" 
                    contain
                    ></v-img>
                </div>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="goToPalettes">Palettes</v-btn>
        </v-app-bar>
        <div style="height: 48px;"></div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    props: [],
    data: () => ({}),
    methods: {
        goToAbout(){
            if (this.$route.name != 'About')
                this.$router.push('/about')
        },
        goToHome(){
            if (this.$route.name != 'Home')
                this.$router.push('/')
        },
        goToPalettes(){
            if (this.$route.name != 'Palettes')
                this.$router.push('/palettes')
        },
    }
}
</script>

<style>
.logo-icon{
    height: 90%;
    width: 43px;
}
</style>