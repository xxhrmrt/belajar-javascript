import {
  createManyTestSongs,
  createTestSong,
  createTestUser,
  getTestSong,
  removeAllTestSongs,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/songs", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestSongs();
    await removeTestUser();
  });

  it("should can create new song", async () => {
    const result = await supertest(web)
      .post("/api/songs")
      .set("Authorization", "test")
      .send({
        title: "test",
        singer: "test",
        album: "test",
        year: "2000",
        label: "test",
        songwriter: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("test");
    expect(result.body.data.singer).toBe("test");
    expect(result.body.data.album).toBe("test");
    expect(result.body.data.year).toBe("2000");
    expect(result.body.data.label).toBe("test");
    expect(result.body.data.songwriter).toBe("test");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/songs")
      .set("Authorization", "test")
      .send({
        title: "",
        singer: "",
        album: "",
        year: "",
        label: "",
        songwriter: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/songs/:songId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestSong();
  });

  afterEach(async () => {
    await removeAllTestSongs();
    await removeTestUser();
  });

  it("should can get song", async () => {
    const testSong = await getTestSong();

    const result = await supertest(web)
      .get("/api/songs/" + testSong.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testSong.id);
    expect(result.body.data.title).toBe(testSong.title);
    expect(result.body.data.singer).toBe(testSong.singer);
    expect(result.body.data.album).toBe(testSong.album);
    expect(result.body.data.year).toBe(testSong.year);
    expect(result.body.data.label).toBe(testSong.label);
    expect(result.body.data.songwriter).toBe(testSong.songwriter);
  });

  it("should return 404 if song id is not found", async () => {
    const testSong = await getTestSong();

    const result = await supertest(web)
      .get("/api/songs/" + (testSong.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/songs/:songId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestSong();
  });

  afterEach(async () => {
    await removeAllTestSongs();
    await removeTestUser();
  });

  it("should can update existing songs", async () => {
    const testSong = await getTestSong();

    const result = await supertest(web)
      .put("/api/songs/" + testSong.id)
      .set("Authorization", "test")
      .send({
        title: "Love Epiphany",
        singer: "Reality Club",
        album: "Reality Club Present...",
        year: "2023",
        label: "Dominion Records",
        songwriter: "Faiz Novascotia Saripudin",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testSong.id);
    expect(result.body.data.title).toBe("Love Ephipany");
    expect(result.body.data.singer).toBe("Reality Club");
    expect(result.body.data.album).toBe("Reality Club Present...");
    expect(result.body.data.year).toBe("2023");
    expect(result.body.data.label).toBe("Dominion Records");
    expect(result.body.data.songwriter).toBe("Faiz Novascotia Saripudin");
  });

  it("should reject if request is invalid", async () => {
    const testSong = await getTestSong();

    const result = await supertest(web)
      .put("/api/songs/" + testSong.id)
      .set("Authorization", "test")
      .send({
        title: "",
        singer: "",
        album: "",
        year: "",
        label: "",
        songwriter: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if songs is not found", async () => {
    const testSong = await getTestSong();

    const result = await supertest(web)
      .put("/api/songs/" + (testSong.id + 1))
      .set("Authorization", "test")
      .send({
        title: "Love Epiphany",
        singer: "Reality Club",
        album: "Reality Club Present...",
        year: "2023",
        label: "Dominion Records",
        songwriter: "Faiz Novascotia Saripudin",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/songs/:songsId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestSong();
  });

  afterEach(async () => {
    await removeAllTestSongs();
    await removeTestUser();
  });

  it("should can delete song", async () => {
    let testSong = await getTestSong();
    const result = await supertest(web)
      .delete("/api/songs/" + testSong.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testSong = await getTestSong();
    expect(testSong).toBeNull();
  });

  it("should reject if song is not found", async () => {
    let testSong = await getTestSong();
    const result = await supertest(web)
      .delete("/api/songs/" + (testSong.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/songs", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestSongs();
  });

  afterEach(async () => {
    await removeAllTestSongs();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/songs")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/songs")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using title", async () => {
    const result = await supertest(web)
      .get("/api/songs")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using singer", async () => {
    const result = await supertest(web)
      .get("/api/songs")
      .query({
        singer: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using year", async () => {
    const result = await supertest(web)
      .get("/api/songs")
      .query({
        year: "2001",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
