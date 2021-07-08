<!-- Dette skriver teksten på velkommen-siden -->

<template>
    <div class = "d-flex align-items-center">
        <p id="skrivUt" style = "color:black; font-size:0.8em !important; font-weight:normal;">
        
        </p>
    </div>
</template>

<script>
    import Typewriter from 'typewriter-effect/dist/core';
    import { onMounted } from "vue";
    export default {
        setup() {
            onMounted(() => {
                var skrivUt = document.querySelector("#skrivUt");
                var typewriter = new Typewriter(skrivUt, {
                    autoStart: true,
                    delay: 40,
                    loop: true,
                });
                typewriter
                    .typeString('Studerer du informatikk/design?')
                    .pauseFor(1000)
                    .deleteAll(20)
                    .typeString('Er du utvikler/designer?')
                    .pauseFor(1000)
                    .deleteAll(20)
                    .typeString('Jobbifi aggregerer finn, nav og ifinavet daglig')
                    .pauseFor(1000)
                    .deleteAll(20)
                    .typeString('Da blir det lettere for deg å søke jobb')
                    .pauseFor(1000)
                    .deleteAll(20)
                    .typeString('Søk og se om du finner noe for deg')
                    .pauseFor(30000)
                    .deleteAll(20)
                    .start();
            });
            return {  }
        }
    }
</script>