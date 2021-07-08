<template>
    <div class="row my-0 py-0" style="padding-top: 14px;padding-bottom: 14px;border-radius: 2px;">
        <div class="col-12">
            <div class="row py-2" style="padding-bottom: 0px;padding-top: 8px;">
                <div class="col-3 p-0 pl-3 pr-2 m-0 rounded mt-0 d-flex justify-content-center align-items-center">
                    <div class="w-100 h-100 p-0 m-0" v-bind:style="{ backgroundImage: 'url(' + ting.companyImage + ')' }" style="width: 70px !important; min-width: 70px !important;border-radius:10px; background-repeat: no-repeat; border: 3px solid white; background-position: center; background-size: cover;">
                    </div>
                </div>
                <div class="col-9 p-2" style="padding-left: 0px;">
                    <p class="mb-0 small text-left" style="font-weight: bold;font-family: Lato;">{{ ting.title }} </p>
                    <p class="small text-left" style="font-family: Lato;color: rgb(126,126,126);">{{ ting.sted }}</p>
                </div>
            </div>
        </div>
        <div class="col-12" style="padding-top: 3px;padding-bottom: 9px;">
            <div class="btn-group w-100" role="group">
                <button type="button" class="btn btn-light rounded mr-1 d-flex align-items-center justify-content-center flex-row lagredeStillingerKnapp">
                    <i class="fas fa-trash-alt"></i>
                    <p class = "small font-weight-bold m-0">Fjern</p>
                </button>
                <button type="button" class="btn btn-light rounded mr-1 d-flex align-items-center justify-content-center flex-row lagredeStillingerKnapp">
                    <i class="fas fa-thumbs-up"></i>
                    <p class = "small font-weight-bold m-0">Unlike</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        props:{
            ting: Object
        },
        setup(){
            return{

            }
        }
    }

</script>