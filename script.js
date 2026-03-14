const users=[

{
email:"nikesh@gmail.com",
password:"1234",
role:"employee",
name:"Nikesh",
balance:{vacation:12,sick:8,casual:6}
},

{
email:"rahul@gmail.com",
password:"1234",
role:"employee",
name:"Rahul",
balance:{vacation:10,sick:7,casual:5}
},

{
email:"priya@gmail.com",
password:"1234",
role:"employee",
name:"Priya",
balance:{vacation:15,sick:10,casual:7}
},

{
email:"manager@gmail.com",
password:"1234",
role:"manager",
name:"Manager"
}

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

if(user.role==="employee")
window.location="employee-dashboard.html";

if(user.role==="manager")
window.location="manager-dashboard.html";

}



function submitLeave(){

let type=document.getElementById("type").value;
let start=document.getElementById("start").value;
let end=document.getElementById("end").value;
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

window.location="employee-dashboard.html";

}



function loadEmployeeDashboard(){

let user=JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("vacation").innerText="Vacation Leave: "+user.balance.vacation;
document.getElementById("sick").innerText="Sick Leave: "+user.balance.sick;
document.getElementById("casual").innerText="Casual Leave: "+user.balance.casual;

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("myLeaveTable");

requests.forEach(function(r){

if(r.employee===user.name){

let row=table.insertRow();

row.innerHTML=
"<td>"+r.type+"</td>"+
"<td>"+r.start+"</td>"+
"<td>"+r.end+"</td>"+
"<td>"+r.status+"</td>";

}

});

}



function loadManagerDashboard(){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

let table=document.getElementById("managerTable");

requests.forEach(function(r,i){

let row=table.insertRow();

row.innerHTML=
"<td>"+r.employee+"</td>"+
"<td>"+r.type+"</td>"+
"<td>"+r.start+"</td>"+
"<td>"+r.end+"</td>"+
"<td>"+r.status+"</td>"+
"<td><button onclick='approveLeave("+i+")'>Approve</button></td>";

});

}



function approveLeave(i){

let requests=JSON.parse(localStorage.getItem("leaveRequests"))||[];

requests[i].status="Approved";

localStorage.setItem("leaveRequests",JSON.stringify(requests));

location.reload();

}
