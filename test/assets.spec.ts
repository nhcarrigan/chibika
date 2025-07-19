/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { describe, it, expect } from "vitest";
import { anime } from "../src/assets/anime.js";
import { cats } from "../src/assets/cats.js";
import { emoji } from "../src/assets/emoji.js";

const uniqueAnime = new Set(anime.map((art) => {
  return art.text;
}));
const uniqueCats = new Set(cats.map((art) => {
  return art.text;
}));
const uniqueEmoji = new Set(emoji.map((art) => {
  return art.text;
}));

describe("assets", () => {
  it("anime should be unique", () => {
    expect.assertions(1);
    expect(uniqueAnime.size, "anime has duplicate art").toBe(anime.length);
  });

  it("cats should be unique", () => {
    expect.assertions(1);
    expect(uniqueCats.size, "cats has duplicate art").toBe(cats.length);
  });

  it("emoji should be unique", () => {
    expect.assertions(1);
    expect(uniqueEmoji.size, "emoji has duplicate art").toBe(emoji.length);
  });
});
