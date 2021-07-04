<template>
    <div class="row d-flex justify-content-center mt-3 pb-3" style="overflow-wrap: break-word;">
        <div class="col-10">
            <p style="font-size: 14px; margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px; text-align: center;">Fant {{ treff }} treff etter søkeordet <b><em>"{{ søket }}"</em></b> på {{ kjøretid }}ms</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            filters: Object,
        },
        setup() {
            return {
                
            }
        }
    }
</script>