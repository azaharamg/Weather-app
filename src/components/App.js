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

	const decideBackground = () => {
		if (typeof weather.main === 'undefined') {
			return '';
		}
		switch (weather.weather[0].main) {
			case 'Clear' || 'Sunny':
				return 'app-warm';
			case 'Rain':
				return 'app-rain';
			case 'Snow':
				return 'app-cold';
			case 'Clouds' || 'Mist' || 'Fog':
				return 'app-fog';
			default:
				return weather.main.temp > 16 ? 'app-warm' : 'app-cold';
		}
	};

	const outfitAdvice = () => {
		if (weather.weather[0].main === 'Rain') {
			return 'Do not forget your umbrella and your water boots';
		} else if (weather.main.temp < 6) {
			return 'You should wear warm clothes: coat, wool hat and gloves';
		} else if (weather.main.temp > 6 && weather.main.temp < 20) {
			return 'You should wear a coat and warm clothes';
		} else {
			return 'You should wear Spring clothing';
		}
	};

	return (
		<div className={`container ${decideBackground()}`}>
			<main className='main'>
				<div className='search-box'>
					<input
						type='text'
						className='search-bar'
						placeholder='Search current weather in...'
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
						<div className='advice-box'>
							<div className='oufit'>{outfitAdvice()}</div>
						</div>
					</div>
				) : (
					<h1 className='main-title'>What Should I Wear Today ?</h1>
				)}
			</main>
		</div>
	);
}

export default App;
