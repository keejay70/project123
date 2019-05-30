<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestMoney extends APIModel
{
    protected $table = 'requests';
    protected $fillable = ['account', 'code', 'amount', 'months_payable', 'interest', 'reason', 'needed_on', 'status'];
}
