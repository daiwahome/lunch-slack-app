import { recommendShop, message } from '../lunch'
import { Shop } from '../type/shop'

describe('recommendShops', () => {
    const shops: Array<Shop> = Array.from(Array(10).keys()).map(i => {
        return {
            name: `shop${i}`,
            placeId: `place${i}`,
            count: 1,
        }
    })
    it('should return some shops', () => {
        const recommends = Array.from(Array(50).keys()).map(() => {
            return recommendShop(shops)
        })
        expect(recommends.length).toBe(50)
        expect([...new Set(recommends)].length).toBeGreaterThan(1)
        expect(recommends[0].name).toBeDefined()
    })
})

describe('message', () => {
    const shop: Shop = {
        name: "shop",
        placeId: "place",
        count: 1,
    }
    it('should return a recommend shop message', () => {
        expect(message(shop)).toBe(`今日のおすすめ
shop
https://www.google.com/maps/place/?q=place_id:place`)
    })
})
