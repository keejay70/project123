<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Investment;
use Carbon\Carbon;
class InvestmentController extends APIController
{


    public $requestClass = 'App\Http\Controllers\RequestMoneyController';
    public $ledgerClass = 'App\Http\Controllers\LedgerController';
    function __construct(){
      $this->model = new Investment();
      $this->notRequired = array(
        'message'
      );
    }

    public function create(Request $request){
      $response = array(
        'data'  => null,
        'error' => null,
        'timestamps' => Carbon::now()
      );
      $data = $request->all();
      $amount = floatval($data['amount']);
      $remainingAmount = app($this->requestClass)->getAmount($data['request_id']);
      $invested = $this->invested($data['request_id']);
      $remainingAmount = ($remainingAmount) ? ($remainingAmount - $invested['total']) : null;
      $myBalance = floatval(app($this->ledgerClass)->retrievePersonal($data['account_id']));
      if($myBalance < $amount){
        $response['error'] = 'You have insufficient balance. Your balance is PHP '.$myBalance.' balance.';
      }else if($remainingAmount){
        if($remainingAmount < $amount){
          $response['error'] = 'Remaining amount is less than the invested amount. Refresh and adjust your investment now.';
        }else{
          $left = $remainingAmount - $amount;
          if($left < floatval($data['minimum']) && $left > 0){
            $response['error'] = 'Remaining amount should not be less than the minimum investment amount';
          }else{
            // make investment here.
            $invest = new Investment();
            $invest->account_id = $data['account_id'];
            $invest->request_id = $data['request_id'];
            $invest->amount = $amount;
            $invest->message = $data['message'];
            $invest->created_at = Carbon::now();
            $invest->save();
            $response['data'] = $invest->id;
            $response['error'] = null;
            $description = 'You have invested to this <b class="text-primary">request</b>';
            app($this->ledgerClass)->addToLedger($data['account_id'], $amount * (-1), $description);
            if($left <= 0){
              app($this->requestClass)->updateStatus($data['request_id']);
            }
          }
        }
      }else{
        $response['error'] = 'I\'m sorry the request was already approved.';
      }

      return response()->json($response);
    }

    public function retrieve(Request $request){
      $data = $request->all();

      $this->retrieveDB($data);



      return $this->response();
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
