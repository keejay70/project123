<?php

namespace App\Http\Controllers;

use Increment\Account\Models\Account;
use Illuminate\Http\Request;
use App\Comaker;
use Carbon\Carbon;
class ComakerController extends APIController
{
    public function addToComaker($accountId, $requestId, $comaker){
      $newComaker = new Comaker();
      $newComaker->account_id = $accountId;
      $newComaker->request_id = $requestId;
      $newComaker->comaker = $comaker;
      $newComaker->status = 0;
      $newComaker->created_at = Carbon::now();
      $newComaker->save();
    }


}
