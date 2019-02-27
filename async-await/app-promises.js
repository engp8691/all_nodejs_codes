const users  = [{
	id: 1,
	name: 'Yonglin',
	schoolId: 111
},{
	id: 2,
	name: 'Marlyn',
	schoolId: 999
}];

const grades = [{
	id: 1,
	schoolId: 111,
	grade: 81
},{
	id: 2,
	schoolId: 999,
	grade: 100
},{
	id: 3,
	schoolId: 111,
	grade: 80
}];

const getUser = (id) => {
	return new Promise((resolve, reject)=>{
		const user = users.find((user)=>user.id === id);

		if(user){
			resolve(user);
		}else{
			reject(`Unable to find user with id of ${id}.`);
		}
	});
};

const getGrades = (schoolId)=>{
	return new Promise((resolve, reject)=>{
		resolve(grades.filter((grade) => grade.schoolId === schoolId));
	});
};

const getStatus = (userId) => {
	return getUser(userId).then((user)=>{
		if(user.schoolId){
			return getGrades(user.schoolId);
		}else{
			return new Promise((resolve, reject)=>{
				reject(`Unable to find user with id of ${userId}.`);
			});
		}
	}).then((grades)=>{
		let sum = 0;
		let average = 0;

		sum = grades.map((grade)=>{
			return grade.grade;
		}).reduce((s, a)=>{
			return s+a;
		});

		average = sum / grades.length;

		console.log(58, sum, average);

		return new Promise((resolve, reject)=>{
			resolve(average);
		});
	});
};

const getStatusAlt = async (userId)=>{
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);

	console.log(76, user);
	console.log(77, grades);

	let average = 0;
	if(grades.length > 0){
		let sum = 0;

		sum = grades.map((grade)=>{
			return grade.grade;
		}).reduce((s, a)=>{
			return s+a;
		});

		average = sum / grades.length;
	}

	return `${user.name} has a ${average} in the class.`;
};

getUser(1).then((user) => {
	console.log(user);
}).catch((e)=>{
	console.log(e);
});

getGrades(111).then((grades)=>{
	console.log(grades);
}).catch((e)=>{
	console.log(e);
});

getStatus(12).then((status)=>{
	 console.log(status);
}).catch((e)=>{
	console.log(e);
});

getStatusAlt(1).then((status)=>{
	console.log(98, status);
}).catch((e)=>{
	console.log(e);
});
