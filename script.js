const users = [
{email:"nikesh@gmail.com",password:"1234",role:"employee",name:"Nikesh"},
{email:"rahul@gmail.com",password:"1234",role:"employee",name:"Rahul"},
{email:"priya@gmail.com",password:"1234",role:"employee",name:"Priya"},
{email:"manager@gmail.com",password:"1234",role:"manager",name:"Manager"}
];
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
alert("Invalid login");
}

}



function submitLeave(){

let type=document.getElementById("leaveType").value;
let start=document.getElementById("startDate").value;
let end=document.getElementById("endDate").value;
let reason=document.getElementById("reason").value;

if(!type || !start || !end || !reason){
alert("Fill all fields");
return;
}

let request={
type:type,
start:start,
end:end,
reason:reason,
status:"Pending"
};

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests.push(request);

localStorage.setItem("leaveRequests",JSON.stringify(requests));

alert("Leave Request Submitted");

window.location.href="employee-dashboard.html";

}



function loadEmployeeDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("myLeaveTable");

if(!table) return;

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

let s=new Date(req.start);
let e=new Date(req.end);

let days=(e-s)/(1000*60*60*24)+1;

if(req.type==="Vacation"){vacation-=days}
if(req.type==="Sick Leave"){sick-=days}

}

});

document.getElementById("vacationBalance").innerText="Vacation Days: "+vacation;
document.getElementById("sickBalance").innerText="Sick Leave: "+sick;

}



function loadManagerDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("managerTable");

if(!table) return;

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



function approveLeave(index){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests[index].status="Approved";

localStorage.setItem("leaveRequests",JSON.stringify(requests));

location.reload();

}
