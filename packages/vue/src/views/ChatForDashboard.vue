<template>
  <div v-if = "details" class="p-0 m-0">
    <div class="row w-100 m-0 p-0">
      <div class="col-12 px-3 py-0 m-0 border-bottom p-1">
        <div class="container px-3 py-2 m-0">
          <div class="row">
            <router-link :to = "'/bruker/' + (details.thisUser == details.starterBrukernavn ? details.mottakerBrukernavn : details.starterBrukernavn)">
              <div class="col-2 bilde animate__animated animate__fadeIn" style="border: 2px solid #d4d4d4;" v-bind:style="{ backgroundImage: 'url(' + (details.thisUser == details.mottaker ? details.starterProfilBilde : details.mottakerProfilBilde) + '), url(https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_200x200.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00)' }">
            
              </div>
            </router-link>
            <div :class="{'d-flex': !details.meldinger, 'align-items-center':!details.meldinger}" class="col-9">
              <div class="row">
                <div class="col-12 text-left">
                  <p class="m-0 mb-1 name"> {{ details.thisUser == details.starterBrukernavn ? details.mottakerBrukernavn : details.starterBrukernavn }}</p>
                  <p v-if="details.meldinger" class="m-0 small" style="text-overflow: ellipsis !important;white-space: nowrap;overflow: hidden;">
                    {{ details.meldinger[details.meldinger.length - 1].content}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-start m-0 p-0">
      <div class="p-0">
        <p class="m-0 p-0">{{ chat }} </p>
        <p class="m-0 p-0">{{ details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chat: Array,
      details: Object,
    },
    setup(props, context) {
      return {
      }
    }
  }
</script>