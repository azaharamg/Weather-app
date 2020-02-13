import React from 'react';
import '../stylesheet/app.css';

const api = {
	key: 'your-apiKey',
	base: 'api.openweathermap.org/data/2.5/'
};

function App() {
	const dateBuilder = currentDay => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let day = days[currentDay.getDay()];
		let date = currentDay.getDate();
		let month = months[currentDay.getMonth()];
		let year = currentDay.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div className='app'>
			<main className='main-container'>
				<form className='search-box'>
					<input type='text' className='search-bar' placeholder='Search...' />
				</form>
				<div className='location-box'>
					<div className='location'>Madrid</div>
					<div className='date'>{dateBuilder(new Date())}</div>
				</div>
				<div className='weather-box'>
					<div className='temp'>15ºC</div>
					<div className='weather'>Sunny</div>
				</div>
			</main>
		</div>
	);
}

export default App;
