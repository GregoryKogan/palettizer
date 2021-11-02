<template>
    <div style="width: 90%">
        <v-row>
            <v-spacer></v-spacer>
            <v-btn
            @click="exportPalettes"
            color="pink"
            rounded
            >
                Export
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            @click="importPalettes"
            color="purple"
            rounded
            >
                <input 
                type="file"  
                id="palettes-import-input" 
                @change="onPalettesFileSelect"
                style="display: none"
                >
                Import
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PaletteMigration',
    methods: {
        exportPalettes(){
            const defaultPalettes = ["Dracula", "Nord", "Tokyo Night", "Solarized", "Retrowave", "Gruvbox", "Onedark", "Monokai"]
            let userPalettes = {}
            const palettesKeys = Object.keys(this.$store.state.palettes)
            for (let i = 0; i < palettesKeys.length; ++i){
                if (!defaultPalettes.includes(palettesKeys[i])){
                    userPalettes[palettesKeys[i]] = this.$store.state.palettes[palettesKeys[i]]
                }
            }
            const palettesData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userPalettes))
            let a = document.createElement('a')
            a.href = palettesData
            a.download = "Palettes.json"
            a.style.display = 'none'
            a.click()
            a.remove()
        },
        importPalettes(){
            document.getElementById('palettes-import-input').click()
        },
        async onPalettesFileSelect(e){
            const data = e.target.files[0]
            if (data['type'].endsWith('json')){
                const parsedData = await new Response(data).text()
                const importedPalettes = JSON.parse(parsedData)
                const importKeys = Object.keys(importedPalettes)
                for (let i = 0; i < importKeys.length; ++i){
                    this.$store.commit('addPalette', {name: importKeys[i], colors: importedPalettes[importKeys[i]]})
                }
                this.$store.commit('setPalette', Object.keys(this.$store.state.palettes).reverse()[0])
            }
        },
    }
}
</script>

<style>

</style>