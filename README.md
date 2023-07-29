# AI Mint - AI NFT Minter Site

AI Mint is a web application that allows users to mint unique AI-generated images as NFTs (Non-Fungible Tokens). It leverages the DALL-E AI model from OpenAI to create these AI-generated images and utilizes Node.js with MongoDB for storing the history of user entries.

## Technologies Used

- DALL-E AI Model (OpenAI): The AI model responsible for generating unique images based on user inputs.
- Node.js: The backend technology used to handle user requests, communicate with the AI model, and store data in MongoDB.
- MongoDB: A NoSQL database used to persist the history of user-generated images.
- Solidity: The programming language for creating smart contracts.
- Hardhat: A development environment to build, deploy, and test the Ethereum smart contracts.

## Features

- AI Image Generation: Users can input text descriptions, and the DALL-E AI model will generate unique images based on those descriptions.
- NFT Minting: Generated images are minted as NFTs on the Ethereum blockchain using a smart contract.
- History Tracking: User entries and corresponding generated images are stored in a MongoDB database for future reference.
- Smart Contract: The Ethereum smart contract is developed using Solidity and Hardhat, allowing seamless integration with the AI Mint frontend.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/durvesh7k/ai-mint.git`
2. Install dependencies: `npm install`
3. Configure MongoDB: Update the MongoDB connection string in the `.env` file.
4. Set up the Ethereum network: Install Hardhat and create a `.env` file with your Ethereum wallet private key and endpoint.
5. Start the application: `npm start`

## Smart Contract

The smart contract code can be found in the `contracts` directory. To compile and deploy the contract, follow these steps:

1. Go to the project root directory and run: `npx hardhat compile` to compile the contract.
2. Use the appropriate network with Hardhat to deploy the contract: `npx hardhat run scripts/deploy.js --network <network-name>`

**Note**: Replace `<network-name>` with the desired Ethereum network (e.g., `rinkeby`, `mainnet`, etc.)

## Screenshots

![aimint-img-1](https://github.com/Durvesh7k/ai-mint/assets/113430857/890cb98e-a42f-47c1-b2ab-dd67765cdac6)

![aimint-img-2](https://github.com/Durvesh7k/ai-mint/assets/113430857/da12855a-6676-4169-9052-e42b011bc547)

![aimint-img-3](https://github.com/Durvesh7k/ai-mint/assets/113430857/c8a8207b-1e36-452a-8e9e-4176e010bee3)


## License

[MIT License](LICENSE)

