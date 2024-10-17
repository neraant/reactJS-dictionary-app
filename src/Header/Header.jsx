import { useEffect, useState } from 'react';
import bookIcon from '../assets/book_icon.svg';
import moonIcon from '../assets/moon_icon.svg';
import './Header.css';

function Header(){
	const [fontWrapper, setFontWrapper] = useState(false)
	const [font, setFont] = useState("Sans Serif")

	const toggleFontMenu = () => {
		// Переключаем состояние при клике
		setFontWrapper(prev => !prev); 
	};

	const handleFontMenuItems = (e) => {
		const selectedFont = e.target.innerHTML

		setFont(selectedFont)
		setFontWrapper(false)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			const dropdown = document.querySelector('.change__drop-down');
			if (dropdown && !dropdown.contains(event.target)) {
				setFontWrapper(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		document.body.classList.remove('body--sans-serif', 'body--serif', 'body--mono');

		if (font === 'Sans Serif') {
      document.body.classList.add('body--sans-serif');
    } else if (font === 'Serif') {
      document.body.classList.add('body--serif');
    } else if (font === 'Mono') {
      document.body.classList.add('body--mono');
    }
	}, [font])

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__inner'>
					<img src={bookIcon} alt='book' className='book-image' />
					
					<div className="active__wrapper">
						<div className="change__drop-down">
							<span onClick={toggleFontMenu} className="change__select">
								{font}
							</span>

							<div className={`change__options ${fontWrapper ? 'visible' : null}`}>
								<span onClick={handleFontMenuItems} className="change__option sans-serif">
									Sans Serif
								</span>

								<span onClick={handleFontMenuItems} className="change__option serif">
									Serif
								</span>

								<span onClick={handleFontMenuItems} className="change__option mono">
									Mono
								</span>
							</div>
						</div>

						<div className="vertical-divider"></div>

						<div className="theme-switch__wrapper">
							<label className="switch">
								<input type="checkbox" />
								<span className="slider round"></span>
							</label>

							<button className="change__color-theme">
								<img src={moonIcon} alt="change-color-theme" className="change__color-theme__image" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;