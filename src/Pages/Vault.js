import React from 'react';
import './CSS/Vault.css';

function Vault() {

  return (
    <div className='vault'>
      <div className="table-Vault">
        <div className="table-top">
          BUSD JINKU
          <p>-Fulfill the price stabilization-</p>
        </div>
        <div className="table-bottom">
          <div className="row1">
            <div className="left">Vault Total</div>
            <div className="right">VaultBalanceFunction</div>
          </div>
          <div className="row2">
            <div className="left">Exchange Rate</div>
            <div className="right">getRateFunction</div>
          </div>
          <div className="row3">
            <div className="left">Make Exchange</div>
            <div className="right">
              <button>
                Make Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vault
