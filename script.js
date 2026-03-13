function submitLeave(){

let leaveType = document.getElementById("leaveType").value;
let startDate = document.getElementById("startDate").value;
let endDate = document.getElementById("endDate").value;
let reason = document.getElementById("reason").value;

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

alert("Leave Request Submitted");

window.location.href="employee-dashboard.html";
}

alert("Leave Request Submitted Successfully");


}
