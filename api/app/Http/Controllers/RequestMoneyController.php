<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestMoney;
use Carbon\Carbon;
class RequestMoneyController extends APIController
{

		public $ratingClass = 'Increment\Common\Rating\Http\RatingController';
    public $investmentClass = 'App\Http\Controllers\InvestmentController';
    function __construct(){  
    	$this->model = new RequestMoney();
    }

    public function create(Request $request){
    	$data = $request->all();
    	$data['code'] = $this->generateCode();
    	$this->model = new RequestMoney();
    	$this->insertDB($data);
    	return $this->response();
    }

    public function generateCode(){
      $code = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 32);
      $codeExist = RequestMoney::where('code', '=', $code)->get();
      if(sizeof($codeExist) > 0){
        $this->generateCode();
      }else{
        return $code;
      }
    }

    public function retrieve(Request $request){
    	$data = $request->all();
    	$this->retrieveDB($data);
    	$result = $this->response['data'];
    	if(sizeof($result) > 0){
    		$i = 0;
    		foreach ($result as $key) {
          $invested = app($this->investmentClass)->invested($result[$i]['id']);
          $amount = floatval($this->response['data'][$i]['amount']);
    			$this->response['data'][$i]['rating'] = app($this->ratingClass)->getRatingByPayload('profile', $result[$i]['account_id']);
    			$this->response['data'][$i]['account'] = $this->retrieveAccountDetails($result[$i]['account_id']);
          $this->response['data'][$i]['created_at_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['created_at'])->copy()->tz('Asia/Manila')->format('F j, Y');

          $this->response['data'][$i]['needed_on_human'] = Carbon::createFromFormat('Y-m-d', $result[$i]['needed_on'])->copy()->tz('Asia/Manila')->format('F j, Y');
          $this->response['data'][$i]['total'] = $this->getTotalBorrowed($result[$i]['account_id']);
          $this->response['data'][$i]['amount'] = $amount - $invested['total'];
          $this->response['data'][$i]['invested'] = $invested['size'];
    			$i++;
    		}
    	}
    	return $this->response();
    }

    public function updateStatus($id){
      RequestMoney::where('id', '=', $id)->update(array(
        'status' => 1,
        'updated_at' => Carbon::now()
      ));
    }

    public function getAmount($requestId){
      $result = RequestMoney::where('id', '=', $requestId)->get();
      return sizeof($result) > 0 ? floatval($result[0]['amount']) : null;
    }   

    public function getTotalBorrowed($accountId){
    	$result = RequestMoney::where('account_id', '=', $accountId)->where('status', '=', 1)->sum('amount');
    	return $result;
    }

    public function total(){
      $result = RequestMoney::where('status', '=', 0)->sum('amount');
      return $result;
    }

    public function approved(){
      $result = RequestMoney::where('status', '=', 1)->sum('amount');
      return $result;
    }
}
