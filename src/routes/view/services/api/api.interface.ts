export interface IPolygonGetMaticPrice {
    status: string
    message: string
    result: {
        maticbtc: string
        maticbtc_timestamp: string
        maticusd: string
        maticusd_timestamp: string
    }
}

export interface IQuoteMaticToETH {
    price: string
    gas: string
    gasPrice: string
}