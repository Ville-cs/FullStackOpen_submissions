import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { NativeRouter } from "react-router-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      await render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>,
      );
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);
      repositoryItems.forEach((item, index) => {
        expectRepositoryToRender(item, repositories.edges[index].node);
      });
    });
  });
});

const expectRepositoryToRender = (repositoryItem, repository) => {
  expect(within(repositoryItem).getByText(repository.fullName)).toBeDefined();

  expect(
    within(repositoryItem).getByText(repository.description),
  ).toBeDefined();

  expect(within(repositoryItem).getByText(repository.language)).toBeDefined();

  expect(
    within(repositoryItem).getByText(formatThousands(repository.forksCount)),
  ).toBeDefined();

  expect(
    within(repositoryItem).getByText(
      formatThousands(repository.stargazersCount),
    ),
  ).toBeDefined();

  expect(
    within(repositoryItem).getByText(String(repository.ratingAverage)),
  ).toBeDefined();

  expect(
    within(repositoryItem).getByText(String(repository.reviewCount)),
  ).toBeDefined();
};

const formatThousands = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
