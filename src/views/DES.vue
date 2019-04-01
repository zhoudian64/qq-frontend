<template>
    <v-container>
        <v-container>
            <p class="font-weight-light font-italic headline">
                DES Encrypt
            </p>
            <v-form>
                <v-flex>
                    <v-text-field v-model="unParsedData" required label="Text u want to encrypt.">
                    </v-text-field>
                    <v-text-field v-model="key" required label="key">
                    </v-text-field>
                    <v-btn color="error" v-on:click="encryptPost">
                        Submit
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-textarea label="Encrypted Data here"
                                v-model="encryptedData">
                    </v-textarea>
                </v-flex>
            </v-form>
        </v-container>
        <v-container>
            <p class="font-weight-light font-italic headline">
                DES Decrypt
            </p>
            <v-form>
                <v-flex>
                    <v-text-field v-model="hashedData" required label="Text u want to Decrypt.">
                    </v-text-field>
                    <v-text-field v-model="key" required label="key">
                    </v-text-field>
                    <v-btn color="error" v-on:click="decryptPost">
                        Submit
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-textarea label="Decrypted Data here"
                                v-model="decryptedData">
                    </v-textarea>
                </v-flex>
            </v-form>
        </v-container>
    </v-container>


</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class RSA extends Vue {
        unParsedData = "";
        key = "";
        encryptedData = "";
        hashedData = "";
        decryptedData = "";

        private async encryptPost() {
            let data: { data: string, key: string } = {
                data: this.unParsedData,
                key: this.key,
            };
            const response = await this.axios.post("http://dom.gtmdcm.com:3000/api/des_encrypt_text", data);
            this.encryptedData = response.data
        }

        private async decryptPost() {
            let data: { data: string, key: string } = {
                data: this.hashedData,
                key: this.key,
            };
            const response = await this.axios.post("http://dom.gtmdcm.com:3000/api/des_decrypt_text", data);
            this.decryptedData = response.data
        }
    }
</script>

<style scoped>

</style>
