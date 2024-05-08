export default function generateRandomText(textLength:number):string{
	let myText = "";
	let myArr = [];

	for(let i=1; i <= 122; i++){
		if(i >= 48 && i <= 57 ){myArr.push(String.fromCharCode(i));}
		if(i >= 65 && i <= 90 ){myArr.push(String.fromCharCode(i));}
		if(i >= 97 && i <= 122 ){myArr.push(String.fromCharCode(i));}
	}

	for(let i = 0; i < textLength; i++){
		myText = myText.concat(myArr[Math.floor(Math.random() * (myArr.length - 1))]);
	}

	return myText;
};