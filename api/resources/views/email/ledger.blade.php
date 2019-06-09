@component('email.header')
@endcomponent
<span class="text">
    Hello {{$user->username}}!
    <br>
    <h3>{{$title}}</h3>
</span>
<span class="text">
	<label style="float: left">
		Transaction ID: {{$transactionId}}
	</label>
	<label style="float: right;">
		{{$date}}
	</label>
</span>
<span class="text">
    If you did not make this action, please <a href="{{env('APP_FRONT_END_URL')}}/reset_password/{{$user->username}}/{{$user->code}}">reset</a> your password to secure your account and reply to this message to notify us.
</span>
@component('email.footer')
@endcomponent

