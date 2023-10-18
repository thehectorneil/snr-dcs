<template>
<div class="row justify-center items-center q-pa-sm">
    <div v-if="isOnline" style="background-color:#333333; color:#fff;" class="q-mx-auto q-py-sm q-pl-md q-pr-xl">
    <div class="profile-details-wrapper">
  <img class="profile-picture q-mt-sm" src="~/src/assets/no_signal.png">
  <div class="profile-details">
<span style="font-size:16px" class="text-weight-bold">You're offline now. Oops! </span><br>
<span style="font-size:12px"> Internet is diconnected.</span>
  </div>
  </div>
    </div>
     </div>
  <div class="q-pa-none">
    <!-- content -->
    <div class="row q-pa-none">
      <div class="col q-px-none">
           <div class="row q-pa-md back-separator" > 
    <div class="col" @click="$router.push('/scanner')">
      <img style="height: 12.44px; width: 18.67px" class="q-mr-xs" src="~/src/assets/back.png" />Back
     </div>
    <div class="col scan-top-txt text-right">
    
    </div>
   </div>
    <div class="row" >
      <div class="col col-xs-12 col-sm-8 col-md-5 col-lg-5  col-xl-5 q-pa-sm"  style="margin:auto;">
      <form @submit.prevent.stop="clickButton()">
        <p style="font-size:20px;" class="text-weight-bold text-center q-mt-lg q-mb-lg">Check Member ID</p>
        <div class="col-inputs" >
<div style="display:inline-block;">
        <p class="q-mb-sm text-weight-bold text-left"> Membership Card Number</p>
        <input type="number" id="memberOne" class="memberNumber"  max="9999"/>
          <input type="number"  id="memberTwo" class="memberNumber" max="9999"/>
          <input type="number"  id="memberThree" class="memberNumber"  max="9999"/>
          <input type="number" id="memberFour" class="memberNumber" max="9999"/>
       
          <div v-if="isEmptyInput == true" class="notMatchText text-left">Please provide input on required information.</div>
          <p style="color:#00000073; font-size:13px; margin-top:4px;" class="q-mt-sm text-left text-weight-medium">Enter 16 digit number</p>
   <div class="row q-mt-lg">
          <div class="col" style="margin:auto;">
           <p v-if="notMatch" class="text-left notMatchText">Record does not match.</p>
            <q-btn class="continue-btn text-capitalize" :disable="!isValidate" type="submit">Validate</q-btn>
          </div>
        </div>
</div>
        </div>
            <!-- <q-input ref="memberNumberRef" placeholder="Enter 16 digit number" outlined v-model="memberNumber" @update:model-value="onInputmemberNumber(memberNumber)" mask="################" 
              :rules="memberNumberRules" /> -->
           
      </form>
    </div>
    </div>
    </div>
    </div>
  </div>
    <q-dialog v-model="dialog" persistent maximized style="border-radius:10px;">
    <q-card style="border-radius:10px;">
      <div class="text-h5" :style="dataScanned.card_status == 'Active'?' background-color: #4baf4f;':dataScanned.card_status == 'Blocked'?'background-color: #FF3838':dataScanned.card_status == 'Expired'?'background-color: #F29C38':dataScanned.card_status == 'Cancelled'?'background-color:#00000073':''">
        <p style="text-align: center; font-size: 18px; color: #fff">{{dataScanned.card_status}}</p>
      </div>
       <!-- <form @submit.prevent.stop="customerEntry()"> -->
      <div style="text-align: center">
        <p class="mt-3" style="text-align: center; font-size: 20px">
          Member Info
        </p>
        <img style="height: 88px; width: 88px; border-radius:42px;" :src="'data:image/png;base64,'+ dataScanned.photo " />
        <p class="customer-name text-weight-medium">{{dataScanned.first_name}} {{dataScanned.last_name}}</p>
        <p class="customer-card-no-label text-weight-medium q-mb-none">Membership Card Number / Type</p>
        <p class="customer-card-no text-weight-medium q-mb-sm">{{dataScanned.card_number}}</p>

        <div class="row" align="center" justify="center">
          <div class="col col-xs-5 col-sm-3 col-md-2 col-lg-2 col-xl-2" style="margin:auto;">
            <div class="q-pa-md" style="
                border-radius: 4px;
                background-color: #f9a825;
                text-align: center;
                color: #fff;
              ">{{dataScanned.membership_type}} Member
            </div>
          </div>
        </div>
        <p class="customer-card-no-label q-mt-md text-weight-medium q-mb-xs">Volume Shopper</p>
          <p class="customer-card-no text-weight-medium">{{dataScanned.volume_shopper}}</p>

        <p class="customer-card-no-label q-mt-md text-weight-medium q-mb-xs">Input Number of Companion</p>
         <p class="companion-label text-weight-medium q-mb-xs q-mt-md">Male</p> 
        <div class="row" align="center" justify="center">
          <div cols="3" sm="1" class="col q-mr-sm" align="right">
            <q-btn style="height: 49px; background-color:#00000073" color="#0000004D"
              @click="maleAdultCount('minus')"><img style="width: 15px" src="~/src/assets/minus.png" /></q-btn>
          </div>
          <div class="col col-xs-5 col-sm-4 col-md-3 col-lg-3 col-xl-2">
          
            <q-input input-class="text-center" mask="###" v-model="maleAdult" outlined @update:model-value="onInputCompanionMale(maleAdult)" maxLength="3" />
          </div>

          <div cols="3" sm="1" class="col q-ml-sm" align="left">
            <q-btn style="height: 49px; background-color:#1B3564;" color="#1B3564" @click="maleAdultCount('add')">
              <q-img style="width: 15px" src="~/src/assets/plus.png" /></q-btn>
          </div>
        </div>

        <p class="companion-label text-weight-medium q-mb-xs q-mt-md">Female</p> 
        <div class="row" align="center" justify="center">
          <div cols="3" sm="1" class="col q-mr-sm" align="right">
            <q-btn style="height: 49px; background-color:#00000073" color="#0000004D"
              @click="femaleCount('minus')"><img style="width: 15px" src="~/src/assets/minus.png" /></q-btn>
          </div>
          <div class="col col-xs-5 col-sm-4 col-md-3 col-lg-3 col-xl-2">
          
            <q-input input-class="text-center" mask="###" v-model="female" outlined @update:model-value="onInputCompanionFemale(female)" maxLength="3" />
          </div>

          <div cols="3" sm="1" class="col q-ml-sm" align="left">
            <q-btn style="height: 49px; background-color:#1B3564;" color="#1B3564" @click="femaleCount('add')">
              <q-img style="width: 15px" src="~/src/assets/plus.png" /></q-btn>
          </div>
        </div>
     
      </div>

      <div class="row " style="margin:auto;">

        <div class="col col-xs-12 col-sm-12 col-md-5 col-lg-5  col-xl-5 q-pa-sm " style="margin:auto;">
          <q-btn class="continue-btn q-mt-lg" @click="customerEntry()">Submit</q-btn>
        </div>
      </div>
 <!-- </form> -->
    </q-card>
  </q-dialog>
</template>
<style scoped>
.back-separator{
    border-top:1px solid #00000033; 
    border-bottom:1px solid #00000033;
}
.continue-btn {
  width: 100%;
  color: #fff;
  font-size: 15px;
  background-color: #1B3564;
}
.col-inputs {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-top: 30px;
}

.memberNumber {
  width: 74px;
  height: 40px;
  margin: 0 5px;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #CDCDCD;
}
.notMatchText{
  font-size: 12px;
  color: #C10015;
  margin: 0px;
}

.continue-btn {
  width: 100%;
  background-color: #1b3564;
  color: #fff;
}

.q-dialog__inner--maximized>div {
  height: 86%;
  width: 97%;
}

.q-dialog__inner--maximized>div {
  border-radius: 4px !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.companion-label{
  font-size:18px;
}
</style>
<script setup>
import jQuery from 'jquery'
import { ref , onBeforeMount, onMounted} from 'vue'
import axios from "axios";
import { userToken } from "src/stores/auth/login";
import { useRouter } from 'vue-router';
import { authStore } from 'src/stores/auth'
const $ = jQuery;
const auth = authStore();
const notMatch = ref(false)
const router = useRouter();
const maleAdult = ref(0);
const female = ref(0);
const storeLogin = userToken();
const memberNumberRef = ref('');
const memberNumber = ref('');
const firstNameRef = ref('');
const firstName = ref('');
const lastNameRef = ref('');
const lastName = ref('');
const dataScanned = ref('');
const isValidate = ref(false);
const val1 = ref(null);
const val2 = ref(null);
const val3 = ref(null);
const val4 = ref(null);
const isEmptyInput = ref(false);
const dialog = ref(false);
const isOnline = ref('');

onMounted(() => {
  // getCurrentLocation();
  jQuery(function($) { // DOM ready and $ alias secured

});

}),
jQuery(function($) { // DOM ready and $ alias secured
    $('input[type=number][max]:not([max=""])').on('input', function(ev) {
    var $this = $(this);
    var maxlength = $this.attr('max').length;
    var value = $this.val();
    if (value && value.length >= maxlength) {
      $this.val(value.substr(0, maxlength));
    }
  });

$('#memberOne').keyup(function(){

    var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
          $(this).val(val);
      val1.value = val
      if(val.length == 4){
    document.getElementById("memberTwo").focus();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }

});

$('#memberTwo').keyup(function(){

    var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
          $(this).val(val);
           val2.value = val
      if(val.length == 4){
    document.getElementById("memberThree").focus();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }

});

$('#memberThree').keyup(function(){

    var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
          $(this).val(val);
       val3.value = val
      if(val.length == 4){
    document.getElementById("memberFour").focus();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }

});

$('#memberFour').keyup(function(){

    var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
          $(this).val(val);
           val4.value = val
      if(val.length == 4){
       
    document.getElementById("memberFour").blur();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
       
        isValidate.value = true;
        isEmptyInput.value = false;
    }

});


});
 
onBeforeMount(() => {
  if(auth.profile.token == ''){
    router.push({ path: 'dcs/login' })
  }
  // getUserDetails();
});

const clickButton = async () => {
  if(navigator.onLine == true){
  var memberID = val1.value + val2.value + val3.value + val4.value
    await axios({
      method: "get",
      url:`https://snrvmc-mobile-dev.yondu.com/api/v1/dcs-service/qrocr/verify-ocr?cardNumber=${memberID}`,
      // url:`https://snrvmc-mobile-dev.yondu.com/api/v1/dcs-service/qrocr/verify-ocr?manual/${lastName.value}`,      headers: {
         headers: {
        Authorization: "Bearer " +  auth.profile.token,
      },
    }).then((response) => {
          //alert(response)
      if (response.data.code === 200) {
       dataScanned.value = response.data.data
      notMatch.value = false
       dialog.value = true
    }
    }) .catch(function(error) {
      console.log(error.response.status)
      console.log(error.response.data.message)
      if(error.response.status == 422){
          notMatch.value = true;
      }
    })
  }else if(navigator.onLine == false){
     isOnline.value = true
 setTimeout(() => {
       isOnline.value = false
    }, "3000")
  }
};

const maleAdultCount = (args) => {
  if (args == "add" && maleAdult.value < 100) {
    maleAdult.value++;
  } else if(args == "minus"){
    if (maleAdult.value != 0) {
      maleAdult.value--;
    }
  }
};
const femaleCount = (args) => {
  if (args == "add" && female.value < 100) {
    female.value++;
  } else if(args == "minus"){
    if (female.value != 0) {
      female.value--;
    }
  }
};
const onInputCompanionMale = (arg) => {
  var num = Number(arg)
if(num < 100){
let number = parseInt(num, 10);
maleAdult.value = number.toString()
}if (num > 100){
  var val = Math.floor(num / 10) 
  maleAdult.value = 0
}  
  };

  const onInputCompanionFemale = (arg) => {
  var num = Number(arg)
if(num < 100){
let number = parseInt(num, 10);
female.value = number.toString()
}if (num > 100){
  var val = Math.floor(num / 10) 
  female.value = 0
}  
  };
const myFunctionFocus = (arg) => {
    if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
    }
// if(arg.length == 4){
//       isEmptyInput.value = false
//   }else if(arg.length < 4){
// isEmptyInput.value = true;
//   isValidate.value = false;
//   }
};
const myFunction = (arg) => {
  if(arg == null || arg == ''){
    isEmptyInput.value = true;
  }
   if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
    }
  // else if(arg.length == 4){
  //     isEmptyInput.value = false;
  // }else{
  //    isValidate.value = false;
  //    isEmptyInput.value = true;
  // }
  
};
const next1 = (e) => {
  // console.log(e)
  // let a = val1.value
  // var regex = a.replace(/\D/,'') //regex accept only numbers
  // val1.value = regex
   if(val1.value.length == 4){
    document.getElementById("membertwo").focus();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }
  //  else{
  //    isValidate.value = false;
  //      isEmptyInput.value = true;
  // }
 };
 const next2 = (e) => {
   let a = val2.value
   var regex = a.replace(/\D/,'') //regex accept only numbers
   val2.value = regex
   if(val2.value.length == 4){
    document.getElementById("member3").focus();
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }
  //  else{
  //    isValidate.value = false;
  //     isEmptyInput.value = true;
  // }
 };
 const next3 = (e) => {
   let a = val3.value
  var regex = a.replace(/\D/,'') //regex accept only numbers
  val3.value = regex
   if(val3.value.length == 4){
    document.getElementById("member4").focus();
    //  isValidate.value = true;
   }
     if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }
  //  else{
  //    isValidate.value = false;
  //     isEmptyInput.value = true;
  // }
 };

  const next4 = (e) => {
   let a = val4.value
  var regex = a.replace(/\D/,'').replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '') //regex accept only numbers
  val4.value = regex;
    if(val1.value.length != 4 || val2.value.length != 4 || val3.value.length != 4 || val4.value.length != 4){
        isEmptyInput.value = true;
        isValidate.value = false;
    }else {
      
    }
    if (val1.value.length == 4 && val2.value.length == 4 && val3.value.length == 4 && val4.value.length == 4){
        isValidate.value = true;
        isEmptyInput.value = false;
    }
  // if(val4.value.length == 4){
  //   isValidate.value = true;
  //    isEmptyInput.value = false;
  // }else{
  //    isValidate.value = false;
  //     isEmptyInput.value = true;
  // }
 };
const customerEntry = async () => {
if(navigator.onLine == true){
  try {
    await axios({
      method: "post",
      url: "https://snrvmc-mobile-dev.yondu.com/api/v1/dcs-service/qrocr/customer-entrance-record",
      data: {
        maleCompanion: maleAdult.value ,
        femaleCompanion: female.value,
        customerId: dataScanned.value.mrm_id,
        type: "manual",
      },
      headers: {
        Authorization: "Bearer " +  auth.profile.token,
      },
    }).then((response) => {
      console.log(response.data.data);
      console.log(response.status);
      maleAdult.value = 0;
      female.value = 0;
      dialog.value = false;
      router.push({ path: '/scanner' })

    });
  } catch (e) {
    console.log(e);
  }
}else if(navigator.onLine == false){
     isOnline.value = true
 setTimeout(() => {
       isOnline.value = false
    }, "3000")
}
};
const numOnly= (id) => {
    // Get the element by id
    var element = document.getElementById(id);
    // Use numbers only pattern, from 0 to 9 with \-
    var regex = /[^0-9\-]/gi;
    // Replace other characters that are not in regex pattern
    element.value = element.value.replace(regex, "");
}
const isLetterAndNumber = (evt) => {
  console.log(evt.keyCode)

    if (evt.keyCode == 46 || evt.keyCode == 8)
        {
        //do nothing
        }
        else 
        {
            if (evt.keyCode < 48 || evt.keyCode > 57 ) 
            {
			    evt.preventDefault();	
			}	
        }
          const myInput = document.getElementById('number');
myInput.onpaste = e => {
  e.preventDefault();
}
    // let char = String.fromCharCode(evt.keyCode); // Get the character
    // if (/^[a-zA-Z0-9 ]*$/.test(char)) return true; // Match with regex 
    // else evt.preventDefault(); // If not match, don't add to input text
}
</script>