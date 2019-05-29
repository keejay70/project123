<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ledger;
class LedgerController extends APIController
{
    function __construct(){
      $this->model = new Ledger();
    }
}
