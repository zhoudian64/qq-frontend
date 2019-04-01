<template>
    <v-app
            id="inspire"
            dark
    >
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
        >
            <v-list dense>
                <v-list-tile router v-for="item in items" :key="item.text" :to="item.to" :target="item.to">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-1">Participant</v-subheader>
                <v-list>
                    <v-list-tile v-for="item in items2" :key="item.name" avatar @click="">
                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
                        <v-list-tile-title v-text="item.id"></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                color="red"
                dense
                fixed
                clipped-left
                app
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="mr-5 align-center">
                <span class="font-weight-regular font-italic">Information Safety</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fill-height>
                <v-flex>
                    <router-view></router-view>
                </v-flex>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    export default {
        data: () => ({
            drawer: null,
            items: [
                {icon: "looks_one", text: "Encrypt", to: "/"},
                {icon: "looks_two", text: "To be continued.", to:"/"},
                {icon: "looks_3", text: "To be continued.", to:"/"},
                {icon: "looks_4", text: "To be continued.", to:"/"},
                {icon: "looks_5", text: "To be continued.", to:"/"}
            ],
            items2: [
                {name: "周典", id: "17120186"},
                {name: "周岑昊", id: "17120219"},
            ]
        }),
        props: {
            source: String
        }
    };
</script>
