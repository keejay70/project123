<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class OtpEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $date;
    public $otpCode;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $otpCode)
    {
        $this->user = $user;
        $this->otpCode = $otpCode;
        $this->date = Carbon::now()->copy()->tz('Asia/Manila')->format('F j, Y');
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->subject('OTP Notification')->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.otpemail');
    }
}
