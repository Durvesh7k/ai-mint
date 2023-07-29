import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers';
import { sampleText } from '../data/sample-text';
import Spinner from 'react-bootstrap/Spinner';
import NFT from '../abis/NFT.json'
import config from '../config.json';
import { useContext } from 'react';
import { DataContext } from '../context/DataContxetProvider';
import { getRecord, saveNewRecord } from '../api/api.js';
import { Configuration, OpenAIApi } from 'openai';


function NftMint({ white }) {
  const NFT_STORAGE_API_KEY = process.env.REACT_APP_NFT_STORAGE_API_KEY;
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


  const [provider, setProvider] = useState(null)
  const [nft, setNFT] = useState(null)

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 20);
  }

  const { account, setAccount } = useContext(DataContext)

  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [url, setURL] = useState(null)
  const [urlImage, setUrlImage] = useState(null)
  const [message, setMessage] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    const nft = new ethers.Contract(config[network.chainId].nft.address, NFT, provider)
    setNFT(nft)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (description === "") {
      window.alert("Please provide a description")
      return
    }

    setIsWaiting(true)

    // Call AI API to generate a image based on description
    const imageData = await openImage()

    const url = await uploadImage(imageData)
    setUrlImage(url)

    setIsWaiting(false)
    setMessage("")
    window.alert("Image is successfully uploaded to ipfs...")
  }


  const uploadImage = async (imageData) => {

    try {
      setMessage("Uploading Image...")

      // Create instance to NFT.Storage
      const nftstorage = new NFTStorage({ token: `${NFT_STORAGE_API_KEY}` })

      // Send request to store image
      const { ipnft } = await nftstorage.store({
        image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
        name: "ai-generated-nft",
        description: description,
      })

      // Save the URL
      const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
      setURL(url)

      return url
    }
    catch (e) {
      console.log(e)
    }
  }

  const mintImage = async (tokenURI) => {
    setMessage("Waiting for Mint...")

    const signer = await provider.getSigner()
    const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("1", "wei") })
    await transaction.wait()
  }


  const configuration = new Configuration({
    apiKey: `${OPENAI_API_KEY}`,
  });


  const openai = new OpenAIApi(configuration);

  //function to generate the images using open ai API
  const openImage = async () => {

    try {
      const response = await openai.createImage({
        prompt: `${description} hdimage`,
        n: 1,
        size: "512x512",
      });
      const image_url = response.data.data[0].url;
      setImage(image_url)
      // console.log(image_url);
      return response.data.data[0];

    }
    catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }


  const handelMintImage = async () => {
    await mintImage(urlImage);
    setMessage("Waiting for the mint...")
    window.alert("Nft minted successfully")
  }

  useEffect(() => {
    loadBlockchainData()
    setDescription(sampleText[getRandomNumber()].prompt);
  }, [])



  //function to connect wallet
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
  
    } catch (error) {
      console.log(error);
      alert("Metamask not installed")

    }

  }


  const saveRecord = () => {
    const record = {
      description: description,
      date: new Date(),
      account: account
    }

    saveNewRecord(record)
  }



  return (
    <div className={white ? `bg-white  flex justify-center font-joseph text-black` : `bg-black font-joseph flex justify-center text-white`}>
      <div className='flex h-[45rem] md:h-max  w-[18rem] md:w-[25rem] flex-col mt-10 mb-10'>
        <div className='text-2xl  font-semibold leading-10'>
          <p>Bring your creativity here and turn it into nfts!</p>
        </div>
        <div
          className={white
            ? `border-dotted border-2 border-black rounded-sm h-[18rem] md:h-[25rem]  mt-4`
            : `border-dotted border-2  rounded-sm h-[18rem] md:h-[25rem]  mt-4`
          }>
          {!isWaiting && image ? (
            <img className='image_genrated' src={image} alt="AIimage" />
          ) : isWaiting ? (
            <div className="flex h-[100%] justify-center items-center">
              <Spinner animation="border" variant={white ? `dark` : `light`} />
              <p>{message}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={submitHandler} className="flex flex-col mt-4">
          <div>
            <button
              type='submit'
              className={white
                ? `bg-yellow-500 font-semibold h-10 hover:bg-yellow-600 border-black text-black p-2 rounded-md w-full`
                : `bg-yellow-500 font-semibold h-10 hover:bg-yellow-600 text-black p-2 rounded-md w-full`
              }
              onClick={() => {
                openImage()
                account ? saveRecord() : console.log("Connect the account")
              }}
            >
              Generate
            </button>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            className={white
              ? `mt-2 p-2 outline-none bg-transparent border-black font-semibold text-black border-dotted border-2 rounded-sm `
              : `mt-2 p-2 outline-none bg-transparent text-white border-dotted border-2 rounded-sm `}
            rows={3} cols={40}
            name="post" type="text"
            placeholder="Create a description..."
          />
        </form>
        <div className='mt-3 font-semibold flex gap-3'>
          <button
            className={white
              ? `w-1/2 border-dotted border-black border-2 rounded-sm h-10 bg-slate-400 `
              : `w-1/2 border-dotted border-2 rounded-sm h-10 `
            }
            onClick={() => connectHandler()}
          >
            {account ? (
              <span>connected 🟢</span>
            ) : (
              <span>connect wallet</span>
            )}
          </button>
          <button
            className={white
              ? `w-1/2 border-dotted border-black border-2 rounded-sm h-10 bg-slate-400 `
              : `w-1/2 border-dotted border-2 rounded-sm h-10 `
            }
            onClick={handelMintImage}>
            Mint
          </button>
        </div>
        {!isWaiting && url && (
          <p className='mt-4'>
            View&nbsp;<a className='text-sky-600' href={url} target="_blank" rel="noreferrer">Metadata</a>
          </p>
        )}

        <div className='text-lg mt-4 justify-center flex'>
          <p>Leave a ⭐ on <a className='text-sky-600' href='https://github.com/durvesh7k/ai-mint'>github</a></p>
        </div>
      </div>
    </div>
  );
}

export default NftMint;
