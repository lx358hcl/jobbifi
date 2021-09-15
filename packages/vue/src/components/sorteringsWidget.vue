<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 d-flex justify-content-center">
            <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 my-2 px-1">
                <select @change="sendAntall($event)" class="form-select vis w-100 p-3" aria-label="Antall elementer som skal vises">
                    <option selected value="10">Vis 10 stillinger </option>
                    <option value="20">Vis 20 stillinger</option>
                    <option value="50">Vis 50 stillinger</option>
                    <option value="100">Vis 100 stillinger</option>
                    <option value="200">Vis 200 stillinger</option>
                </select>   
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 my-2 px-1">
                <select @change="byttIndex($event)"  class="form-select vis w-100 p-3" aria-label="Sorter etter kriterier">
                    <option value="søkeIndex" selected>Sorter etter relevanse</option>
                    <option value="newestFirstindex">Sorter etter nyeste</option>
                    <option value="fristFirstIndex">Sorter etter frist</option>
                    <option value="newestFirstindex">Sorter etter mest likte</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    setup(props, context){
        function sendAntall(event){
            context.emit("endrAntall", event.target.value);
        }
        function byttIndex(event){
            
            context.emit("byttIndex", event.target.selectedOptions[0].value);
        }
        return{
            sendAntall,
            byttIndex,
        }
    }
}

</script>