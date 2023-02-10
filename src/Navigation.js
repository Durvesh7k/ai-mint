import { ethers } from 'ethers';
import "./Navigation.css"

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <div className='navigation__container'>
            <div>
                <h1 className='navigation__heading'>AI_Mint</h1>
            </div>

            {account ? (
                <button
                    className='connect_wallet'
                    type="button"
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='connect_wallet'
                    onClick={connectHandler}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default Navigation;