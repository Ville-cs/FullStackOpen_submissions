import { render, screen } from "@testing-library/react-native";
import Text from "../../components/Text";

describe("Text", () => {
  it("renders its children", async () => {
    await render(<Text>test text</Text>);
    expect(screen.getByText("test text")).toBeTruthy();
  });
});
