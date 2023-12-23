import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("it displays info abt the repos", () => {
  const repository = {
    language: "javascript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    expect(screen.getByText(new RegExp(repository[key]))).toBeInTheDocument();
  }
});
