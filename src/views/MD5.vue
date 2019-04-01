<template>
    <v-container>
        <p class="font-weight-light font-italic headline">
            MD5 Encrypt
        </p>
        <v-form>
            <v-flex>
                <v-text-field v-model="unParsedData" required label="Text u want to encrypt">
                </v-text-field>
                <v-btn color="error" @click="encryptPost">
                    Submit
                </v-btn>
            </v-flex>
        </v-form>
        <v-flex pt-3>
            <v-textarea label="Encrypted Data here"
                        v-model="encryptedData">
            </v-textarea>
        </v-flex>
    </v-container>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class RSA extends Vue {
        unParsedData = ""
        encryptedData = ""

        private async encryptPost() {
            let data: { data: string, } = {
                data: this.unParsedData
            }
            const response = await this.axios.post("http://dom.gtmdcm.com:3000/api/md5_text", data);
            this.encryptedData = response.data;
        }
    }
</script>

<style scoped>

</style>
