<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AccountCard;

class AccountCardController extends APIController
{
    function __construct(){
        $this->model = new AccountCard();
    }
}
