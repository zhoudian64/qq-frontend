<template>
    <v-container>
        <v-layout pt-3 pl-3>
            <v-flex>
                <p class="font-weight-light font-italic headline">
                    SQL injection
                </p>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-layout column pl-3 pt-3 pr-3 pb-3>
                        <p class="font-weight-light font-italic headline">
                            Login as {{username}} {{login_icon}}
                        </p>
                        <v-spacer></v-spacer>
                        <v-form>
                            <v-flex pr-3 pl-3 pt-3>
                                <v-text-field v-model="username" required label="username">
                                </v-text-field>
                            </v-flex>
                            <v-flex pr-3 pl-3>
                                <v-text-field v-model="password" required label="password">
                                </v-text-field>
                            </v-flex>
                            <v-btn color="error" v-on:click="loginPost">
                                Login
                            </v-btn>
                        </v-form>
                    </v-layout>
                </v-card>
                <v-card>
                    <v-layout column pl-3 pt-3 pr-3 pb-3>
                        <p class="font-weight-light font-italic headline">
                            query MY data
                        </p>
                        <v-data-table
                                :headers="item_table"
                                :items="item_list"
                        >
                            <template v-slot:no-data>
                                <v-alert :value=!ifLogin color="error" icon="warning">
                                    Please Login in first.
                                </v-alert>
                            </template>
                            <template v-slot:items="props">
                                <td>{{props.item.user}}</td>
                                <td>{{props.item.name}}</td>
                                <td>{{props.item.rate}}</td>
                            </template>
                        </v-data-table>
                    </v-layout>
                </v-card>
                <v-card>
                    <v-layout column pl-3 pt-3 pr-3 pb-3>
                        <p class="font-weight-light font-italic headline">
                            insert data
                        </p>
                        <v-form>
                            <v-flex pr-3 pl-3 pt-3>
                                <v-text-field v-model="insertItem" required label="item name">
                                </v-text-field>
                            </v-flex>
                            <v-flex pl-3 pt-3 pr-3>
                                <v-text-field v-model="insertRate" required label="rating">
                                </v-text-field>
                            </v-flex>
                            <v-btn color="error" v-on:click="insertPost">
                                insert
                            </v-btn>
                        </v-form>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class sql extends Vue {
        username: string = "";
        login_name: string = "";
        password: string = "";
        login_icon: string = "❌";
        ifLogin: boolean = false;
        item_table = [
            {
                text: 'User name',
                sortable: false,
                value: 'user'
            },
            {
                text: 'item',
                sortable: false,
                value: 'name'
            },
            {
                text: 'rating',
                value: 'rate',
                sortable: false
            }
        ];
        insertItem: string = "";
        insertRate: number = 5;
        item_list: Array = [];

        private async loginPost() {
            let data: { name: string, password: string } = {name: this.username, password: this.password}
            const response = await this.axios.post("http://localhost:9292/login", data)
            console.log(response)
            if (response.data.if_password_right === true) {
                this.login_name = this.username
                this.ifLogin = true
                this.login_icon = "✅"
                this.updateData()
            }
        }

        private async updateData() {
            let data: { name: string } = {name: this.login_name}
            if (this.ifLogin === true) {
                const response = await this.axios.post("http://localhost:9292/data", data)
                console.log(response.data)
                this.item_list = JSON.parse(JSON.stringify(response.data))
                console.log(this.item_list[0].name)
            }
        }

        private async insertPost() {
            let data: { name: string, item: string, rate: number } = {
                name: this.login_name,
                item: this.insertItem,
                rate: this.insertRate
            }
            if (this.ifLogin === true) {
                const response = await this.axios.post("http://localhost:9292/insert", data)
                this.updateData()
            }
        }

    }
</script>

<style scoped>

</style>