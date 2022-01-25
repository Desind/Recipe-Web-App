import {act, fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import Homepage from "../index";

const MockHomepage = () => {
    return(
        <BrowserRouter>
            <Homepage/>
        </BrowserRouter>
    )
}

test('recipe cards should render', async () => {
    render(<MockHomepage/>);
    await act(async () => {
        const recipeCards = await screen.findAllByTestId("recipeCard");
        expect(recipeCards.length).toBeGreaterThan(0);
    })
});

test('allergen list should render', async () => {
    render(<MockHomepage/>);
    await act(async () => {
        const allergenAccordion = await screen.findByText("Allergens");
        fireEvent.click(allergenAccordion);
        const allergenCheckboxes = await screen.findAllByTestId("allergenCheckbox");
        expect(allergenAccordion).toBeInTheDocument();
        expect(allergenCheckboxes.length).toBeGreaterThan(0);
    })
});

test('allergen list should render and allergen should be clickable', async () => {
    render(<MockHomepage/>);
    await act(async () => {
        const allergenAccordion = await screen.findByText("Allergens");
        fireEvent.click(allergenAccordion);
        const allergenCheckboxes = await screen.findAllByTestId("allergenCheckbox");
        fireEvent.click(allergenCheckboxes[0]);
        expect(allergenCheckboxes[0]).toHaveClass("wrapperDisabled");
    })
});

test('searching with ingredients accordion should render', async () => {
    render(<MockHomepage/>);
    await act(() => {
        const searchAccordion = screen.getByText("Search using ingredients");
        expect(searchAccordion).toBeInTheDocument();
    })
});

test('searching with ingredients accordion should open and close', async () => {
    render(<MockHomepage/>);
    await act(() => {
        const searchAccordion = screen.getByText("Search using ingredients");
        fireEvent.click(searchAccordion);
        const searchButton = screen.getByText("Ingredients search");
        expect(searchButton).toBeInTheDocument();
        fireEvent.click(searchAccordion);
        expect(searchButton).not.toBeVisible();
    })
});

test('should render ingredient input list', async () => {
    render(<MockHomepage/>);
    await act(() => {
        const searchAccordion = screen.getByText("Search using ingredients");
        fireEvent.click(searchAccordion);
        const ingredients = screen.getAllByTestId("ingredient");
        expect(ingredients.length).toBe(1);
    })
});

test('should be able to add new ingredient input', async () => {
    render(<MockHomepage/>);
    await act(async () => {
        const searchAccordion = screen.getByText("Search using ingredients");
        fireEvent.click(searchAccordion);
        const addNewInputButton = screen.getByTestId("addNewProduct");
        await fireEvent.click(addNewInputButton);
        const ingredients = await screen.findAllByTestId("ingredient");
        expect(ingredients.length).toBe(2);
    })
});


