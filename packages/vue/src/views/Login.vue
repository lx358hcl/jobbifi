<template>
    <main class = "container hjem d-flex justify-content-center align-items-center">
        <div style = "min-width:400px; height: 450px;" class="boks login p-3">
          <form>
            <h1 class = "loginheader">&</h1> 
            <h2 class = "loginheader m-0 p-0">NEVET</h2>
            <br />

            <div class="form-group p-2 m-1">
              <input type="email" class="form-control p-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>

            <div class="form-group p-2 m-1">
              <input type="password" class="form-control p-4" id="exampleInputPassword1" placeholder="Password">
            </div>

            <div class = "logintesting form-group p-2 m-1">
              <button type="submit" class="loginbtn btn btn-primary loginbutton">Login</button>
              <a class="glemtp p-3" href="#">Glemt passordet?</a>
            </div>
          </form>
        </div>
    </main>
</template>

<script>
  export default {
    setup(){
      return {
      }
    }
  }
</script>