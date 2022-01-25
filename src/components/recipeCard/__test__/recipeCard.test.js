import { render, screen, fireEvent } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom'
import RecipeCard from "../index";
import {BrowserRouter} from "react-router-dom";

const MockRecipeCard = () => {
    return(<RecipeCard
        id={"item.id"}
        title={"Recipe title"}
        description={"Recipe description"}
        cuisine={"CUISINE"}
        categories={"CATEGORY1,CATEGORY2"}
        difficulty={"HARD"}
        image={""}
        time={45}
        author={"author"}
        creationDate={"2022-01-04T11:08:26.831"}
    />)
}


test('Correctly renders title', () => {
    render(<MockRecipeCard/>)
    const elementTitle = screen.getByText("Recipe title");
    expect(elementTitle).toBeInTheDocument();
});

test('Correctly renders description', () => {
    render(<MockRecipeCard/>)
    const elementDesc = screen.getByText("Recipe description");
    expect(elementDesc).toBeInTheDocument();
});

test('Correctly renders duration (only minutes)', () => {
    render(<MockRecipeCard/>)
    const elementTime = screen.getByText("45min");
    expect(elementTime).toBeInTheDocument();
});

test('Correctly renders duration (only hour)', () => {
    render(<RecipeCard
        id={"item.id"}
        title={"Recipe title"}
        description={"Recipe description"}
        cuisine={"CUISINE"}
        categories={"CATEGORY1,CATEGORY2"}
        difficulty={"HARD"}
        image={""}
        time={60}
        author={"author"}
        creationDate={"2022-01-04T11:08:26.831"}
    />)
    const elementTime = screen.getByText("1h");
    expect(elementTime).toBeInTheDocument();
});

test('Correctly renders duration (hours + minutes)', () => {
    render(<RecipeCard
        id={"item.id"}
        title={"Recipe title"}
        description={"Recipe description"}
        cuisine={"CUISINE"}
        categories={"CATEGORY1,CATEGORY2"}
        difficulty={"HARD"}
        image={""}
        time={75}
        author={"author"}
        creationDate={"2022-01-04T11:08:26.831"}
    />)
    const elementTime = screen.getByText("1h 15min");
    expect(elementTime).toBeInTheDocument();
});

test('should move to another url on click', async () => {
    render(
        <BrowserRouter>
            <MockRecipeCard/>
        </BrowserRouter>
    )
    const element = screen.getByTestId("recipeCard");
    await fireEvent.click(element);
    expect(global.window.location.pathname).toBe('/recipe/item.id');
});

test('should format date correctly', async () => {
    render(<MockRecipeCard/>)
    const elementDate = screen.getByText("2022-01-04 11:08:26");
    expect(elementDate).toBeInTheDocument();
});

test('should format categories correctly', async () => {
    render(<MockRecipeCard/>)
    const elementDate = screen.getByText("CATEGORY1, CATEGORY2");
    expect(elementDate).toBeInTheDocument();
});
