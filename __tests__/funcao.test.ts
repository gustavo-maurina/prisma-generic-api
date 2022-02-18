import app from "../config/server";
import request from "supertest";

const _url = "/funcao";
const _searchText = "teste";
const _urlWithParams = `${_url}?search=${_searchText}&p=1`;

describe(`GET ${_url}`, () => {
  test("sem parâmetros", async () => {
    const response = await request(app).get(_url);

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
