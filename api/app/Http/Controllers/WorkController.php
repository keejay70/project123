<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Work;

class WorkController extends APIController
{
    function __construct(){
        $this->model = new Work();
        $this->notRequired = array('month_ended','year_ended');
    }
}
