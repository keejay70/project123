<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment;
class PaymentController extends APIController
{
  function __construct(){
    $this->model = new Payment();
  }
}
