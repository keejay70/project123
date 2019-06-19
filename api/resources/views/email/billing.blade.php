@component('email.header')
@endcomponent
<span class="text">
    <h3>Payment Due Reminder</h3>
    Hello {{$user->username}}!
    <br>
    <br>
    You're payment is due on {{$date}}.
    <br>
    <br>
</span>
@component('email.footer')
@endcomponent