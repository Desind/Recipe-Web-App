import {fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import HeaderNavigationButton from "../index";


test('has correct text inside', () => {
    render(
        <BrowserRouter>
            <HeaderNavigationButton label={"Button text"} link={"/test-url"}/>
        </BrowserRouter>
    )
    const buttonElement = screen.getByText("Button text");
    expect(buttonElement).toBeInTheDocument();
});

test('changes url on click correctly', async () => {
    render(
        <BrowserRouter>
            <HeaderNavigationButton label={"Button text"} link={"/test-url"}/>
        </BrowserRouter>
    )
    const buttonElement = screen.getByText("Button text");
    await fireEvent.click(buttonElement);
    expect(global.window.location.pathname).toBe('/test-url');
});
