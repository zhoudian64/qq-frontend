<template>
    <v-container>
        <v-container>
            <p class="font-weight-light font-italic headline">
                Encrypt
            </p>
            <v-form>
                <v-flex>
                    <v-text-field v-model="unParsedData" required label="numbers u want to encrypt">
                    </v-text-field>
                    <v-text-field v-model="bigPrime1" label="A big prime.">
                    </v-text-field>
                    <v-text-field v-model="bigPrime2" label="Another big prime">
                    </v-text-field>
                    <v-btn color="error" v-on:click="encryptPost">
                        Submit
                    </v-btn>
                </v-flex>
                <v-flex pt-3>
                    <v-text-field v-model="encryptedData"
                                  solo clearable
                                  label="encrypted data here.">
                    </v-text-field>
                </v-flex>
            </v-form>
        </v-container>
        <v-container>
            <p class="font-weight-light font-italic headline">
                Decrypt
            </p>
            <v-form>
                <v-flex>
                    <v-text-field v-model="hashedData" required label="numbers u want to decrypt">
                    </v-text-field>
                    <v-text-field v-model="bigPrime1" label="Big Prime 1">
                    </v-text-field>
                    <v-text-field v-model="bigPrime2" label="Big Prime 2">
                    </v-text-field>
                    <v-btn color="error">
                        Submit
                    </v-btn>
                </v-flex>
                <v-flex pt-3>
                    <v-text-field v-model="decryptedData"
                                  solo clearable
                                  label="decrypted data here.">
                    </v-text-field>
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
        bigPrime1 = "";
        bigPrime2 = "";
        encryptedData = "";
        hashedData = "";
        decryptedData = "";

        private async encryptPost() {
            let data: { data: string, p?: string, q?: string } = {
                data: this.unParsedData
            };
            if (this.bigPrime1 !== "" && this.bigPrime2 !== "") {
                data = {
                    ...data,
                    p: this.bigPrime1,
                    q: this.bigPrime2,
                };
            }
            const response = await this.axios.post("http://localhost:8000/rsa_encrypt_numbers", data);
            this.hashedData = response.data;
        }
    };
</script>

<style scoped>

</style>
