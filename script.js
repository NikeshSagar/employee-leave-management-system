// ======================
// LOGIN SYSTEM
// ======================

function loginUser(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(email === "employee@gmail.com" && password === "1234"){

window.location.href = "employee-dashboard.html";

}

else if(email === "manager@gmail.com" && password === "1234"){

window.location.href = "manager-dashboard.html";

}

else{

alert("Invalid login credentials");

}

}


// ======================
// CREATE LEAVE REQUEST OBJECT
// ======================

function createLeaveRequest(type,start,end,reason){

return {
employee:"Nikesh",
type:type,
start:start,
end:end,
reason:reason,
status:"Pending"
};

}


// ======================
// SUBMIT LEAVE REQUEST
// ======================

function submitLeave(){

let leaveType = document.getElementById("leaveType").value;
let startDate = document.getElementById("startDate").value;
let endDate = document.getElementById("endDate").value;
let reason = document.getElementById("reason").value;

if(!leaveType || !startDate || !endDate || !reason){

alert("Please fill all fields");
return;

}

// create leave object
let leaveRequest = createLeaveRequest(leaveType,startDate,endDate,reason);

// get existing requests
let requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

// add new request
requests.push(leaveRequest);

// save back to storage
localStorage.setItem("leaveRequests", JSON.stringify(requests));

alert("Leave Request Submitted Successfully");

}