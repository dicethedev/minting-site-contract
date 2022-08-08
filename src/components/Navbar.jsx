import React from 'react'
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from '../assets/social-media-icons/facebook_32x32.png';
import Twitter from '../assets/social-media-icons/twitter_32x32.png';
import Gmail from '../assets/social-media-icons/email_32x32.png';

const Navbar = ({ accounts, setAccounts }) => {
      //@dev - this will point to the address of the wallet
     const isConnected = Boolean(accounts[0]);

     async function connectAccount() {
          //@dev - window.ethereum inject the Metamask wallet of the browser
        if (window.ethereum) {
          //connection to Metamask wallets
           const accounts = await window.ethereum.request({
               method: 'eth_requestAccounts',
           });
           //@dev - check out App.js where useState was pass into the project
           setAccounts(accounts);
        }
     }
  return (
    <Flex justify="space-between" align="center" padding="30px">
     {/* Left hand side */}
     <Flex justify="space-around" width="40%" padding="0 75px">
      <Link>
      <Image src={Facebook} boxSize="42px" margin="0 15px" />
      </Link>
        <Link>
      <Image src={Twitter} boxSize="42px" margin="0 15px" />
      </Link>
        <Link>
      <Image src={Gmail} boxSize="42px" margin="0 15px" />
      </Link>
     </Flex>
        {/* Right hand side - sections & connect */}
        <Flex justify="space-between" align="center" padding="30px" width="40%" >
          <Box margin="0 15px">About</Box>
          <Box margin="0 15px">Mint</Box>
          <Box margin="0 15px">Team</Box>
          <Spacer />
          
           {/* connect */}
           {isConnected ? (
             <Box margin="0 15px">Connected</Box>
           ) : (
             <Button
             backgroundColor="#D6517D"
             borderRadius="5px"
             boxShadow="0px 2px 2px 1px #0F0F0F"
             color="#fff"
             cursor="pointer"
             fontFamily="inherit"
             padding="15px"
             margin="0 15px"
              onClick={connectAccount}>Connect</Button>
           )}
        </Flex>
    </Flex>
  )
}

export default Navbar