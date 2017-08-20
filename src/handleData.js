function updateLocalStorage(data) {
    localStorage.setItem('storedItem', JSON.stringify(data));
}

function checkKey(arr,key,value){
	for (var i = 0; i < arr.length; i++) {
    		if (arr[i][key]!==true && arr[i][key] !== false) {
    			arr[i][key] = value;
    		}
	 }
}

function convertData(data){
	for (var i = 0; i < data.length; i++) {
		if (data[i].fold!==true && data[i].fold !== false) {
			data[i].fold = true;
		}
	checkKey(data[i]["jobs"],"check",false);
	}
	checkKey(data,"check",false);
	return data;
}

function resetData(data){
	console.log(data[0]);
	data[0].check= true;
	data[0].jobs[0].check= true;
	data[0].jobs[2].check= true;
	data[0].jobs[3].check= true;
	data[2].jobs[0].check= true;
	data[2].check= true;
	data[2].fold= false;
	return data;
}

export {updateLocalStorage, convertData, resetData}
