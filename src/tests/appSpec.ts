import app from '../app'
import supertest from 'supertest'

const request = supertest(app)


describe('Testing image endpoint: ', ()=>{
    it('testing send status for image enpoint', async () => {
        const result = await request.get('/images')
        expect(result.status).toBe(200)
    })
})

