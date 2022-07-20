import { createContext } from "react";
import iWeb3Modal from "../interfaces/iWeb3Modal";

const web3ModalContext = createContext<{current: iWeb3Modal} | null>(null)

export const Web3ModalProvider:any = web3ModalContext.Provider;

export default web3ModalContext;