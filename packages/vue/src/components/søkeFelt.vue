<template>
    <div class="input-group outerInputArea m-auto">
        <input ref="focusInput" :value="searchQuery ? searchQuery : $route.query.search" @keyup="sendSearchString($event.target.value);" type="text" class="form-control" placeholder="Søk etter noe kjedelig" aria-label="Username" aria-describedby="basic-addon1">
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from "vue"; 

var focusInput = ref(null);

export default{
    props:{
        searchQuery: String,
    },
    setup(props, context){
        onMounted(() => {
            // focusInput.value.focus();
        })
        const route = useRoute();
        console.log(route.query.search);
        
        //Send søkinfo til Stillinger fordi den er ansvarlig for søkingen
        function sendSearchString(str){
            context.emit("searchOccurred", str);
        }
        
        //Hvis brukeren kommer fra "HOME"-siden så vil routeren ha innhold, hvis ikke så har ikke brukeren det
        if(route.query.search){
            sendSearchString(route.query.search);
        }

        return{
            sendSearchString,
            focusInput,
        }
    }
}

</script>