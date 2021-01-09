<template>
	<main tyle="overflow-y: scroll;" class="container-fluid m-0 p-0 pt-2">
		<div style="max-width: 1400px; margin-bottom: 100px" class="container">
			<div class="row">
				<div class="col-3 pr-0">
					<h4
						style="
							font-family: 'Goudy Bookletter 1911', serif;
							font-size: 30px;
							font-weight: 900;
							letter-spacing: 2px;
						"
						class="card-title filterTittel pt-4 pb-2 mb-0"
					>
						Filtrer:
					</h4>
					<div class="jobbtype">
						<p class="card-title filtertypeTittel mb-2 mt-3">Fulltid/deltid</p>
						<ul class="list-group list-group-flush">
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									class="gjørTilClickable"
									v-bind:checked="settings.type.includes('deltid')"
									@click="changeType(['type', 'deltid', $event.target.checked])"
									type="checkbox"
									id="deltid"
								/>
								<label class="gjørTilClickable pl-2 mb-1" for="deltid"
									>Deltid
									<span class="filterAntall"
										>({{ antall["deltid"] }})</span
									></label
								>
							</li>
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									class="gjørTilClickable"
									v-bind:checked="settings.type.includes('annet')"
									@click="changeType(['type', 'annet', $event.target.checked])"
									type="checkbox"
									id="annet"
								/>
								<label class="gjørTilClickable pl-2 mb-1" for="annet"
									>Annet
									<span class="filterAntall"
										>({{ antall["annet"] }})</span
									></label
								>
							</li>
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									class="gjørTilClickable"
									v-bind:checked="settings.type.includes('fulltid')"
									@click="
										changeType(['type', 'fulltid', $event.target.checked])
									"
									type="checkbox"
									id="fulltid"
								/>
								<label class="gjørTilClickable pl-2 mb-1" for="fulltid"
									>Fulltid
									<span class="filterAntall"
										>({{ antall["fulltid"] }})</span
									></label
								>
							</li>
						</ul>
					</div>
					<div class="søknadsfrist">
						<p class="card-title filtertypeTittel mb-2 mt-3">Søknadsfrist</p>
						<ul class="list-group list-group-flush">
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									id="frist1"
									class="gjørTilClickable"
									v-on:click="
										changeFrist(['frist', '7', $event.currentTarget.checked])
									"
									type="radio"
									name="frist"
								/>
								<label for="frist1" class="pl-2 mb-1 gjørTilClickable"
									>Under en uke
									<span class="filterAntall"
										>({{
											alleTeknologierInfo.antallStillingerPerFrist
												? alleTeknologierInfo.antallStillingerPerFrist["7"]
												: null
										}})</span
									></label
								>
							</li>
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									id="frist3"
									class="gjørTilClickable"
									v-on:click="
										changeFrist(['frist', '30', $event.currentTarget.checked])
									"
									type="radio"
									name="frist"
								/>
								<label for="frist3" class="pl-2 mb-1 gjørTilClickable"
									>Under 1 måned
									<span class="filterAntall"
										>({{
											alleTeknologierInfo.antallStillingerPerFrist
												? alleTeknologierInfo.antallStillingerPerFrist["30"]
												: null
										}})</span
									></label
								>
							</li>
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									id="frist7"
									class="gjørTilClickable"
									v-on:click="
										changeFrist(['frist', '90', $event.currentTarget.checked])
									"
									type="radio"
									name="frist"
								/>
								<label for="frist7" class="pl-2 mb-1 gjørTilClickable"
									>Under 3 måneder
									<span class="filterAntall"
										>({{
											alleTeknologierInfo.antallStillingerPerFrist
												? alleTeknologierInfo.antallStillingerPerFrist["90"]
												: null
										}})</span
									></label
								>
							</li>
							<li class="list-group-item border-0 filter p-0 ml-1">
								<input
									id="fristIngen"
									class="gjørTilClickable"
									v-on:click="
										changeFrist(['frist', '9000', $event.currentTarget.checked])
									"
									type="radio"
									name="frist"
									checked
								/>
								<label for="fristIngen" class="pl-2 mb-1 gjørTilClickable"
									>Under 12 måneder
									<span class="filterAntall"
										>({{
											alleTeknologierInfo.antallStillingerPerFrist
												? alleTeknologierInfo.antallStillingerPerFrist["9000"]
												: null
										}})</span
									></label
								>
							</li>
						</ul>
					</div>
					<div class="ferdigheter">
						<p class="card-title filtertypeTittel mb-2 mt-3">Ferdigheter</p>
						<ul class="list-group list-group-flush">
							<li
								v-for="teknologi in alleTeknologierInfo.unikeTeknologier"
								v-bind:key="teknologi"
								class="list-group-item border-0 filter p-0 ml-1"
							>
								<input
									@click="
										changeTekno(['skill', teknologi, $event.target.checked])
									"
									v-bind:name="teknologi"
									type="checkbox"
									v-bind:id="teknologi"
								/>
								<label class="pl-2 mb-1 gjørTilClickable" v-bind:for="teknologi"
									>{{ teknologi[0].toUpperCase() + teknologi.slice(1)
									}}<span class="filterAntall gjørTilClickable">
										({{
											alleTeknologierInfo.antallStillingerPerTeknologi[
												teknologi
											]
										}})</span
									></label
								>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-9">
					<div class="container mt-4 p-0">
						<div class="card">
							<div class="card-body py-0 pr-2">
								<div class="row">
									<div class="col-8">
										<p class="font-weight-bold mb-0 mt-2">
											Fant {{ entireResponse.totalt }} resultater
										</p>
										<li class="list-group-item border-0 filter p-0 ml-1">
											<input class="gjørTilClickable" type="checkbox" id="" />
											<label class="gjørTilClickable pl-2 mb-1" for="deltid"
												>Ikke vis stillinger uten spesifisert frist
												<span class="filterAntall"></span
											></label>
										</li>
										<p class="mt-2 mb-2">
											Du søkte etter:
											<span class="font-italic font-weight-bold">{{
												settings.search.length > 0 ? settings.search : ""
											}}</span>
										</p>
									</div>
									<div
										class="col-4 d-flex align-items-center pr-0 justify-content-end"
									>
										<div
											style=""
											class="btn-group w-100 d-flex align-items-center pr-3 justify-content-end"
										>
											<button
												
												style="
													min-width: 150px;
													border: 1px solid #dfdfdf !important;
												"
												class="border-0 bg-light rounded p-3 dropdown-toggle"
												type="button"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												Vis {{ settings.limit }} per side
											</button>
											<div style="max-width: 100px" class="dropdown-menu w-100">
												<ul class="pl-4 ml-2 my-auto">
													<li>
														<input
															@click="
																limit([
																	'limit',
																	'20',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="limit20"
															value="limit20"
															:checked="settings.limit == '20'"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="limit20"
															
														>
															20 per side
														</label>
													</li>
													<li>
														<input
															@click="
																limit([
																	'limit',
																	'50',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="limit50"
															value="limit50"
															:checked="settings.limit === '50'"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="limit50"
														>
															50 per side
														</label>
													</li>
													<li>
														<input
															@click="limit(['limit','100', $event.currentTarget.checked ])"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="limit100"
															id="limit100"
															:checked="settings.limit == 100"
														/>
														<label 
															class="form-check-label gjørTilClickable" 
															for="limit100" >
															100 per side
														</label>
													</li>
													<li>
														<input
															@click="
																limit([
																	'limit',
																	'200',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="limit200"
															value="limit200"
															:checked="settings.limit === '200'"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="limit200"
														>
															200 per side
														</label>
													</li>
												</ul>
											</div>
										</div>
										<div
											style=""
											class="btn-group w-100 d-flex align-items-center pr-3 justify-content-end"
										>
											<button
												style=
												"
													min-width: 150px;
													border: 1px solid #dfdfdf !important;
												"
												class="border-0 bg-light rounded p-3 dropdown-toggle"
												type="button"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												Sortering
											</button>
											<div style="max-width: 100px" class="dropdown-menu w-100">
												<ul class="pl-4 ml-2 my-auto">
													<li>
														<input
															@click="
																sorter([
																	'sort',
																	'down',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="nyesteFørst"
															value="nyesteFørst"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="nyesteFørst"
														>
															Nyeste frist først
														</label>
													</li>
													<li>
														<input
															@click="
																sorter([
																	'sort',
																	'up',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="eldsteFørst"
															value="eldsteFørst"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="eldsteFørst"
														>
															Eldste frist først
														</label>
													</li>
													<li>
														<input
															@click="
																sorter([
																	'sort',
																	'up',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="eldsteFørst"
															value="eldsteFørst"
															:checked="settings.sort == 'up'"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="eldsteFørst"
														>
															Nylig lagt til
														</label>
													</li>
													<li>
														<input
															@click="
																sorter([
																	'sort',
																	'down',
																	$event.currentTarget.checked,
																])
															"
															class="form-check-input gjørTilClickable"
															type="radio"
															name="sorteringAvStillinger"
															id="eldsteFørst"
															value="eldsteFørst"
															:checked="settings.sort == 'down'"
														/>
														<label
															class="form-check-label gjørTilClickable"
															for="eldsteFørst"
														>
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

						<form
							v-on:submit.prevent="changeSettings()"
							class="py-5 form-inline my-2 my-lg-0"
						>
							<input
								class="form-control mr-sm-2 search"
								style="font-family: FontAwesome"
								placeholder="&#xF002; Søk"
								aria-label="Search"
								v-bind:value="searchQuery"
								v-on:input="searchQuery = $event.target.value"
							/>
							<button
								type="submit"
								class="btn btn-primary mb-2"
							>
								Søk
							</button>
						</form>
						  <paginator
	:page="settings.page"
	:totalt="totaltAntallSider"
  />

						<!-- <nav
							class="w-100 d-flex justify-content-center align-items-center mt-3"
							aria-label="Page navigation example"
						>
							<ul class="pagination m-0 p-0">
								<li class="page-item">
									<a class="page-link" href="#" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
									</a>
								</li>
								<li
									
									v-on:click="paginate($event)"
									v-bind:class="['page-item', { active: settings.page == n }]"
                  					v-bind:key="n"
								>
									<a class="page-link gjørTilClickable">
										{{ n }}
									</a>
								</li>

								<li class="page-item">
									<a class="page-link" href="#" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
									</a>
								</li>
							</ul>
						</nav> -->
					</div>
					<div class="container my-0 p-2 d-flex justify-content-start">
						<div class="row">
							<spinner v-if="settings.loading === true" />
							<h1 v-if="settings.data.length == 0">Ingen stillinger kunnet finnes med de søkekriteriene</h1>
							<div
								v-for="job in settings.data"
								:key="job.id"
								class="col-sm-6 col-lg-4 p-2"
							>
								<div style="min-height: 480px" class="boksen card">
									<div
										style="width: 75%; height: 180px"
										class="d-flex align-items-center card-img my-auto mx-auto"
									>
										<img
											style="width: 100%; max-height: 180px"
											class="my-auto mx-auto card-img-top pt-4"
											:src="job.companyImage"
											alt="Card image cap"
										/>
									</div>
									<div
										style="min-height: 360px; max-height: 360px"
										class="card-body"
									>
										<hr class="mt-0" />
										<div class="stilling">
											<a
												v-bind:href="`http://localhost:8080/stilling/${job.id}`"
											>
												<h5 class="card-title font-weight-bold">
													{{ job.title }}
												</h5>
											</a>
											<div
												style="min-height: 170px; max-height: 150px"
												class="card-text"
											>{{ 170 > job.teaser.length
														? job.teaser.slice(0, 170) + '...' 
														: job.teaser }} </div>
											<div class="ok d-flex align-items-center">
												<a
													v-for="(key, val) in job.teknologier"
													:key="val"
													class="link"
													>{{ key }}</a
												>
											</div>
										</div>
										<div
											style="position: absolute; bottom: 8px"
											class="px-2 d-flex justify-content-center align-items-center"
										>
											<span class="frist text-danger pr-2"
												>Søkefrist: {{ job.frist }}</span
											>
											<div
												class="søkeButton card-1 d-flex justify-content-center align-items-center ml-3"
											>
												<a
													style="
														height: 35px;
														width: 100px;
														line-height: 21px;
														color: #333;
														margin-top: 12px;
													"
													v-bind:href="job.url"
													class="text-center"
													>SØK</a
												>
											</div>
											<div class="more">
												<a class="more" href="#">
													<i class="fas fa-ellipsis-h"></i>
												</a>
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

var axios = require("axios");
var entireResponse = ref("");
var antall = ref({});
var hovedData = require("../../../api/data/data.json");
var alleTeknologierInfo = ref({});
var searchQuery = ref("");
searchQuery.value = settings.value.search.split("+").join(" ");

function axiosMe() {
		settings.value.loading = true;
		axios
			.get(
				`http://localhost:3000/api/jobs?sortDate=${
					settings.value.sort
				}&type=${settings.value.type.join("+")}&search=${
					settings.value.search
				}&frist=${settings.value.frist}&tekno=${settings.value.tekno.join(
					"+"
				)}&page=${settings.value.page}&limit=${settings.value.limit}`
			)
			.then(function (response) {
				settings.value.loading = false;
				settings.value.data = response.data.data;
				entireResponse.value = response.data;
				settings.value.entireResponse = response.data;
				alleTeknologierInfo.value = response.data.info.alleTeknologierInfo;
				antall.value = response.data.info.antall;
				console.log(entireResponse.value);
			})
			.catch(function (error) {
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
		//Noen variabler og innholdstrackere
		//Sortering
		function sorter(message) {
			var [type, query, state] = message;
			settings.value.sort = query;
			settings.value.page = 1;
			axiosMe();
		}

		//Stilling
		function changeType(message) {
			var [type, query, state] = message;
			if (state) settings.value.type.push(query);
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

		//Pagination funksjon
		function paginate(e) {
			settings.value.page = e.target.textContent;
			settings.value.data = "";
			axiosMe();
		}

		//Limit funksjon
		function limit(e) {
			settings.value.limit = e[1];
			axiosMe();
		}

		//Ved component-loading, call API-en og finnantall stillinger etc.
		//API-call basert på settings
		// if (settings.value.data == "") {
		// 	console.log("det er ingenting inni data");
		// 	axiosMe();
		// }

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
		};
	},
	computed:{
		totaltAntallSider(){
			console.log(settings.value.entireResponse.totalt) 
			console.log(parseInt(settings.value.limit));
			return Math.ceil(parseInt(settings.value.entireResponse.totalt) / parseInt(settings.value.limit));
		}
	}
};
export { axiosMe, entireResponse, changeSettings, searchQuery };
</script>
