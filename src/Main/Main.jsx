import { useRef, useState } from 'react';
import searchIcon from '../assets/search_icon.svg';
import './Main.css';

function Main(){
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const [emptyInput, setEmptyInput] = useState(false)
	const audioRef = useRef(null)

	const defaultNounDefenitions = [
		"(etc.) A set of keys used to operate a typewriter, computer etc.",
		"A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.",
		"A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device."
	]
	const defaultVerbDefenitions = [
		"To type on a computer keyboard."
	]

	const handlePlayAudio = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const getAudioSrc = () => {
    if (data && data[0]) {
        const audioSource = data[0].phonetics.find(phonetic => phonetic.audio);
        return audioSource ? audioSource.audio : "https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3";
    }
    return "https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3";
};

	const handleInputClick = () => {
		const inputValue = document.getElementById('wordInput');

		if(inputValue.value === '')
		{
			setEmptyInput(true)
			inputValue.style.outline = '1px solid var(--red-color)';
    	
			return;
		}
		else{
			setEmptyInput(false)
			inputValue.style.outline = 'none';
		}

		fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue.value}`)
		.then(response => {
			if(!response.ok){
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			setData(data)
			setLoading(false)
		})
		.catch(error => {
			setError(error.message)
			setLoading(false)
		})
	};
	
	// if (loading) return (
	// 	<div className='container'>
	// 		<p>Loading...</p>
	// 	</div>
	// );

  // if (error) return (
	// 	<div className='container'>
	// 		<p>Error: {error}</p>
	// 	</div>
	// ) 

	return (
		<main className="main">
				<section className="word-defenition__wrapper">
					<div className="container">
						<div className="word-defenition__wrapper__inner">
							<div className="input__wrapper">
								<input type="text" className="word-input" id="wordInput" />
								<span className={`error-text ${emptyInput ? "visible" : ""}`}>Whoops, can’t be empty…</span>
								
								<button className="search-btn" onClick={handleInputClick}>
									<img src={searchIcon} alt="search" className="search-image" />
								</button>
							</div>

							<div className="word-info__wrapper">
								<div className="word-info__text">
									<h1 className="word-info__title">
										{data == null ? "keyboard" : data[0].word}
									</h1>

									<h3 className="word-info__transcription">
										{data == null ? "/ˈkiːbɔːd/" : data[0].phonetic}
									</h3>
								</div>

								<div className="word-info__audio">
										<audio ref={audioRef} src={getAudioSrc()} />
										<button onClick={handlePlayAudio} className="play-btn"></button>
								</div>
							</div>

							<div className="noun__wrapper additional__wrapper">
								<h4 className="noun__title medium__title">
									noun
								</h4>

								<h6 className="small__title">
									Meaning
								</h6>

								<ul className="list noun-meaning-list">
										{data == null || !data[0].meanings[0]?.definitions ? 
												defaultNounDefenitions.map((item, index) => (
														<li key={index} className='list__item'>
																{item}
														</li>
												)) : data[0].meanings[0].definitions.map((item, index) => (
														<li key={index} className="list__item">
																{item.definition}
														</li>
												))}
								</ul>

								<div className="synonym__wrapper">
									<h6 className="small__title">
										Synonyms
									</h6>

									<p className="synonym__text">
											{data == null || !data[0].meanings[0]?.synonyms[0] ? 
													"electronic keyboard" : data[0].meanings[0].synonyms[0]}
									</p>
								</div>
							</div>

							<div className="verb__wrapper additional__wrapper">
								<h4 className="medium__title">
									verb
								</h4>

								<h6 className="small__title">
									Meaning
								</h6>

								<ul className="list verb-meaning-list">
										{data == null || !data[0].meanings[1]?.definitions ? 
												defaultVerbDefenitions.map((item, index) => (
														<li key={index} className='list__item'>
																{item}
														</li>
												)) : data[0].meanings[1].definitions.map((item, index) => (
														<li key={index} className="list__item">
																{item.definition}
														</li>
												))}
								</ul>

								<p className="verb-text">
										{data == null || !data[0].meanings[1]?.definitions[0] ? 
												null : data[0].meanings[1].definitions[0].example}
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
	);
}

export default Main