import { ToastContainer, toast } from 'react-toastify'
import { ethers } from "ethers"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import web3ModalContext from "../context/web3ModalContext"
import iWeb3Modal from "../interfaces/iWeb3Modal"
import { truncateWalletAddress } from '../helpers'

interface IHeaderProps {
  isWalletConnected: boolean, 
  setIsWalletConnected: Dispatch<SetStateAction<boolean>>,
  walletAddress: string, 
  setWalletAddress: Dispatch<SetStateAction<string>>,
  owner: string, 
  setOwnner: Dispatch<SetStateAction<string>>
}
const Header = ({
  isWalletConnected, setIsWalletConnected,
  walletAddress, setWalletAddress,
  owner, setOwnner
}: IHeaderProps) => {
  const web3ModalRef = useContext<{current: iWeb3Modal} | null>(web3ModalContext)
  
  const connectWallet = async() => {
    try {
      if(web3ModalRef) {
        const instance = await web3ModalRef.current.connect()
        const provider:ethers.providers.Web3Provider = new ethers.providers.Web3Provider(instance);
        const signer:ethers.providers.JsonRpcSigner = provider.getSigner();
  
        const address:string = await signer.getAddress()
  
        const network:ethers.providers.Network = await provider.getNetwork()
  
        if(network.name === process.env.NEXT_PUBLIC_NETWORK) {
          setIsWalletConnected(true)
          setWalletAddress(address)
  
          toast.success("Wallet connected")
        } else {
          toast.error("Set your network to the rinkeby test network")
        }
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  const disConnectWallet = async() => {
    if(web3ModalRef) {
      await web3ModalRef.current.clearCachedProvider()

      setIsWalletConnected(false)
      setWalletAddress('')

      toast.success("Wallet disconnected")
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='flex justify-center sm:justify-between md:items-center flex-wrap'>
        <h1 className="text-6xl font-bold text-sky-600">
          Zazoo
        </h1>
        {!isWalletConnected ? 
            <div className='flex sm:inline-flex justify-center w-full sm:w-fit items-center flex-wrap mt-2 sm:mt-0'>
              <button onClick={connectWallet}
                className='mt-4 sm:mt-0 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
              >
                Connect Wallet
              </button> 
            </div> :
            <div className='flex sm:inline-flex justify-center sm:justify-between w-full sm:w-fit items-center flex-wrap mt-2 sm:mt-0'> 
              <span className='mt-2 sm:mr-3 w-full sm:w-fit text-center'>{truncateWalletAddress(walletAddress)}</span>
              <button onClick={disConnectWallet}
                className='mt-2 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
              >
                Disconnect Wallet
              </button>
            </div>
        }
      </div>
    </>
  )
}

export default Header
