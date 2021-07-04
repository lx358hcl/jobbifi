<template>
    <section class="w-100 container float-right px-0">
        <div class="card d-flex align-items-center justify-content-center">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h6>{{ stilling.opprinnelse }}</h6>
                        <br>
                        <h6>{{ stilling.companyName }}</h6>
                        <br>
                        <h6>{{ stilling.likes }}</h6>
                        <br>
                        <h6>{{ stilling.frist }}</h6>
                        <br>
                        <h6>{{ stilling.teknologier }}</h6>
                        <br>
                        <h6>{{ stilling.position }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    export default{
        props:{
            stilling: Object,
        },
        setup(){
            return{
                
            }
        }
    }

</script>