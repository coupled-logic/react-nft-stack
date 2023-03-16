import Web3 from 'web3'
// import {
//   setAlert,
  // setGlobalState,
  // getGlobalState,
  // setLoadingMsg,
// } from './store'
import { useGlobalState } from '../GlobalState';
import Adulam from './abis/Adulam.json'

const { ethereum } = window
// const BASE_URI = 'https://cors-anywhere.herokuapp.com/https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/';
const BASE_URI = 'https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/'

export function useAdulam() {
  const [loading, setLoadingMsg] = useState(false);
  const [error, setAlert] = useState(null);
  const [connectedAccount, setConnectedAccount] = useGlobalState('connectedAccount');
  const [nfts, setNfts] = useGlobalState('nfts');
  const [contract, setContract] = useGlobalState('contract');

  useEffect(() => {
    loadWeb3();
  }, []);

const payForArt = async (art) => {
  try {
    const web3 = window.web3
    const buyer = art.buyer
    const title = art.title
    const description = art.description
    const cost = web3.utils.toWei('0.01', 'ether')
    const [setContract] = useGlobalState('contract');
    // const contract = await getGlobalState('contract')
    setLoadingMsg('NFT minting in progress...')

    await setContract.methods
    // await contract.methods
      .payToMint(title, description)
      .send({ from: buyer, value: cost })

    setLoadingMsg('Minting successful...')

    return true
  } catch (error) {
    setAlert(error.message, 'red')
  }
}

const connectWallet = async () => {
  const [setConnectedAccount] = useGlobalState('connectedAccount');
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setConnectedAccount(accounts[0]);
    // setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const loadWeb3 = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    window.web3 = new Web3(ethereum)
    // await ethereum.enable()
    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setConnectedAccount(accounts[0]);
    // setGlobalState('connectedAccount', accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = Adulam.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(Adulam.abi, networkData.address)
      const nfts = await contract.methods.getAllNFTs().call()
      setNfts(structuredNfts(nfts));
      // setGlobalState('nfts', structuredNfts(nfts))
      setContract(contract);
      // setGlobalState('contract', contract)
    } else {
      window.alert('Adulam contract not deployed to detected network.')
    }
  } catch (error) {
    alert('Please connect your metamask wallet!')
  }
}

const structuredNfts = (nfts) => {
  const web3 = window.web3
  return nfts
    .map((nft) => ({
      id: nft.id,
      to: nft.to,
      from: nft.from,
      cost: web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

// export { useAdulam };
// export { loading, error, connectedAccount, nfts, contract, useAdulam, loadWeb3, connectWallet, payForArt, BASE_URI }
// export { loadWeb3, connectWallet, payForArt, BASE_URI }

// const loadWeb3 = async () => {
//   try {
//     if (!ethereum) return alert('Please install Metamask')

//     window.web3 = new Web3(ethereum)

//     window.web3 = new Web3(window.web3.currentProvider)

//     const web3 = window.web3
//     const accounts = await web3.eth.getAccounts()
//     setGlobalState('connectedAccount', accounts[0])

//     const networkId = await web3.eth.net.getId()
//     const networkData = Adulam.networks[networkId]

//     if (networkData) {
//       const contract = new web3.eth.Contract(Adulam.abi, networkData.address)
//       const nfts = await contract.methods.getAllNFTs().call()

//       setGlobalState('nfts', structuredNfts(nfts))
//       setGlobalState('contract', contract)
//     } else {
//       window.alert('Adulam contract not deployed to detected network.')
//     }
//   } catch (error) {
//     alert('Please connect your metamask wallet!')
//   }
// }
