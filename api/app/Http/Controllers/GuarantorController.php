<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Guarantor as GuarantorModel;
use Increment\Account\Models\Account;
use App\Mail\Guarantor;
use Carbon\Carbon;

class GuarantorController extends APIController
{
      public $notificationClass = 'Increment\Common\Notification\Http\NotificationController';
      public function create(Request $request){
      $data = $request->all();
      $reciever_id = 0;
      $user = $this->retrieveAccountDetails($data['account_id']);
      $emailExist = GuarantorModel::where('email', '=', $data['email'])->where('sender_id', '=', $data['account_id'])->get();
      $userExist = Account::where('email', '=', $data['email'])->get();
      if(sizeof($userExist) > 0){
        $reciever_id = $userExist[0]->id; 
        $parameter = array(
        'to' => $reciever_id,
        'from' => $data['account_id'],
        'payload' => 'guarantor',
        'payload_value' => 'tests',
        'route' => 'tests'
      );
        app($this->notificationClass)->create($parameter);
      }


      
      if($user->email != $data['email'] && sizeof($emailExist) == 0){
        $code = $this->generateCode();
        $guarantor = new GuarantorModel();
        $guarantor->code = $this->generateCode();
        $guarantor->sender_id = $data['account_id'];
        $guarantor->reciever_id = $reciever_id;
        $guarantor->email = $data['email'];
        $guarantor->status = 'pending';
        $guarantor->created_at = Carbon::now();
        $guarantor->save();
        if($user != null){
          Mail::to($data['email'])->send(new Guarantor($user, $data['email'], $code));
          $this->response['data'] = true;
          }
      }
    }

      public function generateCode(){
      $code = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 32);
      $codeExist = GuarantorModel::where('code', '=', $code)->get();
      if(sizeof($codeExist) > 0){
        $this->generateCode();
      }else{
        return $code;
      }
    }
}