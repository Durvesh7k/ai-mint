import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers';
import "./Nftmint.css";


// Components
import Spinner from 'react-bootstrap/Spinner';

// ABIs
import NFT from './abis/NFT.json'

// Config
import config from './config.json';

import { Configuration, OpenAIApi } from 'openai';

function Nftmint() {
  const NFT_STORAGE_API_KEY= process.env.REACT_APP_NFT_STORAGE_API_KEY;
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


  const [provider, setProvider] = useState(null)
  const [nft, setNFT] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [url, setURL] = useState(null)
  const [urlImage, setUrlmage] = useState(null)

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

    if (name === "" || description === "") {
      window.alert("Please provide a name and description")
      return
    }

    setIsWaiting(true)

    // Call AI API to generate a image based on description
    const imageData = await openImage()

    const url = await uploadImage(imageData)
    setUrlmage(url)

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
        name: name,
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
    const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") })
    await transaction.wait()
  }


  const configuration = new Configuration({
    apiKey: `${OPENAI_API_KEY}`,
  });
  const openai = new OpenAIApi(configuration);
  const openImage = async (e) => {

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
    window.alert("Nft minted suceesfully")
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className='container'>
      <div className='mint__container'>
        <div className='create_mint'>
          <form onSubmit={submitHandler} className="form">
            <input className='form__input' type="text" placeholder="Create a name..." onChange={(e) => { setName(e.target.value) }} />
            <textarea rows={4} cols={40} name="post" type="text" placeholder="Create a description..." onChange={(e) => setDescription(e.target.value)} />
            <div className='form__buttons'>
              <input className='form__button' type="submit" value="Create" />
            </div>
          </form>
          <div className='mint__button'>
            <button className='form__button2' onClick={handelMintImage}>Mint</button>
          </div>
          {!isWaiting && url && (
            <p>
              View&nbsp;<a href={url} target="_blank" rel="noreferrer">Metadata</a>
            </p>
          )}
        </div>

        <div className='mint'>
          <div className="mint__image">
            {!isWaiting && image ? (
              <img className='image_genrated' src={image} alt="AI generated image" />
            ) : isWaiting ? (
              <div className="image__placeholder">
                <Spinner animation="border" variant='danger' />
                <p>{message}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>






      </div>


    </div>
  );
}

export default Nftmint;
