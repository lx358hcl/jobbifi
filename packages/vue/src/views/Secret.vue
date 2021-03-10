<template>
  <div class="homepage d-flex align-items-center justify-content-center">
    <div class="my-5 container mx-5">
      <div class="row">
        <div class="col-lg-4 col-xl-4">
          <div class="card-box text-center">
            <img src="../../public/p.jpg" class="profile-image gjørTilClickable rounded-circle avatar-xl img-thumbnail mt-1" alt="profile-image">
            <h4 class="mb-0 mt-3 pt-1">{{ brukernavn }}</h4>
            <p class="mt-2 pt-1 pb-1 text-muted">Bioingeniør | Prosa-student</p>
            <button type="button" class="btn btn-success btn-xs waves-effect mb-2 waves-light mr-1">Følg</button>
            <button type="button" class="btn btn-danger btn-xs waves-effect mb-2 waves-light ml-1">Send melding</button>
            <div class="text-left mt-3">
              <h4 class="font-13 text-uppercase ommeg">Om meg</h4>
              <p class="text-muted font-13 mb-3">
                Hei, de kaller med udyret, men på ifi går jeg under navnet Luka. Jeg er sjeldent i gangene, men hvis du ser meg så har jeg nok på en svart bukse, et par vans sko og en classic-genser.
              </p>
              <p class="text-muted mb-2 font-13"><strong>Fullt navn: </strong> <span class="ml-0">{{  }}</span></p>
              <p class="text-muted mb-2 font-13"><strong>Mobilnummer: </strong><span class="ml-0"></span></p>
              <p class="text-muted mb-2 font-13"><strong>Email: </strong> <span class="ml-0 ">{{ email }}</span></p>
              <p class="text-muted mb-1 font-13"><strong>Location: </strong> <span class="ml-0">{{  }}</span></p>
            </div>
            <ul class="social-list list-inline mt-3 mb-0">
              <li class="list-inline-item m-1">
                <a href="javascript: void(0);" class="social-list-item border-purple text-purple"><i class="fab fa-facebook"></i></a>
              </li>
              <li class="list-inline-item m-1">
                <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="fab fa-google"></i></a>
              </li>
              <li class="list-inline-item m-1">
                <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="fab fa-twitter"></i></a>
              </li>
              <li class="list-inline-item m-1">
                <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="fab fa-github"></i></a>
              </li>
            </ul>
          </div>
          <!-- end card-box -->
          <div class="card-box">
            <h4 class="header-title">Kontakter </h4>
            <p class = "pb-1 pt-1 mb-1 mt-2">165 kontakter</p>
            <ul class="new_friend_list list-unstyled row p-2">
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Jackson</h6>
                                <small class="join_date">Today</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Aubrey</h6>
                                <small class="join_date">Yesterday</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Oliver</h6>
                                <small class="join_date">08 Nov</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Isabella</h6>
                                <small class="join_date">12 Dec</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Jacob</h6>
                                <small class="join_date">12 Dec</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-thumbnail" alt="User Image">
                                <h6 class="users_name">Matthew</h6>
                                <small class="join_date">17 Dec</small>
                            </a>
                        </li>                            
                    </ul>
          </div>
          <!-- end card-box-->
        </div>
        <!-- end col-->
        <div class="col-lg-8 col-xl-8">
          <div class="card-box">
            <ul class="nav nav-pills navtab-bg mt-1 mb-3">
              <li class="nav-item mx-auto pt-2">
                <b><h4 class="font-13 text-uppercase ommeg">~ Innstillinger ~</h4></b>
              </li>
            </ul>
          <hr>
            <div class="tab-content mt-0 pt-0">
              <!-- end timeline content-->
              <div class="tab-pane active" id="settings">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="firstname">First Name</label>
                        <input type="text" class="form-control" id="firstname" placeholder="Enter first name">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="lastname">Last Name</label>
                        <input type="text" class="form-control" id="lastname" placeholder="Enter last name">
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label class = "mb-2" for="userbio">Om Meg</label>
                        <textarea class="form-control" id="userbio" rows="4" placeholder="Write something..."></textarea>
                      </div>
                    </div>
                    
                    <!-- end col -->
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label class = "mb-2"  for="userbio">Profiltekst</label>
                        <textarea class="form-control" id="userbio" rows="2" placeholder="Write something..."></textarea>
                      </div>
                    </div>
                    
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="useremail">Email Address</label>
                        <input type="email" class="form-control" id="useremail" placeholder="Enter email">
                        <span class="form-text text-muted"><small>If you want to change email please <a href="javascript: void(0);">click</a> here.</small></span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="userpassword">Password</label>
                        <input type="password" class="form-control" id="userpassword" placeholder="Enter password">
                        <span class="form-text text-muted"><small>If you want to change password please <a href="javascript: void(0);">click</a> here.</small></span>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-office-building mr-1"></i> Company Info</h5>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="companyname">Company Name</label>
                        <input type="text" class="form-control" id="companyname" placeholder="Enter company name">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="cwebsite">Website</label>
                        <input type="text" class="form-control" id="cwebsite" placeholder="Enter website url">
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-earth mr-1"></i> Social</h5>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-fb">Facebook</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-facebook-square"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-fb" placeholder="Url">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-tw">Twitter</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-twitter"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-tw" placeholder="Username">
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-insta">Instagram</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-instagram"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-insta" placeholder="Url">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-lin">Linkedin</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-lin" placeholder="Url">
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-sky">Skype</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-skype"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-sky" placeholder="@username">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="social-gh">Github</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-github"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-gh" placeholder="Username">
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="text-right">
                    <button type="submit" class="btn btn-success waves-effect waves-light mt-2"><i class="mdi mdi-content-save"></i> Save</button>
                  </div>
                </form>
              </div>
              <!-- end settings content-->
            </div>
            <!-- end tab-content -->
          </div>
          <!-- end card-box-->
        </div>
        <!-- end col -->
      </div>
    </div>
  </div>
  <!--<div>
        <h3>
          <h5 class="secret" v-for="secret in secrets" :key="secret.char_id">{{secret.name}}</h5>
          <h4>DU ER NÅ LOGGET IN</h4>
          {{ "Brukernavnet ditt er: " + name }} <br> {{ "fornavnet ditt er: " + fornavn }} <br> {{ "Eposten din er: " + email }}<br> {{ "photoUrl ditt er: " + photoUrl }}<br> {{ "emailVerified ditt er: " + emailVerified }}<br> {{ "uid ditt er: " + uid }}<br> {{ "token ditt er: " + token }}<br>
        </h3>
      </div>-->
</template>

<script>
  import { ref } from "vue";
  import firebase from "../main.js";
  import firestore from 'firebase/firestore';
  export default {
    setup() {
      var email = ref("");
      var brukernavn = ref("");
      async function getInfo() {
        var user = await firebase.default.auth().currentUser;
        var db = await firebase.firestore();
        var dbInfo = await db.collection("users").doc(user.uid).get();
        console.log(dbInfo.data());
        if (user != null) {
          email.value = user.email;
          brukernavn.value = user.displayName;
        }
      }
      getInfo();
      return {
        email,
        brukernavn,
      }
    }
  }
</script>

<style>
  .card-box {
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #e7eaed;
    padding: 1.5rem;
    margin-bottom: 24px;
    border-radius: .25rem;
  }
  .avatar-xl {
    height: 6rem;
    width: 6rem;
  }
  .rounded-circle {
    border-radius: 50%!important;
  }
  .nav-pills .nav-link.active,
  .nav-pills .show>.nav-link {
    color: #fff;
    background-color: #1abc9c;
  }
  .nav-pills .nav-link {
    border-radius: .25rem;
  }
  .navtab-bg li>a {
    background-color: #f7f7f7;
    margin: 0 5px;
  }
  .nav-pills>li>a,
  .nav-tabs>li>a {
    color: #6c757d;
    font-weight: 600;
  }
  .mb-4,
  .my-4 {
    margin-bottom: 2.25rem!important;
  }
  .tab-content {
    padding: 20px 0 0 0;
  }
  .progress-sm {
    height: 5px;
  }
  .m-0 {
    margin: 0!important;
  }
  .table .thead-light th {
    color: #6c757d;
    background-color: #f1f5f7;
    border-color: #dee2e6;
  }
  .social-list-item {
    height: 2rem;
    width: 2rem;
    line-height: calc(2rem - 4px);
    display: block;
    border: 2px solid #adb5bd;
    border-radius: 50%;
    color: #adb5bd;
  }
  .text-purple {
    color: #6559cc!important;
  }
  .border-purple {
    border-color: #6559cc!important;
  }
  .timeline {
    margin-bottom: 50px;
    position: relative;
  }
  .timeline:before {
    background-color: #dee2e6;
    bottom: 0;
    content: "";
    left: 50%;
    position: absolute;
    top: 30px;
    width: 2px;
    z-index: 0;
  }
  .timeline .time-show {
    margin-bottom: 30px;
    margin-top: 30px;
    position: relative;
  }
  .timeline .timeline-box {
    background: #fff;
    display: block;
    margin: 15px 0;
    position: relative;
    padding: 20px;
  }
  .timeline .timeline-album {
    margin-top: 12px;
  }
  .timeline .timeline-album a {
    display: inline-block;
    margin-right: 5px;
  }
  .timeline .timeline-album img {
    height: 36px;
    width: auto;
    border-radius: 3px;
  }
  @media (min-width: 768px) {
    .timeline .time-show {
      margin-right: -69px;
      text-align: right;
    }
    .timeline .timeline-box {
      margin-left: 45px;
    }
    .timeline .timeline-icon {
      background: #dee2e6;
      border-radius: 50%;
      display: block;
      height: 20px;
      left: -54px;
      margin-top: -10px;
      position: absolute;
      text-align: center;
      top: 50%;
      width: 20px;
    }
    .timeline .timeline-icon i {
      color: #98a6ad;
      font-size: 13px;
      position: absolute;
      left: 4px;
    }
    .timeline .timeline-desk {
      display: table-cell;
      vertical-align: top;
      width: 50%;
    }
    .timeline-item {
      display: table-row;
    }
    .timeline-item:before {
      content: "";
      display: block;
      width: 50%;
    }
    .timeline-item .timeline-desk .arrow {
      border-bottom: 12px solid transparent;
      border-right: 12px solid #fff !important;
      border-top: 12px solid transparent;
      display: block;
      height: 0;
      left: -12px;
      margin-top: -12px;
      position: absolute;
      top: 50%;
      width: 0;
    }
    .timeline-item.timeline-item-left:after {
      content: "";
      display: block;
      width: 50%;
    }
    .timeline-item.timeline-item-left .timeline-desk .arrow-alt {
      border-bottom: 12px solid transparent;
      border-left: 12px solid #fff !important;
      border-top: 12px solid transparent;
      display: block;
      height: 0;
      left: auto;
      margin-top: -12px;
      position: absolute;
      right: -12px;
      top: 50%;
      width: 0;
    }
    .timeline-item.timeline-item-left .timeline-desk .album {
      float: right;
      margin-top: 20px;
    }
    .timeline-item.timeline-item-left .timeline-desk .album a {
      float: right;
      margin-left: 5px;
    }
    .timeline-item.timeline-item-left .timeline-icon {
      left: auto;
      right: -56px;
    }
    .timeline-item.timeline-item-left:before {
      display: none;
    }
    .timeline-item.timeline-item-left .timeline-box {
      margin-right: 45px;
      margin-left: 0;
      text-align: right;
    }
  }
  @media (max-width: 767.98px) {
    .timeline .time-show {
      text-align: center;
      position: relative;
    }
    .timeline .timeline-icon {
      display: none;
    }
  }
  .timeline-sm {
    padding-left: 100px;
  }
  .timeline-sm .timeline-sm-item {
    position: relative;
    padding-bottom: 20px;
    padding-left: 40px;
    border-left: 2px solid #dee2e6;
  }
  .timeline-sm .timeline-sm-item:after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: -7px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #1abc9c;
  }
  .timeline-sm .timeline-sm-item .timeline-sm-date {
    position: absolute;
    left: -104px;
  }
  @media (max-width: 420px) {
    .timeline-sm {
      padding-left: 0;
    }
    .timeline-sm .timeline-sm-date {
      position: relative !important;
      display: block;
      left: 0 !important;
      margin-bottom: 10px;
    }
  }
</style>