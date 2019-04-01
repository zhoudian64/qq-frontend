<template>
    <v-container>
        <v-card grid-list-md>
            <v-layout row wrap pa-3 ma-3>
                <v-btn to="rsa">
                    RSA
                </v-btn>
                <v-btn to="des">
                    DES
                </v-btn>
                <v-btn to="aes">
                    AES
                </v-btn>
                <v-btn to="md5">
                    MD5&amp;SHA-series
                </v-btn>
            </v-layout>
        </v-card>
        <v-card>
            <v-layout pa-3 ma-3>
                <router-view></router-view>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Encrypt extends Vue {
    };
</script>

<style scoped>
</style>
