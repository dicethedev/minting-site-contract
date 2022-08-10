import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Image, Text, Input } from '@chakra-ui/react';
import diceverseNFT from '../DiceVerseNFT.json';

//confirm it here (https://rinkeby.etherscan.io/address/0xf483b9065a15ef22947BDcFbFb2Bb77C398512A8)
const diceverseNFTAddress = "0xf483b9065a15ef22947BDcFbFb2Bb77C398512A8";

const MainMint = ({ accounts, setAccounts }) => {
     //@dev - this will determine the number of quantity the user is selecting the NFTs
     const [mintAmount, setMintAmount] = useState(1);
     const isConnected = Boolean(accounts[0]);

     async function handleMint() {
        if(window.ethereum) {
          //@dev - provider is like the MetaMask Wallet
          //@dev - ethers serves a medium of connecting frontend to blockchain network
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract (
               diceverseNFTAddress,
               diceverseNFT.abi,
               signer
          ); 
          try {
               //@dev - res stand for reseponse and BigNumber from ether.js
              const res = await contract.mint(BigNumber.from(mintAmount), {
               //@dev mintprice * mintamount
                value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
              });
              console.log('response: ', res);
          } catch(err) {
               console.log("error: ", err )
          }
        }
     }

      const handleDecrement = () => {
          if(mintAmount <= 1) return;
          //@dev - mintAMount - 1 will decrease the value inside the useState() above
          setMintAmount(mintAmount - 1);
      };

         const handleIncrement = () => {
          if(mintAmount >= 3) return;
          //@dev - mintAMount - 1 will Increase the value inside the useState() above
          setMintAmount(mintAmount + 1);
      };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
     <Box width="520px">
          <div>
                 <Text fontSize="48px" textShadow="0 5px #00000">DiceVerse</Text>
               <Text fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #00000">DiceVerse is another planet of NFTs.
                They can be fire back-to-back on our planet! 
                Mint Diceverse now to find out!
                </Text>
          </div>
   
    {isConnected ? (
        <div>
          <Flex align="center" justify="center">
            <Button
             backgroundColor="#D6517D"
             borderRadius="5px"
             boxShadow="0px 2px 2px 1px #0F0F0F"
             color="#fff"
             cursor="pointer"
             fontFamily="inherit"
             padding="15px"
             margin="10px"
                 onClick={handleDecrement}>
                    -
             </Button>
               <Input
               readOnly
               width="100px"
               height="40px"
               paddingLeft="19px"
               textAlign="center"
               fontFamily="inherit"
               marginTop="10px" 
               type="number" 
               value={mintAmount} 
             />
               <Button 
             backgroundColor="#D6517D"
             borderRadius="5px"
             boxShadow="0px 2px 2px 1px #0F0F0F"
             color="#fff"
             cursor="pointer"
             fontFamily="inherit"
             padding="15px"
             margin="10px"
               onClick={handleIncrement}>
                    +
               </Button>
          </Flex>
          <Button 
               backgroundColor="#D6517D"
             borderRadius="5px"
             boxShadow="0px 2px 2px 1px #0F0F0F"
             color="#fff"
             cursor="pointer"
             fontFamily="inherit"
             padding="15px"
             margin="10px"
           onClick={handleMint}>Mint Now</Button>
        </div>
    ) : (
     <Text
     marginTop="70px"
     fontSize="30px"
     letterSpacing="-5.5%"
     fontFamily="VT323"
     textShadow="0 3px #00000"
     color="#D6517D"
     >Connect to Mint. Thank you!</Text>
    )}
    </Box>
    </Flex>
  )
}

export default MainMint