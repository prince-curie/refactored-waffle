export default interface iWeb3Modal {
  connect: () => Promise<any>, 
  clearCachedProvider: () => void
}