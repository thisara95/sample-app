import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "./index";
import { COLORS } from "@/styles/colors";

describe("CustomButton Component", () => {
  it("renders label correctly", () => {
    const { getByText } = render(
      <CustomButton label="Press Me" onPress={() => {}} />
    );
    expect(getByText("Press Me")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CustomButton label="Press" onPress={onPressMock} />
    );
    fireEvent.press(getByTestId("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CustomButton label="Disabled" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByTestId("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
