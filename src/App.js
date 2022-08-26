import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Vault from './Pages/Vault';
import Home from './Pages/Home';
import Mechanism from './Pages/Mechanism';
import IDO from './Pages/IDO';
import Community from './Pages/Community';

export let savedAcc;
let currentAccount = null;
let isChainOKT = null;

function App() {
  let BUSDContract = "0xfA260530F04F81025FA18Fd8F4211c5FA9161B37";

  const [walletAddress, setWalletAddress] = useState("");
  switchEthereumChain();
  /*-----------Wallet Connection Settings------------*/
  /*-----------Wallet Connection Settings------------*/
  /*-----------Wallet Connection Settings------------*/
  async function switchEthereumChain() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x42' }],
      }).then(isChainOKT = true)
    } catch (e) {
      isChainOKT = false;
      alert("Please change the chain to OKC");
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x42',
                chainName: 'OKC',
                nativeCurrency: {
                  name: 'OKC Mainnet',
                  symbol: 'OKT', // 2-6 characters long
                  decimals: 18
                },
                blockExplorerUrls: ['https://www.oklink.com/okexchain/'],
                rpcUrls: ['https://exchainrpc.okex.org/'],
              },
            ],
          });
        }
        catch (addError) {
          alert("Please change the chain to OKC");
          console.log(addError);
        }
      }
    }
  }

  async function requestAccount() {
    console.log('Requesting account...');
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      currentAccount = accounts[0];
      savedAcc = accounts[0];
    } catch (error) {
      console.log('error connecting');
    }

    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected');
    } else {
      console.log('not detected');
      alert("Please Install Metamask");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      document.getElementById("balance-btn").hidden = false;

      let lengthAcc = currentAccount.length;
      btnConnect.innerText = currentAccount.substring(0, 4) + "..." + currentAccount.substring(lengthAcc - 4, lengthAcc);
      getAccBalance();
      alert("Wallet connected successfully!");
    } else {
      alert("Please install an injected Web3 wallet");
    }
  }

  async function getAccBalance() {
    let inputData = "0x70a08231000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let accBalance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: BUSDContract,
        data: inputData,
      },
        "latest"
      ]
    });
    console.log("accBalance" + accBalance);
    var balanceDEC = Number(accBalance).toString(10);
    console.log("balanceDEC" + balanceDEC);
    var actual;
    var CAbalance = document.getElementById("ACCBUSDBalance");

    let lastTwoDigit = balanceDEC.toString(10).substring(balanceDEC.length - 2, balanceDEC.length);
    if (Number(lastTwoDigit) < 21) {
      actual = balanceDEC / Math.pow(10, 18);
      actual = actual.toString().substring(0, 5);
    } else {
      //After knowing the power of the balance, calculate the balance that is larger than 0
      let largerThan0 = Number(lastTwoDigit) - 18;
      let firstDigit;
      let firstDigitStr = balanceDEC.substring(0, 2 + largerThan0);

      if (firstDigitStr.includes(".")) {
        if (firstDigitStr.indexOf("e") < 0) {
          firstDigit = Number(balanceDEC.substring(0, 2 + largerThan0));
        } else if (firstDigitStr.indexOf("e") < 2 + largerThan0) {
          firstDigit = balanceDEC.substring(0, firstDigitStr.indexOf("e"));
        } else {
          firstDigit = Number(balanceDEC.substring(0, 2 + largerThan0));
        }
      } else {
        firstDigit = firstDigitStr.substring(0, firstDigitStr.indexOf("e"));
      }
      actual = firstDigit * Math.pow(10, largerThan0);
    }
    var balanceBtn = document.getElementById("balance-btn");
    balanceBtn.innerText = actual.toString() + " BUSD";
    CAbalance.innerText = actual.toString();
  }



  return (
    <div className="App">
      <button id="balance-btn" hidden>
        balance
      </button>
      <button id="connect-btn" onClick={connectWallet}>
        Connect Wallet
      </button>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/vault' element={<Vault />} />
          <Route path='/IDO' element={<IDO />} />
          <Route path='/community' element={<Community />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
