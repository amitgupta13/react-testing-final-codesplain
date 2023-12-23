import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];

      return {
        items: [
          { id: 1, full_name: `${language}_1` },
          { id: 2, full_name: `${language}_2` },
        ],
      };
    },
  },
]);

test("render two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  const languages = [
    "typescript",
    "javascript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (let language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_1`);
    expect(links[1]).toHaveTextContent(`${language}_2`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_1`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_2`);
  }

  // loop over each language
  // For each language, make sure we see two links
  // Assert that the links have appropriate full_name
});

const pause = new Promise((resolve) => setTimeout(resolve, 100));
