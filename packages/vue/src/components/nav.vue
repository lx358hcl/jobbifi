<template>
  <nav style = "margin-bottom: 0 !important;" class="navbar sticky-top navbar-light bg-light navbar-expand-xl mb-0">
    <div class="container">

      <a id="logo" class="navbar-brand" href="/">&</a>

      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 search" type="search" style="font-family: FontAwesome;"
          placeholder="&#xF002; Søk" aria-label="Search">
      </form>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item">
            <a class="nav-link titles" href="/" v-bind:class="{'active': $route.path == '/'}">HJEM</a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/stillinger" v-bind:class="{'active': $route.path == '/stillinger'}">STILLINGER
              <span class="badge badge-danger">394</span>
            </a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/arrangementer"
              v-bind:class="{'active': $route.path == '/arrangementer'}">ARRANGEMENTER
              <span class="badge badge-success">394</span>
            </a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/blimedlem" v-bind:class="{'active': $route.path == '/blimedlem'}">BLI MEDLEM</a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/login" v-bind:class="{'active': $route.path == '/login'}">LOGIN</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>