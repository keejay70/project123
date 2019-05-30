<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Investment extends APIModel
{
  protected $table = 'investments';
  protected $fillable = ['account_id', 'request_id', 'amount', 'amount'];
}
