<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class Ledger extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $title;
    public $date;
    public $transactionId;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $details)
    {
        $this->user = $user;
        $this->title = $details['title'];
        $this->transactionId = $details['transaction_id'];
        $this->date = Carbon::now()->copy()->tz('Asia/Manila')->format('F j, Y');
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->from('support@idfactory.ph')->view('email.ledger');
    }
}
