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

      $this->notRequired = array(
        'approved_date'
      );
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
      $result = RequestMoney::where('status', '=', 0)->limit(intval($data['limit']))->offset(intval($data['offset']))->orderBy($data['sort']['column'], $data['sort']['value'])->get();
      $size =  RequestMoney::where('status', '=', 0)->get();
      if(sizeof($result) > 0){
        $i = 0;
        foreach ($result as $key) {
          $invested = app($this->investmentClass)->invested($result[$i]['id']);
          $amount = floatval($result[$i]['amount']);
          $result[$i]['rating'] = app($this->ratingClass)->getRatingByPayload('profile', $result[$i]['account_id']);
          $result[$i]['account'] = $this->retrieveAccountDetails($result[$i]['account_id']);
          $result[$i]['created_at_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['created_at'])->copy()->tz('Asia/Manila')->format('F j, Y');

          $result[$i]['needed_on_human'] = Carbon::createFromFormat('Y-m-d', $result[$i]['needed_on'])->copy()->tz('Asia/Manila')->format('F j, Y');
          $result[$i]['total'] = $this->getTotalBorrowed($result[$i]['account_id']);
          $result[$i]['amount'] = $amount - $invested['total'];
          $result[$i]['invested'] = $invested['size'];
          $result[$i]['billing_per_month_human'] = $this->billingPerMonth($result[$i]['billing_per_month']);
          $i++;
        }
      }
    	return response()->json(array(
        'data' => sizeof($result) > 0 ? $result : null,
        'size' => sizeof($size)
      ));
    }

    public function retrieveById($id){
      $result = RequestMoney::where('id', '=', $id)->get();
      $result = $this->getAttributes($result);
      return (sizeof($result) > 0) ? $result[0] : null;
    }

    public function getAttributes($result){
      if(sizeof($result) > 0){
        $i = 0;
        foreach ($result as $key) {
          $invested = app($this->investmentClass)->invested($result[$i]['id']);
          $result[$i]['rating'] = app($this->ratingClass)->getRatingByPayload('profile', $result[$i]['account_id']);
          $result[$i]['account'] = $this->retrieveAccountDetails($result[$i]['account_id']);
          $result[$i]['created_at_human'] = Carbon::createFromFormat('Y-m-d H:i:s', $result[$i]['created_at'])->copy()->tz('Asia/Manila')->format('F j, Y');

          $result[$i]['needed_on_human'] = Carbon::createFromFormat('Y-m-d', $result[$i]['needed_on'])->copy()->tz('Asia/Manila')->format('F j, Y');
          $result[$i]['total'] = $this->getTotalBorrowed($result[$i]['account_id']);
          $result[$i]['invested'] = $invested['size'];
          $result[$i]['billing_per_month_human'] = $this->billingPerMonth($result[$i]['billing_per_month']);
          $i++;
        }
      }
      return $result;
    }

    public function billingPerMonth($value){
      switch (intval($value)) {
        case 0:
          return 'every end of the month.';
          break;
        case 1:
          return 'twice a month.';
          break;
        case 2: 
          return 'every end of the week';
          break;
      }
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

    public function requestStatus($accountId){
      $result = RequestMoney::where('account_id', '=', $accountId)->where('status', '=', 1)->get();
      return (sizeof($result) > 0) ? true : false;
    }

    public function payments($data){

      $result = RequestMoney::where('account_id', '=', $data['account_id'])->where('status', '=', 1)->where('approved_date', '!=', null)->get();
      $result = $this->getAttributes($result);

      if(sizeof($result) > 0){
        $i = 0;
        foreach ($result as $key) {
          $billingDate = $this->manageNextBilling($result[$i]['approved_date'], $result[$i]['billing_per_month']);
          $result[$i]['next_billing_date_human'] = $billingDate->copy()->tz('Asia/Manila')->format('F j, Y');
          $result[$i]['next_billing_date'] = $billingDate->copy()->tz('Asia/Manila')->format('Y-m-d');
          $i++;
        }
      }
      return sizeof($result) > 0 ? $result : null;
    }

    public function manageNextBilling($approvedDate, $billingPerMonth){
      $days = 0;
      $approvedDate = Carbon::createFromFormat('Y-m-d H:i:s', $approvedDate);
      $currentDate = Carbon::now();
      $diff = $currentDate->diffInDays($approvedDate, false);
      
        // 31, 30
      if($diff > 0){
        if($billingPerMonth == 0){
          return Carbon::createFromFormat('Y-m-d H:i:s', $approvedDate)->addMonth();
        }else if($billingPerMonth == 1){
          return Carbon::createFromFormat('Y-m-d H:i:s', $approvedDate)->addMonth()->subWeeks(2);
        }
      }else{
        if($approvedDate->month == $currentDate->month && $approvedDate->year == $currentDate->year){
          if($billingPerMonth == 0){
            return Carbon::createFromFormat('Y-m-d H:i:s', $approvedDate)->addMonth();
          }else if($billingPerMonth == 1){
            return Carbon::createFromFormat('Y-m-d H:i:s', $approvedDate)->addMonth()->subWeeks(2);
          }
        }else{
          $stringDate = $currentDate->year.'-'.$currentDate->month.'-'.$approvedDate->day;
          if($billingPerMonth == 0){
            return Carbon::createFromFormat('Y-m-d', $stringDate);
          }else if($billingPerMonth == 1){
            return Carbon::createFromFormat('Y-m-d', $stringDate)->subWeeks(2);
          }
          
        }
      }
      if($billingPerMonth == 2){
        return Carbon::now()->endOfWeek()->subDay();
      }
      return null;
    }
}
