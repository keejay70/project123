<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Investment;
class InvestmentController extends APIController
{


    public $requestClass = 'App\Http\Controllers\RequestMoneyController';
    function __construct(){
      $this->model = new Investment();
      $this->notRequired = array(
        'message'
      );
    }

    public function invested($requestId){
      $total = 0;
      $i = 0;
      $result = Investment::where('request_id', '=', $requestId)->get();
      if (sizeof($result) > 0) {
        foreach ($result as $key) {
          $total += floatval($result[$i]['amount']);
          $i++;
        }
      }
      return array(
        'total' => $total,
        'size' => sizeof($result)
      );
    }

    public function approved(){
      $result = Investment::sum('amount');
      return $result;
    }
}
