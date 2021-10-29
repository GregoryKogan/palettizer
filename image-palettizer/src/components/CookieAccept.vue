<template>
    <v-footer
    v-if="!this.$store.state.cookieGotResponse"
    v-resize="onResize"
    fixed
    color="selection"
    min-height="60"
    >   
        <v-row v-if="windowWidth > 840">
            <span style="margin-top: auto; margin-bottom: auto;">
                This website uses cookies to save your settings and custom palettes.
                <a href="https://www.cookiesandyou.com/">More info</a>
            </span>
            <v-spacer></v-spacer>
            <v-btn @click="acceptCookies" color="green" light rounded>Accept</v-btn>
            <div style="width: 20px;"></div>
            <v-btn @click="declineCookies" color="red" light rounded>Decline</v-btn>
            <div style="width: 20px;"></div>
        </v-row>
        <v-col v-else>
            <span style="margin-top: auto; margin-bottom: auto;">
                This website uses cookies to save your settings and custom palettes.
                <a href="https://www.cookiesandyou.com/">More info</a>
            </span>
            <div style="height: 20px;"></div>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn @click="acceptCookies" color="green" light rounded>Accept</v-btn>
                <div style="width: 20px;"></div>
                <v-btn @click="declineCookies" color="red" light rounded>Decline</v-btn>
            </v-row>
            <div style="height: 5px;"></div>
        </v-col>
    </v-footer>
</template>

<script>
import Cookies from 'js-cookie'


export default {
    name: 'CookieAccept',
    data: () => ({
        windowWidth: window.innerWidth,
    }),
    created(){
        if (Cookies.get('cookiesGranted')){
            this.$store.commit('setCookieGotResponse', true)
            this.$store.commit('setCookieGranted', true)

            const palettesCookie = Cookies.get('userPalettes')
            if (palettesCookie){
                const palettes = JSON.parse(palettesCookie)
                this.$store.commit('setPalettes', palettes)
                this.$store.commit('setPalette', Object.keys(this.$store.state.palettes).reverse()[0])
            }
        }
    },
    methods: {
        onResize(){
            this.windowWidth = window.innerWidth
        },
        declineCookies(){
            this.$store.commit('setCookieGotResponse', true)
            this.$store.commit('setCookieGranted', false)
        },
        acceptCookies(){
            this.$store.commit('setCookieGotResponse', true)
            this.$store.commit('setCookieGranted', true)

            Cookies.set('cookiesGranted', 'true', { expires: 365, SameSite: 'Strict' })
        },
    },
}
</script>

<style>
</style>