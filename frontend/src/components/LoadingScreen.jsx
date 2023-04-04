import React from 'react'
import './load.css'

const LoadingScreen = () => {
  return (
    <main>
	<div className="preloader">
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
	</div>
	<div className="status">Loading<span className="status__dot">.</span><span className="status__dot">.</span><span className="status__dot">.</span></div>
</main>
  )
}

export default LoadingScreen