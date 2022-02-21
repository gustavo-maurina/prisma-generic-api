import request from "supertest";
import app from "../../../config/server";

/**
 * Faz request com método GET e testa casos genéricos de resposta
 * @param url Url a ser feita request, no seguinte formato: "/usuario".
 */
export const testGet = (url: string) => {
  const _searchText = "teste";
  const _urlWithParams = `${url}?search=${_searchText}&p=1`;

  describe(`GET ${url}`, () => {
    test("sem parâmetros", async () => {
      const response = await request(app).get(url);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test("com parâmetros", async () => {
      const response = await request(app).get(_urlWithParams);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data).toBeDefined();
      expect(response.body.totalItems).toBeDefined();
    });
  });
};
