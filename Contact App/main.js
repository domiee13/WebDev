//Get element by Id
var display = document.getElementById("display");
var inputName = document.getElementById("inputName");
var inputPhoneNum = document.getElementById("inputPhoneNum");
var addBtn = document.getElementById("addBtn");
var searchInput = document.getElementById('searchBox');
var item = document.getElementById("item");

//
var data = [];
var storageKey = "contacts";
var stringData = localStorage.getItem(storageKey);

//Get data from storage
if(stringData){
	data = JSON.parse(stringData);
}
else{
	data = [];
}

//
function Contact(name,phoneNum){
	this.name = name;
	this.phoneNum = phoneNum;
}
//Add event listener
addBtn.addEventListener('click',addContact);
display.addEventListener('click',delContact);
searchInput.addEventListener('keyup',filterData)
function filterData(){
	var val = searchInput.value;
	var foundData = data.filter(function(item){
		return item.name.includes(val);
	});
	render(foundData);
};
//Error
// function filterData(){
// 	var val = searchBox.value;//SAI O CHO SEARCH BOX
// 	var foundData = data.filter(function(item){
// 		return item.name.includes(val);
// 	});
// 	render(foundData);
// 	console.log(searchBox.value);
// }
// Add contact function

function addContact(){
	var name = inputName.value;
	var phoneNum = inputPhoneNum.value;
	var newContact = new Contact(name,phoneNum);
	data.push(newContact);
	inputName.value = "";
	inputPhoneNum.value = "";
	//Update data
	localStorage.setItem(storageKey,JSON.stringify(data));
	render(data);
}

//Render function
function render(items){
	var content = [];
	content = items.map(function(item,index){
		return '<li id="item">' + item.name + ' ___________ ' + item.phoneNum 
		+'        <button id="deleteBtn" data-id=' +index +'>Delete</button>' + '</li>' ;
	});
	display.innerHTML = '<ul>' + content.join("") + '</ul>';
}

//Delete function

function delContact(event){
	var button = event.target;
	var i = JSON.parse(button.dataset.id);
	data.splice(i,1);
	render(data);
	//Update data
	localStorage.setItem(storageKey,JSON.stringify(data));
}

//Filter Data function

render(data);

//Error
// function filterData(){
// 	var val = searchBox.value;
// 	var foundData = data.filter(function(item){
// 		return item.name.includes(val);
// 	});
// 	render(foundData);
// 	console.log(searchBox.value);
// }