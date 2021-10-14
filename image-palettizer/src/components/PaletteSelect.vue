<template>
    <div class="palette-select">
        <vue-select
        class="palette-chooser"
        :options="Object.keys(this.$store.state.palettes)"
        :value="$store.state.palette"
        @input="setPalette"
        :clearable='false'
        placeholder="Choose color palette"
        >
            <template v-slot:option="option">
                <span class="option-bit">{{ option.label }}</span>
            </template>
            <template v-slot:selected-option=option>
                <v-icon color="#ff79c6" left :size="30">mdi-palette</v-icon>
                <span>{{option.label}}</span>
            </template>
        </vue-select>
        <PalettePreview class="select-preview" :colors="this.$store.state.palettes[this.$store.state.palette]"/>
    </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import PalettePreview from './PalettePreview.vue'


Vue.component('vue-select', vSelect)

export default {
    name: "PaletteSelect",
    components: { PalettePreview },
    data: () => ({
    }),
    methods: {
        setPalette(val) {
            if (val)
                this.$store.commit('setPalette', val)
        }
    },
}
</script>

<style>
    .palette-select {
        width: 100%;
    }
    .palette-select .select-preview{
        margin-top: 20px;
    }

    .palette-chooser .vs__search::placeholder,
    .palette-chooser .vs__dropdown-toggle{
        background: #282a36;
        border: solid 2px #bd93f9;
        border-radius: 10px;
        color: #f8f8f2;
        font-size: 17px;
    }
    .palette-chooser::selection{
        background: #bd93f9;
        color: #bd93f9;
    }
    .palette-chooser .vs__dropdown-menu{
        padding: 0;
        margin-top: 10px;
        background: #282a36;
        border-radius: 10px;
        color: #f8f8f2;
    }
    .palette-chooser .vs__dropdown-option{
        padding-left: 10px;
    }
    .palette-chooser .vs__dropdown-option--highlight{
        background-color: #bd93f9;
    }
    .palette-chooser .vs__search {
        color: #f8f8f2;
    }
    .palette-chooser .vs__selected{
        color: #f8f8f2;
    }
    .palette-chooser .vs__clear,
    .palette-chooser .vs__open-indicator {
        fill: #ff79c6;
    }
    .palette-chooser .option-bit{
        color: #f8f8f2;
    }
</style>