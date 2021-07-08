<template>
    <div class="col d-block d-md-none">
        <button @click="visFilter" class="btn btn-primary" id="filterMenyKnapp" type="button" style="width: 100%;background: rgb(235,235,235);color: rgb(69,69,69);margin-bottom: 6px;border-color: #d6d6d6;padding: 10px;">Filtrer stillinger</button>
    </div>
    <!--Filtermeny-->
    <div ref="filter" class="selveFilteret col-11 col-sm-12 col-md-4 col-lg-4 col-xl-3 animate__animated d-none d-md-block mt-2" role="dialog" aria-hidden="true">
        <filterBubbles :facets = "settings"></filterBubbles>
        <div>
            <h1 class="d-flex justify-content-between align-items-center align-content-center" style="font-size: 26px;margin-bottom: 4px;">Filtrer stillinger<i class="fa fa-close d-block d-md-none" id="lukkFilter" style="font-size: 31px;" tabindex="0"></i></h1>
            <!-- Start: Ekstra -->
        </div>
        <!-- End: Ekstra -->
        <hr style="margin-top: 7px;margin-bottom: 7px;">
        <!-- Start: Ekstra -->
        <div>
            <p style="margin-bottom: 0px;font-size: 14px;">Vis fra</p>

            <div style="margin-left: 8px;">
                <div class="form-check">
                    <input :checked="settings.opprinnelse.find(e => e.split(':')[1] == 'ifijobs')" @click="changeFacet('ifijobs')" class="form-check-input clickable" type="checkbox" id="ifijobs">
                    <label class="form-check-label clickable" for="ifijobs">ifinavet.no
                        <span v-if="facets && facets.opprinnelse" class="float-right badge badge-dark clickable">{{ facets.opprinnelse.ifijobs ? facets.opprinnelse.ifijobs : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span>
                    </label>
                </div>
                <div class="form-check">
                    <input :checked="settings.opprinnelse.find(e => e.split(':')[1] == 'arbeidsplassen')"  @click="changeFacet('arbeidsplassen')" class="form-check-input clickable" type="checkbox" id="arbeidsplassen">
                    <label class="form-check-label clickable" for="arbeidsplassen">nav.no
                        <span v-if="facets && facets.opprinnelse" class="float-right badge badge-dark clickable">{{ facets.opprinnelse.arbeidsplassen ? facets.opprinnelse.arbeidsplassen : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span> 
                    </label>
                </div>
                <div class="form-check">
                    <input :checked="settings.opprinnelse.find(e => e.split(':')[1] == 'finn')" @click="changeFacet('finn')" class="form-check-input clickable" type="checkbox" id="finn">
                    <label class="form-check-label clickable" for="finn">finn
                        <span v-if="facets && facets.opprinnelse" class="float-right badge badge-dark clickable">{{ facets.opprinnelse.finn ? facets.opprinnelse.finn : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- End: Ekstra -->
        <hr style="margin-top: 7px;margin-bottom: 7px;">
        <!-- Start: Ekstra -->
        <div>
            <p class = "font-weight-bold" style="margin-bottom: 0px;font-size: 14px;">Type stilling</p>
            <div style="margin-left: 8px;">
                <div class="form-check">
                    <input :checked="settings.position.find(e => e.split(':')[1] == 'fulltid')" class="form-check-input clickable" @click="changeFacet('fulltid')" type="checkbox" id="fulltid">
                    <label class="form-check-label clickable" for="fulltid">Fulltid
                        <span v-if="facets && facets.position" class="float-right badge badge-dark clickable">{{ facets.position.fulltid ? facets.position.fulltid : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span>
                    </label>
                </div>
                <div class="form-check">
                    <input :checked="settings.position.find(e => e.split(':')[1] == 'deltid')" class="form-check-input clickable" @click="changeFacet('deltid')" type="checkbox" id="deltid">
                    <label class="form-check-label clickable" for="deltid">Deltid
                        <span v-if="facets && facets.position" class="float-right badge badge-dark clickable">{{ facets.position.deltid ? facets.position.deltid : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span>
                    </label>
                </div>
                <div class="form-check">
                    <input :checked="settings.position.find(e => e.split(':')[1] == 'annet')" class="form-check-input clickable" @click="changeFacet('annet')" type="checkbox" id="annet">
                    <label class="form-check-label clickable" for="annet">Annet
                        <span v-if="facets && facets.position" class="float-right badge badge-dark clickable">{{ facets.position.annet ? facets.position.annet : 0 }}</span>
                        <span v-else class="float-right badge badge-dark clickable">0</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- End: Ekstra -->
        <hr style="margin-top: 7px;margin-bottom: 7px;">
        <!-- Start: Ekstra -->
        <div class="filterBoks">
            <p class = "font-weight-bold" style="margin-bottom: 0px;font-size: 14px;">Ferdigheter/Egenskaper</p>
            <div style="margin-left: 8px;">
                <span v-if="!facets.teknologier"><em>Ingenting å vise for dette søket</em></span>
                <div v-else v-for="(antall, tekno) in facets.teknologier" :key="tekno" class="form-check">
                    <input :checked="settings.teknologier.find(e => e.split(':')[1] == tekno)" class="form-check-input clickable" @click="changeTeknoCompany($event.target)" type="checkbox" :id="tekno">
                    <label class="form-check-label clickable" style="width: 100%"  :for="tekno">{{ tekno }}
                        <span class="float-right badge badge-dark clickable">{{ antall }}</span>
                    </label>
                </div>
            </div>
        </div>
        <hr style="margin-top: 7px;margin-bottom: 7px;">
        <div class="filterBoks">
            <p class = "font-weight-bold" style="margin-bottom: 0px;font-size: 14px;">Firma/Selskap</p>
            <div style="margin-left: 8px;">
                <span v-if="!facets.companyName"><em>Ingenting å vise for dette søket</em></span>
                <div v-else v-for="(antall, firma) in facets.companyName" :key="firma" class="form-check">
                    <input :checked="settings.companyName.find(e => e.split(':')[1] == firma)" class="form-check-input clickable" @click="changeCompany($event.target)" type="checkbox" :id="firma">
                    <label class="form-check-label clickable" style="width: 100%" :for="firma">
                        <p class = "d-inline-block m-0 p-0" style = "width:85% !important;" >{{ firma }}</p>
                        <span class="float-right badge badge-dark">{{ antall }}</span>
                    </label>
                </div>
            </div>
        </div>
        <hr style="margin-top: 7px;margin-bottom: 7px;">
        <div class="filterBoks">
            <p class = "font-weight-bold" style="margin-bottom: 0px;font-size: 14px;">Sted</p>
            <div style="margin-left: 8px;">
                <span v-if="!facets.sted"><em>Ingenting å vise for dette søket</em></span>
                <div v-else v-for="(antall, sted) in facets.sted" :key="sted" class="form-check">
                    <input :checked="settings.sted.find(e => e.split(':')[1] == sted)" class="form-check-input clickable" @click="changeSted($event.target)" type="checkbox" :id="sted">
                    <label class="form-check-label clickable" style="width: 100%" :for="sted">
                        <p class = "d-inline-block m-0 p-0" style = "width:85% !important;" >{{ sted }}</p>
                        <span class="float-right badge badge-dark">{{ antall }}</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- End: Ekstra -->
        <!-- Start: VisResultater -->
        <div class="row d-block d-md-none" id="visResultaterKnapp" style="margin-top: 20px;">
            <div class="col d-flex justify-content-center">
                <button @click="visFilter" class="btn btn-primary" type="button" style="width: 100%;background: var(--red);border-style: solid;border-color: rgb(187,0,18);">Vis resultater</button>
            </div>
        </div>
        <!-- End: VisResultater -->
    </div>
</template>

<script>
    import { ref, onMounted } from "vue";
    var filter = ref(null);
    var fjernFilter = ref(null);

    function visFilter(){
        filter.value.classList.toggle("d-none");
    }

    function gjemFilter(){
        filter.value.classList.remove("d-none");
    }

    export default {

        props: {
            facets: Object,
            settings: Object,
        },
        setup(props, context) {
            onMounted(() => {
                // visFilter();
            })

            function changeFacet(str) {
                context.emit("filteringOccurred", str);
            }
            function changeTeknoCompany(str1) {
                console.log(str1.id);
                context.emit("filtering", str1.id);
            }
            function changeCompany(str1) {
                console.log(str1.id);
                context.emit("companyChangeOccurred", str1.id);
            }
            function changeSted(str1) {
                console.log(str1.id);
                context.emit("stedChanged", str1.id);
            }
            return {
                changeFacet,
                changeTeknoCompany,
                changeCompany,
                changeSted,
                visFilter,
                filter,
                fjernFilter
            }
        }
    }
</script>