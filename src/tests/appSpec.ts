import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing endpoints: ',()=>{

  describe('Testing "/" endpoint: ', () => {
    it('"/" - status code should be 200: ', async () => {
      const result = await request.get('/');
      expect(result.status).toBe(200);
    });
  });

  describe('Testing "/api/images" endpoint: ', () => {
    it('"/api/images" - status code should be 422 ', async () => {
      const result = await request.get('/api/images');
      expect(result.status).toBe(422);
    });
  });

  describe('Testing "/api/images" endpoint: ', () => {
    it('"/api/images" - text should be "You need to provide missing query parameters: filename, width, height" ', async () => {
      const result = await request.get('/api/images');
      expect(result.text).toEqual("You need to provide missing query parameters: filename, width, height");
      expect(result.status).toBe(422)
    });
  });

  describe('Testing "/api/images?filename=fjord&width=200&height=200" endpoint: ', () => {
    it('"/api/images?filename=fjord&width=200&height=200" - status code should be 200" ', async () => {
      const result = await request.get('/api/images?filename=fjord&width=200&height=200');
      expect(result.status).toBe(200)
    });
  });

  describe('Testing "/api/images?filename=wrong-name&width=200&height=200" endpoint: ', () => {
    it('"/api/images?filename=wrong-name&width=200&height=200" - text should be "Filename "wrong-name" doesn t exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica." ', async () => {
      const result = await request.get('/api/images?filename=wrong-name&width=200&height=200');
      expect(result.text).toEqual(`Filename "wrong-name" doesn't exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.`);
      expect(result.status).toBe(422)
    });
  });

  describe('Testing "/api/images?filename=fjord&width=200&height=-200" endpoint: ', () => {
    it('"/api/images?filename=fjord&width=200&height=-200" - text should be "Invalid request: height has invalid parameter value. Please use positive integer instead." ', async () => {
      const result = await request.get('/api/images?filename=fjord&width=200&height=-200');
      expect(result.text).toEqual(`Invalid request: height has invalid parameter value. Please use positive integer instead.`);
      expect(result.status).toBe(422)
    });
  });

  describe('Testing "/api/images?filename=fjord&width=&height=" endpoint: ', () => {
    it('"/api/images?filename=fjord&width=&height=" - text should be "You need to provide missing query parameters: width, height." ', async () => {
      const result = await request.get('/api/images?filename=fjord&width=&height=');
      expect(result.text).toEqual(`You need to provide missing query parameters: width, height`);
      expect(result.status).toBe(422)
    });
  });


  describe('Testing "/something-wrong: ', () => {
    it('"/something-wrong" - status code should be 404" ', async () => {
      const result = await request.get('/something-wrong');
      expect(result.status).toBe(404);
    });
  });

})
