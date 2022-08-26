import React from 'react';
import './CSS/Home.css';
import IDOButton from '../IDO.png';
import VaultButton from '../Vault.png';
import bgVid from "../JinKuBG.mp4";

function Home() {
  function visitIDOPage() {
    window.location = './IDO';
  }
  function visitVaultPage() {
    window.location = './Vault';
  }
  return (

    <><video autoPlay muted loop id="JinKuBG">
      <source src={bgVid} type="video/mp4" />
    </video>
    <div className='home'>
      <div className="homeMID">
        <p id="HomeTitle">JinKu <br /></p>
        <div className="HomeButton">
          <img src={IDOButton} onClick={visitIDOPage} className="HomeBut" />
          <img src={VaultButton} onClick={visitVaultPage} className="HomeBut" />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
