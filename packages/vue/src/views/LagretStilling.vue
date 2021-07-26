  <main class="container center d-flex align-items-center p-0">
    <div class="row beholder center pt-0">
      <div class="container mt-4 mb-5 px-0">
        <div class = "row">
          <div class = "col-12 mb-3 mx-0 px-0 d-flex justify-content-start align-items-center">
            <button style = "color: #2b2fc5; font-weight: 900;" @click = "back" type="button" class="btn btn-link">
              <i class="fas fa-angle-left"></i> Tilbake
            </button>          
          </div>
        
        </div>
        <div class="row" style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
          <div class="col-12" style="padding: 0px;border-top-left-radius: 20px;border-top-right-radius: 20px;">
            <div class = "d-flex justify-content-center" v-bind:style="{ backgroundImage: 'url(' + stilling2.companyImage + ')' }" style="background-color: transparent; background-size: contain; background-position:center; background-repeat: no-repeat; height: 250px;border-top-left-radius: 20px;border-top-right-radius: 20px;">
              <img style = "background-color:#f8f9fa;" width = "90" height = "90" class = "stillingsLogo" :src = "bilde">
            </div>
          </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
          <div class="col-12 pt-4 px-0">
            <div class = "row mt-4">
              <div class = "col-6 d-flex align-items-center">
                <h4 class="d-inline-block" style="font-family: 'Lato', sans-serif;font-weight: bold;margin: 0px;">{{ stilling2.title }}</h4>
              </div>
              <div class = "col-6">
                <more :stilling = "stilling2"></more>
              </div>
            </div>
            <div class="row justify-content-md-end align-items-md-center justify-content-xl-start">
              <div class="col-12" style="margin-top: 0px;margin-bottom: 0px;">
                <div class = "row">

                  <div class="col-7 py-2 ml-3 pl-0 mt-2 d-flex align-items-center">
                    <p class = "mt-0 py-0 d-inline-block" style="font-weight: bold;font-family: 'Lato', sans-serif; color: #2b2fc5; margin-top: 0px;margin-bottom: 0px;padding-top: 0px;padding-bottom: 0px;padding-right: 10px;">{{ stilling2.companyName }}</p>
                    <p class = "font-weight-bold d-inline-block text-left p-0" style="margin-bottom: 0px;padding: 0px; color: rgb(139,139,139); font-family: 'Lato', sans-serif;padding-left: 10px;">-&nbsp;&nbsp;{{ stilling2.sted }}</p>
                  </div>
                <div class="col-5 d-flex justify-content-end">

                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col" style="padding: 0px;">
            <div class="list-group list-group-horizontal">
              <a class="col-4 border-0 list-group-item list-group-item-action noHover pr-0 pl-0">
                <p style="color: #313437;margin-bottom: 6px;font-weight: bold;">Frist
                </p>
                  <span style="color: var(--gray-dark);">{{ timeAgo.format(new Date(parseInt(stilling2.americanDate))) }}
                  </span>
              </a>
              <a class="col-4 border-0 list-group-item list-group-item-action noHover pr-0 pl-0">
                <p style="color: #313437;font-weight: bold;margin-bottom: 6px;">Type stilling</p><span>Fulltid</span>
              </a>
              <a class="col-4 border-0 list-group-item list-group-item-action noHover pl-0">
                <p class="d-block" style="color: var(--gray-dark);font-weight: bold; margin-bottom: 6px;">Opprinnelse</p>
                <p style = "text-transform: capitalize;" >{{ stilling2.opprinnelse }} </p>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div style = "font-size: 14px !important; word-wrap: break-word; white-space: pre-wrap; word-break: break-word;" class="col mt-4 px-0 d-flex align-items-start flex-column justify-content-start text-left" v-html="stilling2.about ? stilling2.about : stilling2.teaser">
          </div>
        </div>
      </div>
    </div>
    <spinner v-else></spinner>
  </main>