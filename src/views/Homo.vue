<template>
    <v-container>
        <v-card>
            <v-layout pt-3 pl-3>
                <v-flex>
                    <p class="font-weight-light font-italic headline">
                        Paillier
                    </p>
                </v-flex>
            </v-layout>
            <v-layout ml-3 mr-3 pb-3>
                <v-flex>
                    <!--TODO Generate Key-Pair-->
                    <v-card>
                        <v-layout column pl-3 pt-3 pr-3 pb-3>
                            <p class="font-weight-light font-italic headline">
                                Generate Key-Pair
                            </p>
                            <v-btn color="error" v-on:click="generatePost">
                                Generate
                            </v-btn>
                        </v-layout>
                        <v-layout pl-3 pr-3>
                            <v-textarea outline readonly label="PrivateKey here" v-model="paillierPrivateKey">
                            </v-textarea>
                            <v-textarea outline readonly label="PublicKey here" v-model="paillierPublicKey">
                            </v-textarea>
                        </v-layout>
                    </v-card>
                    <!--TODO Encrypt-->
                    <v-card>
                        <v-layout column pl-3 pt-3 pr-3 pb-3 mt-2>
                            <p class="font-weight-light font-italic headline">
                                Encrypt
                            </p>
                            <p class="blue--text headline">
                                On Client
                            </p>
                            <v-btn color="error" v-on:click="encryptHomoPost">
                                Encrypt
                            </v-btn>
                        </v-layout>
                        <v-layout pl-3 pr-3>
                            <v-flex pl-3 pr-3 pb-3>
                                <v-card>
                                    <v-form>
                                        <v-flex pr-3 pl-3 pt-3>
                                            <v-text-field v-model="paillierPublicKey" required label="Public Key here">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-text-field v-model="rawEncryptMessage" required
                                                          label="Message you want to Encrypt here">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-textarea readonly label="Encrypted Message here" v-model="encryptedData">
                                            </v-textarea>
                                        </v-flex>
                                    </v-form>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <!--TODO Decrypt-->
                    <v-card>
                        <v-layout column pl-3 pt-3 pr-3 pb-3 mt-2>
                            <p class="font-weight-light font-italic headline">
                                Decrypt
                            </p>
                            <p class="blue--text headline">
                                On Client
                            </p>

                            <v-btn color="error" v-on:click="decryptHomoPost">
                                Decrypt
                            </v-btn>
                        </v-layout>
                        <v-layout pl-3 pr-3>
                            <v-flex pl-3 pr-3 pb-3>
                                <v-card>
                                    <v-form>
                                        <v-flex pr-3 pl-3 pt-3>
                                            <v-text-field v-model="paillierPrivateKey" required
                                                          label="Private Key here">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex pr-3 pl-3 pt-3>
                                            <v-text-field v-model="rawDecryptMessage" required
                                                          label="Message you want to Decrypt here">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-textarea readonly label="Decrypted Message here" v-model="decryptedData">
                                            </v-textarea>
                                        </v-flex>
                                    </v-form>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <!--TODO Add-->
                    <v-card>
                        <v-layout column pl-3 pt-3 pr-3 pb-3 mt-2>
                            <p class="font-weight-light font-italic headline">
                                Add(message1, message2)
                            </p>
                            <p class="yellow--text headline">
                                On Server
                            </p>
                            <v-btn color="error" v-on:click="addPost">
                                ADD!
                            </v-btn>
                        </v-layout>
                        <v-layout pl-3pr-3>
                            <v-flex pl-3 pr-3 mb-3>
                                <v-card>
                                    <v-form>
                                        <v-flex pr-3 pl-3 pt-3>
                                            <v-text-field v-model="paillierPublicKey" required label="Public Key here">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-textarea outline label="message1 here" v-model="addMessage1">
                                            </v-textarea>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-textarea outline label="message2 here" v-model="addMessage2">
                                            </v-textarea>
                                        </v-flex>
                                        <v-flex pr-3 pl-3>
                                            <v-text-field readonly clabel="Add response(un-decrypted)"
                                                          v-model="addResponse">
                                            </v-text-field>
                                        </v-flex>
                                    </v-form>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Homo extends Vue {
        paillierPrivateKey = "";
        paillierPublicKey = "";
        PublicKeyOBJ = {N: "", G: "", NSquared: ""};
        PrivateKeyOBJ = {
            N: "", G: "", NSquared: "", M: "", P: "", Pp: "",
            Pminusone: "", Q: "", Qq: "", Qminusone: "",
            Pinvq: "", Hp: "", Hq: "", Pq: "",
        };
        rawEncryptMessage = "";
        rawDecryptMessage = "";
        encryptedData = "";
        decryptedData = "";
        addMessage1 = "";
        addMessage2 = "";
        addResponse = "";

        private getPubKey() {
            return JSON.parse(this.paillierPublicKey)
        }

        private getPrivKey() {
            return JSON.parse(this.paillierPrivateKey)
        }

        private async generatePost() {
            const response = await this.axios.get("http://localhost:8082/generate")
            const publicKey = {
                N: response.data.N,
                G: response.data.G,
                NSquared: response.data.NSquared
            }
            const privateKey = {
                N: response.data.N,
                G: response.data.G,
                NSquared: response.data.NSquared,
                P: response.data.P,
                Pp: response.data.Pp,
                Pminusone: response.data.Pminusone,
                Q: response.data.Q,
                Qq: response.data.Qq,
                Qminusone: response.data.Qminusone,
                Pinvq: response.data.Pinvq,
                Hp: response.data.Hp,
                Hq: response.data.Hq,
                Pq: response.data.N,
            }
            this.paillierPublicKey = JSON.stringify(publicKey)
            this.paillierPrivateKey = JSON.stringify(privateKey)
        }

        private async encryptHomoPost() {
            this.PublicKeyOBJ = this.getPubKey()
            let data: { N: string, G: string, NSquared: string, M: string } = {
                N: this.PublicKeyOBJ.N,
                G: this.PublicKeyOBJ.G,
                NSquared: this.PublicKeyOBJ.NSquared,
                M: this.rawEncryptMessage
            }
            const response = await this.axios.post("http://localhost:8082/encrypt", data)
            this.encryptedData = response.data
        }

        private async decryptHomoPost() {
            this.PrivateKeyOBJ = this.getPrivKey()
            let data: {
                N: string, G: string, NSquared: string, M: string, P: string, Pp: string,
                Pminusone: string, Q: string, Qq: string, Qminusone: string,
                Pinvq: string, Hp: string, Hq: string, Pq: string,
            } = {
                N: this.PrivateKeyOBJ.N,
                G: this.PrivateKeyOBJ.G,
                NSquared: this.PrivateKeyOBJ.NSquared,
                M: this.rawDecryptMessage,
                P: this.PrivateKeyOBJ.P,
                Pp: this.PrivateKeyOBJ.Pp,
                Pminusone: this.PrivateKeyOBJ.Pminusone,
                Q: this.PrivateKeyOBJ.Q,
                Qq: this.PrivateKeyOBJ.Qq,
                Qminusone: this.PrivateKeyOBJ.Qminusone,
                Pinvq: this.PrivateKeyOBJ.Pinvq,
                Hp: this.PrivateKeyOBJ.Hp,
                Hq: this.PrivateKeyOBJ.Hq,
                Pq: this.PrivateKeyOBJ.N
            }
            const response = await this.axios.post("http://localhost:8082/decrypt", data)
            this.decryptedData = response.data
        }

        private async addPost() {
            this.PublicKeyOBJ = this.getPubKey()
            let data: { N: string, G: string, NSquared: string, Message1: string, Message2: string } = {
                N: this.PublicKeyOBJ.N,
                G: this.PublicKeyOBJ.G,
                NSquared: this.PublicKeyOBJ.NSquared,
                Message1: this.addMessage1,
                Message2: this.addMessage2
            }
            const response = await this.axios.post("http://localhost:8082/add", data)
            this.addResponse = response.data
        }
    };
</script>

<style scoped>

</style>
