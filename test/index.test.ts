/* eslint-disable @typescript-eslint/no-explicit-any */
import didauth from "../src";

describe("DIDAuth", () => {
  let sut: Function;
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTQyNjU3NjEsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiYWRtaW5PZiI6ImRpZDp3ZWI6bm90YWJlbmUuaWQifX0sInN1YiI6ImRpZDpldGhyOjB4MWJkYzk0ZGQwZjZmN2IzNTk5YjlhYzcwZDMyYzRjNDM1YmExNTNjNiIsImlzcyI6ImRpZDpldGhyOjB4MWJkYzk0ZGQwZjZmN2IzNTk5YjlhYzcwZDMyYzRjNDM1YmExNTNjNiJ9.yePVj4CyzQURN5x8i0EoIjfIy8K2oTgNM2Pt3opRL1otvdvCa2nbCtk7NuIt_WiCmJabZlNuv_MoL3vSNO7EygA";

  beforeAll(() => {
    sut = didauth({
      resolverOptions: {
        infuraProjectId: "5ffc47f65c4042ce847ef66a3fa70d4c",
      },
    });
  });

  it("should work with no Authorization header", async () => {
    const req: any = { headers: {} };
    const next = (err: Error): void => {
      expect(err).toBeUndefined();
      expect(req.didauth).toBeUndefined();
    };
    await sut(req, {}, next);
  });

  it("should work with token", async done => {
    const req: any = { headers: { authorization: "Bearer " + token } };
    const next = (err: Error): void => {
      expect(err).toBeUndefined();
      expect(req.didauth).toEqual({
        issuer: "did:ethr:0x1bdc94dd0f6f7b3599b9ac70d32c4c435ba153c6",
        payload: {
          adminOf: "did:web:notabene.id",
        },
      });
      done();
    };
    await sut(req, {}, next);
    done();
  });
});
