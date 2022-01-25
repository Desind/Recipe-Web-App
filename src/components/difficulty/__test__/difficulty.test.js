import { render, screen } from '@testing-library/react';
import React from "react";
import Difficulty from "../index";

test('difficulty without props renders 3/5 difficulty', () => {
    render(<Difficulty />);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(3);
    expect(difficultyElements.length).toBe(5);
});
test('difficulty correctly renders BEGGINER', () => {
    render(<Difficulty difficulty={"BEGGINER"}/>);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(1);
    expect(difficultyElements.length).toBe(5);
});
test('difficulty correctly renders EASY', () => {
    render(<Difficulty difficulty={"EASY"}/>);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(2);
    expect(difficultyElements.length).toBe(5);
});
test('difficulty correctly renders AVERAGE', () => {
    render(<Difficulty difficulty={"AVERAGE"}/>);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(3);
    expect(difficultyElements.length).toBe(5);
});
test('difficulty correctly renders ADVANCED', () => {
    render(<Difficulty difficulty={"ADVANCED"}/>);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(4);
    expect(difficultyElements.length).toBe(5);
});
test('difficulty correctly renders HARD', () => {
    render(<Difficulty difficulty={"HARD"}/>);
    const activeDifficultyElements = screen.getAllByAltText("difficultyIconActive");
    const difficultyElements = screen.getAllByRole("img");
    expect(activeDifficultyElements.length).toBe(5);
    expect(difficultyElements.length).toBe(5);
});

