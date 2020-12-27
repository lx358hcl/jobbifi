<template>
    <main class="homepage container">

        <body class="stackedit mt-2">
            <div class="stackedit__html">
                <br>
                <h2 class="boldyh2">{{ stilling.title }}</h2>
                {{ stilling.companyImage }}
                <img width="600" height="150" v-bind:src="stilling['companyImage']">
                <hr>
                <a :href="stilling.url"><button type="button" class="btn btn-primary">Søk stilling</button></a>
                <br><br>
                <hr>
                <h3 class="d-flex">
                    <a style="font-size:20px;" class="link">{{ stilling.teknologier }}</a>
                </h3>
                <hr>
                <pre><code>Søkefrist: {{ stilling.date }}</code></pre>
                <hr>
                <h3 id="for-jobber">Jobbeskrivelse</h3>
                <hr>
                <p>
                    {{ stilling.about }}
                </p>
            </div>
            <br>
            <br>
            <br>
            <br>
        </body>
    </main>
</template>

<script>
    var axios = require("axios");
    import route from "../router/index.js";
    import { ref } from "vue";
    var stilling = ref("");
    export default {
        setup() {
            console.log(route.currentRoute.value.params.id);
            function axiosMe() {
                axios.get(
                        `http://localhost:3000/api/jobs?id=${route.currentRoute.value.params.id}`
                    )
                    .then(function (response) {
                        console.log(response.data);
                        stilling.value = response.data;
                    })
                    .catch(function (error) {
                        console.log("error from exios");
                        return error;
                    });
            }
            axiosMe();
            return {
                stilling
            }

        }
    }
</script>