 // Validating Empty Field
 function check_empty() {
     if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
         alert("Fill All Fields !");
     } else {
         document.getElementById('form').submit();
         alert("Form Submitted Successfully...");
     }
 }
 //Function To Display Popup
 function div_show() {
     document.getElementById('abc').style.display = "block";
 }

 function div_show1() {
     document.getElementById('abcde').style.display = "block";
 }

 function div_show2() {
     document.getElementById('abcdef').style.display = "block";
 }

 function div_show3() {
     document.getElementById('abcdefg').style.display = "block";
 }

 function div_show4() {
     document.getElementById('abcdefgh').style.display = "block";
 }
 //Function to Hide Popup
 function div_hide() {
     document.getElementById('abc').style.display = "none";
 }

 function div_hide1() {
     document.getElementById('abcde').style.display = "none";
 }

 function div_hide2() {
     document.getElementById('abcdef').style.display = "none";
 }

 function div_hide3() {
     document.getElementById('abcdefg').style.display = "none";
 }

 function div_hide4() {
     document.getElementById('abcdefgh').style.display = "none";
 }


 // ------------------skill form

 function check_empty() {
     if (document.getElementById('Skill').value == "") {
         alert("Fill All Fields !");
     } else {
         document.getElementById('form1').submit();
         alert("Form Submitted Successfully...");
     }
 }

 <
 /script>