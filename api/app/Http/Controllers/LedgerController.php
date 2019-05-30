<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ledger;
use Carbon\Carbon;
class LedgerController extends APIController
{
    function __construct(){
      $this->model = new Ledger();
    }

    public function dashboard(Request $request){
      $data = $request->all();
      return response()->json(array(
        'ledger' => $this->retrievePersonal($data['account_id']),
        'available' => $this->available(),
        'approved' => app('App\Http\Controllers\RequestMoneyController')->approved(),
        'total_requests' => app('App\Http\Controllers\RequestMoneyController')->total()
      ));
    }

    public function summary(Request $request){
      $data = $request->all();
      $result = Ledger::where('account_id', '=', $data['account_id'])->limit(intval($data['limit']))->offset(intval($data['offset']))->get();
      if(sizeof($result) > 0){
        $i = 0;
        foreach ($result as $key) {
          $result[$i]['created_at_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['created_at'])->copy()->tz('Asia/Manila')->format('F j, Y');
          $i++;
        }
      }
      return response()->json(array(
        'data' => $result
      ));
    }

    public function retrievePersonal($accountId){
      $result = Ledger::where('account_id', '=', $accountId)->sum('amount');
      return $result;
    }

    public function available(){
      $result = Ledger::where('deleted_at', '!', null)->sum('amount');
      return $result;
    }
}
