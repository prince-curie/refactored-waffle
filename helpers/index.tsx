export const truncateWalletAddress = (str:string):string => {
    const length:number = str.length;

    return str.substr(0, 5) + "......." + str.substr(length - 5, length);
};