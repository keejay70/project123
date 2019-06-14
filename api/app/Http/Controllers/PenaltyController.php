<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Penalty;
class PenaltyController extends APIController
{
    function __construct(){
      $this->model = new Penalty();
    }
}
