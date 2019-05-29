<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ledger extends APIModel
{
  protected $table = 'ledgers';
  protected $fillable = ['account_id', 'amount', 'description'];
}
