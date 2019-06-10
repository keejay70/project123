<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment;
use Carbon\Carbon;
class PaymentController extends APIController
{

  public $requestClass = 'App\Http\Controllers\RequestMoneyController';
  
  function __construct(){
    $this->model = new Payment();
  }

  public function retrieve(Request $request){
    $data = $request->all();
    $result = Payment::where('account_id', '=', $data['account_id'])->limit(intval($data['limit']))->offset(intval($data['offset']))->orderBy($data['sort']['column'], $data['sort']['value'])->get();

    if(sizeof($result) > 0){
      $i = 0;
      foreach ($result as $key) {
        $result[$i]['request'] = app($this->requestClass)->retrieveById($result[$i]['request_id']);
        $result[$i]['date_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['date'])->copy()->tz('Asia/Manila')->format('F j, Y');
        $result[$i]['created_at_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['created_at_human'])->copy()->tz('Asia/Manila')->format('F j, Y');
        $i++;
      }
    }

    return response()->json(array(
      'data'        => $result,
      'error'       => null,
      'timestamps'  => Carbon::now()
    ));
  }
}
