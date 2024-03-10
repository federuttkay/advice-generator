const goGetCandies = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ candy: "sour keys", quantity: 10 });
		}, 2000);
	});
};

const sellCandies = (candyObj) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(25 * candyObj.quantity);
		}, 3000);
	});
};

const totalMoney = async () => {
	const candyObj = await goGetCandies();
	const total = await sellCandies(candyObj);
	console.log("Total money:", total);
};

// totalMoney();

goGetCandies()
	.then((res) => sellCandies(res))
	.then((total) => console.log(total));

console.log("1");
setTimeout(() => console.log("2"), 500);
console.log("3");
