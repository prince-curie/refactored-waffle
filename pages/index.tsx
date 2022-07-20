import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import { injectStyle } from 'react-toastify/dist/inject-style'
import Header from '../components/Header'
import iWeb3Modal from '../interfaces/iWeb3Modal'
import { Web3ModalProvider } from '../context/web3ModalContext'
import Footer from '../components/Footer'
import Vendor from '../components/Vendor'

const Home: NextPage = () => {
  
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [owner, setOwnner] = useState<string>("")
  const [amount, setAmount] = useState<number>()

  const web3ModalRef = useRef<iWeb3Modal | null>(null)

  const buyToken = () => {

  }

  const sellToken = () => {
    
  }

  const getOwner = () => {
    
  }

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      // network: "rinkeby",
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURAID
          }
        }
      }
    })

    injectStyle()
  }, [isWalletConnected])

  return (
    <div className="flex min-h-screen flex-col md:justify-center md:items-center py-2">
      <Web3ModalProvider value={web3ModalRef}>
        <Head>
          <title>Zazoo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col px-20">
          <Header 
            isWalletConnected = {isWalletConnected} 
            setIsWalletConnected = {setIsWalletConnected}
            walletAddress = {walletAddress} 
            setWalletAddress = {setWalletAddress}
            owner = {owner} 
            setOwnner = {setOwnner}
          />
          <p className="mt-5 sm:mt-24 text-2xl text-center">
            Zazoo is your one-stop hub for all your favourite products and services.
          </p>

          {isWalletConnected && 
            <>
              <form className='flex my-8 mx-auto flex-col border-l-black rounded-md w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12'>
                <label htmlFor="Input Amount of Token" className='mt-4'>Amount</label>
                <input className='border-2 rounded-md border-black' required type="number" id="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))}></input>

                <button type="button" disabled={!amount? true : false} onClick={buyToken}
                  className='mt-4 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
                >Buy Token</button>
                <button type="button" disabled={!amount? true : false} onClick={sellToken}
                  className='mt-4 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
                >Sell Token</button>
              </form>
              <Vendor isWalletConnected={isWalletConnected}/>
            </>
          }
        </main>

        <Footer />
      </ Web3ModalProvider>
    </div>
  )
}

export default Home
