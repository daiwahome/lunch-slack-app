import * as csv from 'csv-parse/lib/sync'
import { firebase } from './firebase'
import { Shop } from './type/shop'

const bucket = firebase.storage().bucket()
const path = 'shops.csv'

async function getShops(): Promise<Array<Shop>> {
    const [file] = await bucket.file(path).download()
    return csv(file.toString()).slice(1).map((line: Array<string>) => {
        const [ x, y, z ] = line
        return {
            name: x,
            placeId: y,
            count: parseInt(z),
        }
    })
}

export const recommendShop = (shops: Array<Shop>): Shop => {
    const sum = shops.map(shop => shop.count)
        .reduce((prev, curr) => prev + curr)
    const select = Math.round(Math.random() * sum)

    let now = 0
    for (const shop of shops) {
        now += shop.count
        if (now > select) {
            return shop
        }
    }

    return shops[0]
}

export const message = (shop: Shop): string => {
    return `今日のおすすめ
${shop.name}
https://www.google.com/maps/place/?q=place_id:${shop.placeId}`
}

export const recommend = async (): Promise<string> => {
    const shops = await getShops()
    return message(recommendShop(shops))
}
