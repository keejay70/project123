<?php

namespace App\Jobs;

use App\Jobs\Email;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class Payment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        echo"hi";
        $details = array(
            'code'=>'asdf',
            'username'=>'asdf',
            'email'=>'janpalugod@gmail.com'
        );
        Email::dispatch((object)$details);
    }
}
