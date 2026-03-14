const users = [
{
email:"nikesh@gmail.com",
password:"1234",
role:"employee",
name:"Nikesh",
leaveBalance:{
vacation:12,
sick:8,
casual:6
}
},

{
email:"rahul@gmail.com",
password:"1234",
role:"employee",
name:"Rahul",
leaveBalance:{
vacation:10,
sick:7,
casual:5
}
},

{
email:"priya@gmail.com",
password:"1234",
role:"employee",
name:"Priya",
leaveBalance:{
vacation:15,
sick:10,
casual:7
}
},

{
email:"manager@gmail.com",
password:"1234",
role:"manager",
name:"Manager"
}
];const users=[
{email:"nikesh@gmail.com",password:"1234",role:"employee",name:"Nikesh"},
{email:"rahul@gmail.com",password:"1234",role:"employee",name:"Rahul"},
{email:"priya@gmail.com",password:"1234",role:"employee",name:"Priya"},
{email:"manager@gmail.com",password:"1234",role:"manager",name:"Manager"}
];

function loginUser(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let user=users.find(u=>u.email===email && u.password===password);

if(!user){
alert("Invalid Login");
return;
}

localStorage.setItem("currentUser",JSON.stringify(user));

if(user.role==="employee"){
window.location.href="employee-dashboard.html";
}

if(user.role==="manager"){
window.location.href="manager-dashboard.html";
}

}
function submitLeave(){

let type=document.getElementById("leaveType").value;
let start=document.getElementById("startDate").value;
let end=document.getElementById("endDate").value;
let reason=document.getElementById("reason").value;

let user=JSON.parse(localStorage.getItem("currentUser"));

let request={
employee:user.name,
type:type,
start:start,
end:end,
reason:reason,
status:"Pending"
};

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests.push(request);

localStorage.setItem("leaveRequests",JSON.stringify(requests));

alert("Leave Submitted");

window.location.href="employee-dashboard.html";

}



function loadEmployeeDashboard(){

let user=JSON.parse(localStorage.getItem("currentUser"));

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("myLeaveTable");

requests.forEach(function(req){

if(req.employee===user.name){

let row=table.insertRow();

row.innerHTML=
"<td>"+req.type+"</td>"+
"<td>"+req.start+"</td>"+
"<td>"+req.end+"</td>"+
"<td>"+req.status+"</td>";

}

});

}



function loadManagerDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("managerTable");

requests.forEach(function(req,index){

let row=table.insertRow();

row.innerHTML=
"<td>"+req.employee+"</td>"+
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
