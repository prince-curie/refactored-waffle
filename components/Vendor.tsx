import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface IVendor {
    isWalletConnected: boolean
}

const Vendor = ({isWalletConnected}: IVendor) => {
    const [vendors, setVendors] = useState<IEachVendor[]>([])

    const fetchVendor = () => {

    }

    useEffect(() => {
        if(isWalletConnected) {
            fetchVendor()
        }
    }, [isWalletConnected])

    return (
    <>
        <ToastContainer />

        <table className="table-auto">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Business Name</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Customer</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                { vendors.length > 0 && 
                    vendors.map(
                        (
                            {
                                id, businessName, product, price, description, customer
                            }, index
                        ) => <EachVendor
                            id={index} businessName={businessName} 
                            product={product} price={price} description={description}
                            customer={customer} 
                        />
                    )
                }
            </tbody>
        </table>
    </>
    )
}

interface IEachVendor {
    id: number,
    businessName: string,
    product: string,
    price: string,
    description: string,
    customer: string
}

const EachVendor = ({
    id, businessName, product, price, description, customer
}: IEachVendor) => {
    const purchaseSubscription = (price:string, customer:string) => {
        
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{businessName}</td>
            <td>{product}</td>
            <td>{price}</td>
            <td>{description}</td>
            <td>{customer}</td>
            <td><button type="button" onClick={() => purchaseSubscription(price, customer)}
                className='mt-4 rounded-md ring-2 ring-inset-1 ring-sky-600 px-2 bg-sky-100 hover:bg-sky-600 hover:text-white'
            >
                Purchase
            </button></td>
        </tr>
    )
}

export default Vendor;