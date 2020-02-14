import React, { useState } from 'react';
import '../stylesheet/app.css';

const api = {
	key: 'your-api-key',
	base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = event => {
		if (event.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then(response => response.json())
				.then(result => {
					setQuery('');
					setWeather(result);
				});
		}
	};

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
		<div className={typeof weather.main != 'undefined' ? (weather.main.temp > 16 ? 'app-warm' : 'app') : 'app'}>
			<main className='main-container'>
				<div className='search-box'>
					<input
						type='text'
						className='search-bar'
						placeholder='Search...'
						value={query}
						onKeyPress={search}
						onChange={event => setQuery(event.target.value)}
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className='location-box'>
							<div className='location'>{weather.name}</div>
							<div className='date'>{dateBuilder(new Date())}</div>
						</div>
						<div className='weather-box'>
							<div className='temp'>{Math.round(weather.main.temp)}ºC</div>
							<div className='weather'>{weather.weather[0].main}</div>
							<div className='weather-details'>
								<div className='humidity'>Humidity {weather.main.humidity} %</div>
								<div className='wind'>Wind {weather.wind.speed} m/s</div>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
