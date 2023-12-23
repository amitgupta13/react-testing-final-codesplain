import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
// jest.mock("../tree/FileIcon", () => () => "File Icon Component");

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "javascript",
    description: "Js lib",
    owner: { login: "facebook" },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to github home page", async () => {
  const { repository } = renderComponent();

  //   await act(async () => {
  //     await pause();
  //   });

  await screen.findByRole("img", { name: "javascript" });

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

test("shows a fileicon with the approriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "javascript" });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "javascript" });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
