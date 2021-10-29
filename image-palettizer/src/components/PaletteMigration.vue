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
            const palettesData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.$store.state.palettes))
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
                this.$store.commit('setPalettes', importedPalettes)
                this.$store.commit('setPalette', Object.keys(this.$store.state.palettes).reverse()[0])
            }
        },
    }
}
</script>

<style>

</style>