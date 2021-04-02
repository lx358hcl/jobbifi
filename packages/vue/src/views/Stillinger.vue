<template>
	<main class="homepage px-3">
		<div style="margin-bottom: 100px; margin-top:90px;" class="container stillingsContainer">
			<!-- Hele siden befinner seg på denne rowen -->
			<div v-if="settings.entireResponse && settings.entireResponse.info.antall['deltid']" class="row">
					<!--Filtersiden-->
					<div class="filtersiden col-3 p-0">
						<!--Filter tittelen -->
						<h4 class="card-title filterTittel pt-4 pb-2 mb-0">
							Filtrer:
						</h4>

						<!--Ekstrainfo -->
						<div class="ekstraInfo">
							<p class="card-title filtertypeTittel mb-2 mt-3">Ekstra</p>
							<ul class="list-group list-group-flush">
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" id="ingenUtløpte" name="ingenUtløpte" :checked="settings.ingenUtløpte" type="checkbox" @click="ingenUtløpte($event.target.checked);" />
									<label class="gjørTilClickable pl-2 mb-1" for="ingenUtløpte">
										Inkluder utløpte stillinger
										<span class="filterAntall"></span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" id="rare" name="rare" :checked="settings.rare" type="checkbox" @click="rarifiser($event.target.checked);" />
									<label class="gjørTilClickable pl-2 mb-1" for="rare">
										Vis stillinger uten frist
										<span class="filterAntall"></span>
									</label>
								</li>
							</ul>
						</div>

						<!--Fra Kilde -->
						<div class="kilde">
							<p class="card-title filtertypeTittel mb-2 mt-3">Vis fra:</p>
							<ul class="list-group list-group-flush">
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.source.includes('ifijobs')" @click="changeSource(['source', 'ifijobs', $event.target.checked])" type="checkbox" id="ifinavet" />
									<label class="gjørTilClickable pl-2 mb-1" for="ifinavet">
										ifinavet.no
										<span class="filterAntall"></span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.source.includes('arbeidsplassen')" @click="changeSource(['source', 'arbeidsplassen', $event.target.checked])" type="checkbox" id="nav" />
									<label class="gjørTilClickable pl-2 mb-1" for="nav">
										nav.no
										<span class="filterAntall"></span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.source.includes('finn')" @click="changeSource(['source', 'finn', $event.target.checked])" type="checkbox" id="finn" />
									<label class="gjørTilClickable pl-2 mb-1" for="finn">
										finn.no
										<span class="filterAntall"></span>
									</label>
								</li>
							</ul>
						</div>

						<!--Jobbtype -->
						<div class="jobbtype">
							<p class="card-title filtertypeTittel mb-2 mt-3">Fulltid/deltid</p>
							<ul class="list-group list-group-flush">
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.type.includes('deltid')" @click="changeType(['type', 'deltid', $event.target.checked])" type="checkbox" id="deltid" />
									<label class="gjørTilClickable pl-2 mb-1" for="deltid">
										Deltid
										<span class="filterAntall">({{ settings.entireResponse.info.antall["deltid"] }})</span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.type.includes('annet')" @click="changeType(['type', 'annet', $event.target.checked])" type="checkbox" id="annet" />
									<label class="gjørTilClickable pl-2 mb-1" for="annet">
										Annet
										<span class="filterAntall">({{ settings.entireResponse.info.antall["annet"] }})</span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input class="gjørTilClickable" v-bind:checked="settings.type.includes('fulltid')" @click="changeType(['type', 'fulltid', $event.target.checked])" type="checkbox" id="fulltid" />
									<label class="gjørTilClickable pl-2 mb-1" for="fulltid">
										Fulltid
										<span :class="filterAntall">({{ settings.entireResponse.info.antall["fulltid"] }})</span>
									</label>
								</li>
							</ul>
						</div>

						<!--Søknadsfrist -->
						<div class="søknadsfrist">
							<p class="card-title filtertypeTittel mb-2 mt-3">
								Søknadsfrist:
							</p>
							<ul class="list-group list-group-flush">
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="utløpte" class="gjørTilClickable" v-on:click="changeFrist(['frist', '-1', $event.currentTarget.checked])" type="radio" name="frister" :checked="settings.frist == '-1'"/>
									<label for="utløpte" class="pl-2 mb-1 gjørTilClickable">
										Vis bare utløpte stillinger
										<span class="filterAntall"></span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="frist0" class="gjørTilClickable" v-on:click="changeFrist(['frist', '0', $event.currentTarget.checked])" type="radio" name="frister" :checked="settings.frist == '0'" />
									<label for="frist0" class="pl-2 mb-1 gjørTilClickable">
										Utløper i dag
										<span class="filterAntall"></span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="frist7" class="gjørTilClickable" v-on:click=" changeFrist(['frist', '7', $event.currentTarget.checked])" type="radio" name="frister" :checked="settings.frist == '7'" />
									<label for="frist7" class="pl-2 mb-1 gjørTilClickable">
										Under en uke
										<span class="filterAntall">({{ settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist ? settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist["7"] : null }})</span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="frist30" class="gjørTilClickable" v-on:click=" changeFrist(['frist', '30', $event.currentTarget.checked]) " type="radio" name="frister" :checked="settings.frist == '30'" />
									<label for="frist30" class="pl-2 mb-1 gjørTilClickable">
										Under 1 måned
										<span class="filterAntall">
											({{
												settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist
												? settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist["30"]
												: 0
											}})
										</span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="frist90" class="gjørTilClickable" v-on:click=" changeFrist(['frist', '90', $event.currentTarget.checked])" type="radio" name="frister" :checked="settings.frist == '90'"/>
									<label for="frist90" class="pl-2 mb-1 gjørTilClickable">
										Under 3 måneder
										<span class="filterAntall">
											({{
												settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist
												? settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist["90"]
												: 0
											}})
										</span>
									</label>
								</li>
								<li class="list-group-item border-0 filter p-0 ml-1">
									<input id="frist9000" class="gjørTilClickable" v-on:click=" changeFrist(['frist', '9000', $event.currentTarget.checked])" type="radio" name="frister" :checked="settings.frist == '9000'" />
									<label for="frist9000" class="pl-2 mb-1 gjørTilClickable">
										Under 12 måneder
										<span class="filterAntall">
											({{
												settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist
												? settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerFrist["9000"]
												: 0
											}})
										</span>
									</label>
								</li>
							</ul>
						</div>

						<!--Ferdigheterfilter -->
						<div class="ferdigheter">
							<p class="card-title filtertypeTittel mb-2 mt-3">Ferdigheter</p>
							<ul class="list-group list-group-flush">
								<li v-for="teknologi in settings.entireResponse.info.alleTeknologierInfo.unikeTeknologier.sort((a, b) => settings.tekno.includes(b) - settings.tekno.includes(a))" v-bind:key="teknologi" class=" d-flex align-items-center list-group-item border-0 filter p-0 ml-1">
									<input class = "gjørTilClickable" @click=" changeTekno(['skill', teknologi, $event.target.checked])" v-bind:name="teknologi" type="checkbox" v-bind:id="teknologi" v-bind:checked="settings.tekno.includes(teknologi)" v-bind:value="settings.tekno.includes(teknologi)"/>
									<label class="pl-2 mb-1 gjørTilClickable" v-bind:for="teknologi">
										{{ teknologi }}
											<span class="filterAntall gjørTilClickable">
												({{
													settings.entireResponse.info.alleTeknologierInfo.antallStillingerPerTeknologi[teknologi]
												}})
											</span>
									</label>
								</li>
							</ul>
						</div>
					</div>

					<!-- Infoseksjon for søk -->
					<div class="col-9 mt-2">
						<div class="container mt-4 p-0">

							<!--Første boks ovenfor stillingercontainer -->
							<div class="card">
								<div class="card-body py-0 pr-0 pl-0">
									<div class = "container">
										<div class = "row flex-nowrap">

											<!--Infobit av søkeseksjon -->
											<div class="col-8 d-flex align-items-center">
												<p>Fant {{ settings.entireResponse.totalt }} stillinger av {{ hovedData.jobs.length }} totalt </p>
											</div>

											<!--Knappene i søkeseksjonen-->
											<div class="col-4 d-flex align-items-start pr-0 justify-content-end">
												<div style="" class="btn-group w-100 d-flex align-items-center pr-1">
													<button class="border-0 søkeInnstillinger rounded p-3 dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
															Vis {{ settings.limit }}
													</button>
													<div class="dropdown-menu w-100">
														<ul class="pl-4 ml-2 my-auto">
															<li>
																<input @click="limit(['limit', 20, $event.currentTarget.checked ])" class="form-check-input gjørTilClickable" type="radio" name="limit20" id="limit20" value="limit20" :checked="settings.limit == 20" />
																<label class="form-check-label gjørTilClickable" for="limit20">
																	20 per side
																</label>
															</li>
															<li>
																<input @click="limit(['limit', 50, $event.currentTarget.checked ])" class="form-check-input gjørTilClickable" type="radio" name="limit50" id="limit50" value="limit50" v-bind:checked="settings.limit == 50" />
																<label class="form-check-label gjørTilClickable" for="limit50">
																	50 per side
																</label>
															</li>
															<li>
																<input @click="limit(['limit', 100, $event.currentTarget.checked ])" class="form-check-input gjørTilClickable" type="radio" name="limit100" id="limit100" value="limit100" :checked="settings.limit == 100" />
																<label class="form-check-label gjørTilClickable" for="limit100">
																	100 per side
																</label>
															</li>
															<li>
																<input @click="limit(['limit', 200, $event.currentTarget.checked ])" class="form-check-input gjørTilClickable" type="radio" name="limit200" id="limit200" value="limit200" :checked="settings.limit == 200" />
																<label class="form-check-label gjørTilClickable" for="limit200">
																	200 per side
																</label>
															</li>
														</ul>
													</div>
												</div>
												<div style="" class="btn-group w-100 d-flex align-items-center pr-0">
													<button class="border-0 søkeInnstillinger sortør rounded p-3 dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														Viser {{ settings.sort == "down" ? "nyeste" : settings.sort == "up" ? "eldste" : settings.sortFrist == "down" ? "" : "Stillinger med frist om lenge" }}
													</button>
													<div class="dropdown-menu w-100">
														<ul class="pl-4 ml-2 my-auto">
															<!--<li>
																<input @click="sorter(['sortFrist', 'down', $event.currentTarget.checked,])" class="form-check-input gjørTilClickable" type="radio" name="nyesteFristFørst" id="nyesteFristFørst" value="nyesteFristFørst" :checked="settings.sortFrist == 'down'" />
																<label class="form-check-label gjørTilClickable" for="nyesteFristFørst">
																	Søknadsfrist <i class="fas fa-sort-numeric-up"></i>
																</label>
															</li>
															<li>
																<input @click="sorter(['sortFrist','up',$event.currentTarget.checked,])" class="form-check-input gjørTilClickable" type="radio" name="eldsteFristFørst" id="eldsteFristFørst" value="eldsteFristFørst" :checked="settings.sortFrist == 'up'"/>
																<label class="form-check-label gjørTilClickable" for="eldsteFristFørst">
																	Søknadsfrist <i class="fas fa-sort-numeric-down"></i>
																</label>
															</li>-->
															<li>
																<input @click="sorter(['sortDate','down',$event.currentTarget.checked,])" class="form-check-input gjørTilClickable" type="radio" name="nyesteDatoFørst" id="nyesteDatoFørst" value="nyesteDatoFørst" :checked="settings.sort == 'down'" />
																<label class="form-check-label gjørTilClickable" for="nyesteDatoFørst">
																	Nyeste først
																</label>
															</li>
															<li>
																<input @click="sorter(['sortDate','up',$event.currentTarget.checked,])" class="form-check-input gjørTilClickable" type="radio" name="eldsteDatoFørst" id="eldsteDatoFørst" value="eldsteDatoFørst" :checked="settings.sort == 'up'" />
																<label class="form-check-label gjørTilClickable" for="eldsteDatoFørst">
																	Eldste først
																</label>
															</li>
														</ul>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<!--Andre boks, søkeboksen -->
							<div class="card my-2 søkeCard">
								<div class="card-body p-0">

									<!--Søkeknapp i søkeseksjon -->
									<form v-on:submit.prevent="changeSettings()">
										<div class = "container">
											<div class = "row flex-nowrap">
												<input class="form-control col-8 search pl-4" style="font-family: FontAwesome" placeholder="Søk f.eks. Python " aria-label="Search" v-bind:value="searchQuery" v-on:input="searchQuery = $event.target.value" />
												<button type="submit" class="col-4 btn btn-white søkeKnapp"><i class="fas fa-search"></i></button>
											</div>
										</div>
									</form>

								</div>
							</div>

							<!--Paginator i søkeseksjon -->
							<paginator :page="settings.page" :totalt="totaltAntallSider" />

							<!--Stillinger containeren -->
							<div class="container my-0 p-2">
								<!-- Loadingspinneren -->
								<div class = "d-flex justify-content-center">
									<spinner class="p-0 m-0" style="width:20px; height:20px;" v-if="settings.loading == true" />
								</div>
								<!-- Stillingscontainer -->
								<div class="row" v-if="settings.loading == false" >
									<h5 class = "m-auto" v-if="settings.data.length == 0">Det finnes ingen stillinger med de søkekriteriene :(</h5>
									<div v-for="job in settings.data" :key="job.id" class="col-sm-6 col-lg-4 p-2">
										<div style="min-height: 480px" class="boksen card">
											<div style="width: 75%; height: 180px" class="d-flex align-items-center card-img my-auto mx-auto">
												<img style="width: 80%; max-height: 180px" class="my-auto mx-auto card-img-top pt-4" :src="job.companyImage" alt="Card image cap" />
											</div>
											<!--Stilling -->
											<div style="min-height: 360px; max-height: 360px" class="card-body enkeltStilling">
												<hr class="mt-0 mb-2 pb-2" />
												<div class = "stillingsTekstStillingsSide" style = "min-height: 230px">
													<div class = "col-12 m-0 p-0">
														<a v-bind:href="`http://localhost:8080/stilling/${job.id}`">
															<h5 class="card-title stillingsTittel font-weight-bold">
																{{ job.title.slice(0, 80) }}
															</h5>
														</a>
													</div>
													<div class="col-12 m-0 p-0 card-text">
														<p>
															{{ 170 > job.teaser.length ? job.teaser.slice(0, 170) + '...' : job.teaser.trim() }}
														</p>
													</div>
												</div>

												<div>
													<div class="col-10 ml-1 pt-2 ok d-flex align-items-center drag">
														<a v-for="(key, val) in job.teknologier" :key="val" class="link">{{ key }}</a>
													</div>
												</div>
												<br>
												
												<div class = "stillingsSøkeKnapp d-flex align-items-center">
													<div class="d-flex justify-content-center mx-auto søkeButton card-1 align-items-center">
														<a v-bind:href="job.url" class="søkeStillingKnapp text-center">
															SØK
														</a>
													</div>
													<div class="d-flex align-items-center justify-content-end">
														<div class="dropdown more">
															<button class="more btn btn-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fas fa-ellipsis-h"></i>
															</button>
															<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
																<a class="dropdown-item d-flex justify-content-between align-items-center" href="#">Lagre <i class="fas fa-heart float-right"></i></a>
																<a class="dropdown-item d-flex justify-content-between align-items-center" href="#">Del <i class="fas fa-share-alt float-right"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
					</div>
				</div>

			</div>
		</div>
	</main>
</template>

<script>
	import { ref, reactive } from "vue";
	import spinner from "../components/spinner.vue";
	import paginator from "../components/paginator.vue";
	import { settings } from "../settings.js";
	import * as firebase from "firebase/app";
	import "firebase/auth";
	import router from '../router/index.js';

	var axios = require("axios");
	var entireResponse = ref("");
	var antall = ref({});
	var hovedData = require("../../../api/data/data.json");
	var alleTeknologierInfo = ref({});
	var searchQuery = ref("");
	searchQuery.value = settings.value.search.split("+").join(" ");
	function axiosMe() {
		settings.value.loading = true;
		console.log(settings);
		console.log(`http://localhost:3000/api/jobs?source=${settings.value.source.join("+")}&${settings.value.sort ? 'sortDate' : 'sortFrist'}=${settings.value.sort ? settings.value.sort : settings.value.sortFrist}&type=${settings.value.type.join("+")}&search=${settings.value.search}&frist=${settings.value.frist}+${settings.value.ingenUtløpte}&tekno=${settings.value.tekno.join("+")}&page=${settings.value.page}&limit=${settings.value.limit}&rare=${settings.value.rare}`);
		axios.get(`http://localhost:3000/api/jobs?source=${settings.value.source.join("+")}&${settings.value.sort ? 'sortDate' : 'sortFrist'}=${settings.value.sort ? settings.value.sort : settings.value.sortFrist}&type=${settings.value.type.join("+")}&search=${settings.value.search}&frist=${settings.value.frist}+${settings.value.ingenUtløpte}&tekno=${settings.value.tekno.join("+")}&page=${settings.value.page}&limit=${settings.value.limit}&rare=${settings.value.rare}`)
			.then(function(response) {
				console.log("da ble loading endret");
				settings.value.data = response.data.data;
				entireResponse.value = response.data;
				settings.value.entireResponse = response.data;
				alleTeknologierInfo.value = response.data.info.alleTeknologierInfo;
				settings.value.entireResponse.info.antall = response.data.info.antall;
				console.log(entireResponse.value);
				console.log(router.currentRoute);							

				if (window.location.pathname != "/stillinger") {
					router.push("/stillinger")					
				} 
				else {
					settings.value.loading = false;
				}
			})
			.catch(function(error) {
				return error;
			});
	}
	//Søkefunksjon
	function changeSettings(e) {
		console.log(searchQuery);
		var søk = searchQuery.value.split(" ").filter(e => e).map(e => e.trim()).join("+");
		console.log(søk);
		settings.value.search = søk;
		settings.value.page = 1;
		axiosMe();
	}
	export default {
		setup() {
		console.log(router);
		console.log(settings.entireResponse);
			settings.value.loading = false;
			
			//Noen variabler og innholdstrackere
			//Sortering
			function sorter(message) {
				var [type, query, state] = message;
				console.log(message);
				if(type == "sortDate"){
					settings.value.sort = query;
					settings.value.page = 1;
					settings.value.sortFrist = "";
					axiosMe();
				}
				else{
					settings.value.sortFrist = query;
					settings.value.page = 1;
					settings.value.sort = "";
					axiosMe();
				}
			}
			//Stilling
			function changeType(message) {
				var [type, query, state] = message;
				if (state == true) settings.value.type.push(query);
				else settings.value.type.splice(settings.value.type.indexOf(query), 1);
				settings.value.page = 1;
				axiosMe();
			}
			
			//Frist
			function changeFrist(message) {
				var [type, query, state] = message;
				settings.value.frist = query;
				settings.value.page = 1;
				axiosMe();
			}
			//Tekno
			function changeTekno(message) {
				var [type, query, state] = message;
				if (state) settings.value.tekno.push(query);
				else settings.value.tekno.splice(settings.value.tekno.indexOf(query), 1);
				settings.value.page = 1;
				axiosMe();
			}
			//Tekno
			function changeSource(message) {
				var [type, query, state] = message;
				console.log(message);
				if (state) settings.value.source.push(query);
				else settings.value.source.splice(settings.value.source.indexOf(query), 1);
				settings.value.page = 1;
				axiosMe();
			}
			//Pagination funksjon
			function paginate(e) {
				settings.value.page = e.target.textContent;
				settings.value.data = "";
				axiosMe();
			}
			//Rarifiser
			function rarifiser(e){
				console.log(e);
				settings.value.rare = e;
				settings.value.page = 1;
				axiosMe();
			}
			//Ingen utløpte
			function ingenUtløpte(e){
				settings.value.ingenUtløpte = e;
				settings.value.page = 1;
				axiosMe();
			}
			//Limit funksjon
			function limit(e) {
				settings.value.limit = e[1];
				console.log(e[1]);
				console.log(settings.value.limit);
				settings.value.page = 1;
				axiosMe();
			}
			//Ved component-loading, call API-en og finnantall stillinger etc.
			// API-call basert på settings
			if (settings.value.entireResponse == "") {
				console.log("det er ingenting inni data");
				axiosMe();
			}
			return {
				axiosMe,
				settings,
				changeType,
				antall,
				sorter,
				alleTeknologierInfo,
				changeTekno,
				changeFrist,
				hovedData,
				spinner,
				paginate,
				changeSettings,
				entireResponse,
				limit,
				paginator,
				searchQuery,
				rarifiser,
				ingenUtløpte,
				changeSource,
			};
		},
		computed: {
			totaltAntallSider() {
				console.log(settings.value.entireResponse.totalt)
				console.log(parseInt(settings.value.limit));
				return Math.ceil(parseInt(settings.value.entireResponse.totalt) / parseInt(settings.value.limit));
			}
		}
	};
	export {
		axiosMe,
		entireResponse,
		changeSettings,
		searchQuery
	};
</script>