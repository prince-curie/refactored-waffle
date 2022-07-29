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
import { ToastContainer, toast } from 'react-toastify'
import { Contract, ethers } from 'ethers'
import { abi, contractAddress } from '../constants'

const Dashboard: NextPage = () => {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
    const [walletAddress, setWalletAddress] = useState<string>("")
    const [owner, setOwnner] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>()
    const [product, setProduct] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [customer, setCustomer] = useState("")

    const web3ModalRef = useRef<iWeb3Modal | null>(null)

    const addVendor = async() => {
        try {
            if(web3ModalRef) {
              const instance = await web3ModalRef?.current?.connect()
        
              const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(instance);
              const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
              
              const contract: Contract = new Contract(contractAddress, abi, signer)
        
              let totalVendors = await contract.vendorsCount()
              totalVendors = totalVendors.toNumber()

              await contract.addVendors(
                totalVendors + 1, 
                businessName,
                product,
                ethers.utils.parseEther(price),
                description,
                customer
                )
            }
          } catch (error: any) {
            console.log(error)
            toast.error("Unable to add vendor at the moment.")
          }
    }

    const withdraw = async() => {
        try {
            if(web3ModalRef) {
              const instance = await web3ModalRef?.current?.connect()
        
              const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(instance);
              const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
              
              const contract: Contract = new Contract(contractAddress, abi, signer)
        
              await contract.withdraw()
            }
          } catch (error: any) {
            toast.error("Unable to withdraw at the moment.")
          }
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
                <ToastContainer/>
                <main className="flex w-full flex-1 flex-col px-20">
                    <Header 
                        isWalletConnected = {isWalletConnected} 
                        setIsWalletConnected = {setIsWalletConnected}
                        walletAddress = {walletAddress} 
                        setWalletAddress = {setWalletAddress}
                        owner = {owner} 
                        setOwnner = {setOwnner}
                    />
                    {(isWalletConnected && walletAddress === owner) && <button onClick={withdraw} className='mt-4 w-fit rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'>Withdraw</button>}
                    {isWalletConnected && 
                        <>
                            <form className='flex my-8 mx-auto flex-col border-l-black rounded-md w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12'>
                                <label htmlFor="Input Amount of Token" className='mt-4'>Business Name</label>
                                <input className='border-2 rounded-md border-black' required type="text" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)}></input>
                                <label htmlFor="Input Product" className='mt-4'>Product</label>
                                <input className='border-2 rounded-md border-black' required type="text" id="product" value={product} onChange={(e) => setProduct(e.target.value)}></input>
                                <label htmlFor="Input Price" className='mt-4'>Price</label>
                                <input className='border-2 rounded-md border-black' required type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                <label htmlFor="Input Description" className='mt-4'>Description</label>
                                <input className='border-2 rounded-md border-black' required type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                                <label htmlFor="Input Customer" className='mt-4'>Customer Address</label>
                                <input className='border-2 rounded-md border-black' required type="text" id="description" value={customer} onChange={(e) => setCustomer(e.target.value)}></input>

                                <button type="button" onClick={addVendor}
                                    className='mt-4 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
                                >Add Vendor</button>
                            </form>
                            <Vendor isWalletConnected={isWalletConnected}/>
                        </>
                    }
                </main>
                <Footer/>
            </Web3ModalProvider>
        </div>
    )
}

export default Dashboard