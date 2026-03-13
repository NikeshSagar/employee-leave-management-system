// LOGIN FUNCTION

function loginUser(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(email==="employee@gmail.com" && password==="1234"){
window.location.href="employee-dashboard.html";
}

else if(email==="manager@gmail.com" && password==="1234"){
window.location.href="manager-dashboard.html";
}

else{
alert("Invalid login credentials");
}

}



// SUBMIT LEAVE REQUEST

function submitLeave(){

let leaveType=document.getElementById("leaveType").value;
let startDate=document.getElementById("startDate").value;
let endDate=document.getElementById("endDate").value;
let reason=document.getElementById("reason").value;

if(!leaveType || !startDate || !endDate || !reason){
alert("Please fill all fields");
return;
}

let leaveRequest={
type:leaveType,
start:startDate,
end:endDate,
reason:reason,
status:"Pending"
};

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests.push(leaveRequest);

localStorage.setItem("leaveRequests",JSON.stringify(requests));

alert("Leave request submitted successfully");

window.location.href="employee-dashboard.html";

}



// LOAD EMPLOYEE DASHBOARD DATA

function loadEmployeeDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("myLeaveTable");

if(!table) return;

table.innerHTML=`
<tr>
<th>Leave Type</th>
<th>Start Date</th>
<th>End Date</th>
<th>Status</th>
</tr>
`;

let vacation=12;
let sick=5;

requests.forEach(function(req){

let row=table.insertRow();

row.innerHTML=
"<td>"+req.type+"</td>"+
"<td>"+req.start+"</td>"+
"<td>"+req.end+"</td>"+
"<td>"+req.status+"</td>";

if(req.status==="Approved"){

let start=new Date(req.start);
let end=new Date(req.end);

let days=(end-start)/(1000*60*60*24)+1;

if(req.type==="Vacation"){
vacation-=days;
}

if(req.type==="Sick Leave"){
sick-=days;
}

}

});

let vac=document.getElementById("vacationBalance");
let sk=document.getElementById("sickBalance");

if(vac) vac.innerText="Vacation Days: "+vacation;
if(sk) sk.innerText="Sick Leave: "+sick;

}



// LOAD MANAGER DASHBOARD

function loadManagerDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("managerTable");

if(!table) return;

table.innerHTML=`
<tr>
<th>Leave Type</th>
<th>Start</th>
<th>End</th>
<th>Status</th>
<th>Action</th>
</tr>
`;

requests.forEach(function(req,index){

let row=table.insertRow();

row.innerHTML=
"<td>"+req.type+"</td>"+
"<td>"+req.start+"</td>"+
"<td>"+req.end+"</td>"+
"<td>"+req.status+"</td>"+
"<td><button onclick='approveLeave("+index+")'>Approve</button></td>";

});

}



// APPROVE LEAVE

function approveLeave(index){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests[index].status="Approved";

localStorage.setItem("leaveRequests",JSON.stringify(requests));

location.reload();

}

