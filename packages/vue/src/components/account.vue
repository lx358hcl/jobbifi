<template>
    <div class="dropdown outerButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <a class="w-100 h-100 d-flex justify-content-center align-items-center" href="#">
            <div class="innerButton">
                <i class="fas fa-bars moreIcon"></i>
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Login</a>
                <a class="dropdown-item" href="#">Bli medlem</a>
                <a class="dropdown-item" href="#">Something </a>
            </div>
        </a>
    </div>
</template>


<style>
    .outerButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 45px;
        background-color: #fff;
        border-radius: 105px;
        margin-left: 30px;
        margin-right: 15px;
        box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 65%);
    }
    .outerButton:active {
        box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 65%);
        transform:scale(0.99);
    }
    .outerButton > a {
        text-decoration: none;
        color: transparent;
    }
    .innerButton {
        display: inherit;
        justify-content: space-between;
        align-items: inherit;
        width: 100%;
        height: 100%;
        padding: 5px;
    }
    .innerButton>* {
        padding: 0 10px 0 10px;
        font-size: 26px;
        color: #313131;
    }
    .moreIcon {
        font-size: 16px;
    }
</style>