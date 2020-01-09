<template>
  <div class="modal fade" id="guideModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">Payhiram User Guide</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="guide-holder">
                <div class="jumbotron">
                  <h2>Hi {{user.username}}! Welcome to Payhiram by {{common.COMPANY}}!</h2>
                </div>
                <div class="jumbotron">
                  Welcome to the Payhiram User Guide. Here we will take you step by step from account creation to posting your first payment request on the Payhiram platform. <a href="http://payhiram.increment.ltd/#/signup"><button class="btn btn-primary">Register here</button></a>  if you have not yet created an account. 
                </div>
                <div class="jumbotron">
                  <h5>What is Payhiram by {{common.COMPANY}}?</h5>
                  <div class="alert alert-info">
                    Payhiram by {{common.COMPANY}} is an online marketplace for users to provide and avail of money-related services. Your web portal to make sound and monitored investments, quick and easy emergency transactions, and convenient fund transfers. <br>
                  </div>
                </div>

                <div class="jumbotron">
                  <h6>What are the types of accounts in Payhiram by {{common.COMPANY}}?</h6>
                  <div class="alert alert-info">
                    <strong>Regular Account</strong>
                    <br>
                   A regular account allows you to borrow money. It provides the users an account profile to upload their necessary information and documents for monetary transactions performed on the platform. 
                   </div>

                  <div class="alert alert-info">
                    <strong>Investor Account</strong>
                    <br>
                     An investor account is our partner type of account where it has lending feature and view the list of requests from the borrowers.
                  </div>
                </div>


                <div class="jumbotron">
                  <h6><strong>Get Started</strong></h6>
                 
                  <div class="alert alert-info">
                    Fill up the information needed on your Payhiram by {{common.COMPANY}} Profile such as Personal Information, Educational Background and Work Experience. These are important so the service can verify and identify you as a legitimate verified account. Go to or click Account Settings on the left sidebar menu.
                    </div>

                  <div class="alert alert-info">
                    <strong>Profile Picture</strong>
                    <br>
                    To change your profile photo simply click the photo. Click the face icon to select a photo from your folder. For best results, upload a square image.
                  </div>
                  <div class="alert alert-info">
                    <strong>Personal Information</strong>
                    <br>
                    Under the <strong>Settings</strong> menu, click the <strong>Personal Information</strong> and click the Edit Icon(<i class="fa fa-pencil"></i>) located on the right part of the screen. Enter your First Name, Middle Name, Last Name, Birthdate, Sex, Cellphone Number, and Address as required. Then Click <button class="btn btn-primary">Update</button> to update your personal information. For privacy purposes, your birthdate, cellphone number and address will not be shown to other users. The information you provide is strictly for security purposes only.
                  </div>

                  <div class="alert alert-info">
                    <strong>Educational Background</strong>
                    <br>
                    Under the <strong>Settings</strong> menu, click <strong>Educational Background</strong>  and click the Add Icon(<i class="fa fa-plus"></i>) located right most of the screen. Enter your Course, Select School, School ID, year and months started and ended.
                    </div>

                  <div class="alert alert-info">
                    <strong>Work Experiences</strong>
                    <br>
                    Under the <strong>Settings</strong> menu, click the <strong>Work Experiences</strong> and click the Add Icon(<i class="fa fa-plus"></i>) located right most of the screen. Enter your job position, company, company address and year and month started and ended.
                  </div>

                  <div class="alert alert-info">
                    <strong>Account Information</strong>
                    <br>
                    Under the <strong>Settings</strong> menu, you can view your account information. Click the <strong>Account Information.</strong> Your username, email and date started here in Payhiram by {{common.COMPANY}} is shown here. That's It!
                  </div>
                </div>
                
                <div class="jumbotron">
                  <h6><strong>User Navigation</strong></h6>
                  On the left side are the following navigation features: 
                  <div class="alert alert-info">
                   <strong><i class=" visible fa fa-arrow-right"></i> Requests</strong>
                   <br>
                       Click this navigation icon to check your current available requests. In this section, you will find all available requests which can be sorted in ascending or descending order based on Date posted, Amount, Interest Rates, Months Payable, And Date Needed on.
                   </div>
                   <div class="alert alert-info">
                   <strong><i class=" visible fa fa-tachometer"></i> Dashboard</strong>
                   <br>
                     Click this navigation icon to switch to your Dashboard. In this section, you will find your current account balance, requested amount, approved requests, available funds. It also allows you to see your ledger which allows you to <button class="btn btn-primary"> View Investments </button> and <button class="btn btn-primary"> View Requests </button>
                   </div>
                   <div class="alert alert-info">
                   <strong>  <i class=" visible fa fa-arrow-left"></i> Investments</strong>
                   <br>
                    Click this navigation icon to check all your current investments. In this section, you will see requests that you have invested in.
                   </div>
                   <div class="alert alert-info">
                   <strong><i class=" visible fas fa-piggy-bank"></i> Deposits</strong>
                   <br>
                    Click this navigation icon to check all your current deposits. It keeps a log of your deposit amount, description, current status and attached files for validation.
                   </div>
                   <div class="alert alert-info">
                   <strong><i class=" visible fas fa-money-check"></i> Withdrawals</strong>
                    <br>
                    Click this navigation icon to check all your Withdrawal transactions. It keeps a log of your withdrawn amounts and requested money.
                    </div>
                  </div>

                <div class="jumbotron">
                  <h6><strong>Posting Your First Request</strong></h6>
                  <div class="alert alert-info">
                   <strong>Add Request</strong>
                   <br>
                   To post a request, click the <button class="btn btn-primary">Post a request</button> button at the upper right and fillup the following details: Borrow Amount, Interest Rate of Payment, Payment Period, Date Payment Needed, Payment Plan, Reason for borrowing and adding of comaker(optional) 
                   </div>
                </div>
                
                <div class="jumbotron">
                  <h6><strong>Making Your First Investment</strong></h6>
                  <div class="alert alert-info">
                   <strong>Add Request</strong>
                   <br>
                   To make an investment, click the <button class="btn btn-primary">Invest</button> button at the selected request you want to invest in, fill up the amount to invest and the message to the borrower.
                   </div>
                </div>

                <div class="jumbotron">
                  <h6><strong>Bookmarking requests</strong></h6>
                  <div class="alert alert-info">
                   <strong>Bookmark</strong>
                   <br>
                   To bookmark specific requests, click the <button class="btn btn-warning">Bookmark</button> button at the selected request you want to bookmark.
                   </div>
                </div>

                 <div class="jumbotron">
                  <h6><strong>How to Report</strong></h6>
                  <div class="alert alert-info">
                   <strong>Report</strong>
                   <br>
                   To make a report, please press the ellipsis (...) on specific requests , click the <strong>Report</strong> Button and write a message.
                      </div>
                </div>

                <div class="jumbotron">
                  <h6><strong>Others</strong></h6>
                  <div class="alert alert-info">
                   <strong>Login Notifications</strong>
                   <br>
                   For added security measures, you can set <strong>Login Notifications</strong> to be sent to your email. This function can only be enabled once your email is verified. Please wait a few minutes for the automatically generated to be sent to your inbox.
                   <br>
                   <br>
                   <strong>OTP (One Time Password)</strong>
                   <br>
                   Additionally, <strong>OTP (One Time Password)</strong> can be configured on your account for added security. The OTP Code will be sent to your email upon every login once the feature has been enabled on your account.
                   </div>
                  </div>
               </div>
             </div>
             </div>
          
          <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#guideModal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background-color: $primary !important;
}
.guide-holder{
  margin-top:22px;
  width:90%;
  float: left;
  margin-left:5%;
  margin-right:5%;
}

.jumbotron{
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
  background: #fff;
}

.alert{
  text-align: justify !important;
}
.alert-info{
  background: #fff !important;
  border: 0px !important;
  color: #212529;
}
.bg-danger{
  color: #fff !important;
}
</style>
<script>
  import ROUTER from 'src/router'
  import Vue from 'vue'
  import AUTH from 'src/services/auth'
  import COMMON from 'src/common.js'
  export default{
    data(){
      return {
        user: AUTH.user,
        common: COMMON
      }
    },
    props: {
    },
    methods: {
      redirect(parameter){
        ROUTER.push(parameter)
      }
    }
  }
</script>
