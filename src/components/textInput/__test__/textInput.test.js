import { render, screen, fireEvent } from '@testing-library/react';
import React from "react";
import TextInput from "../index";
import '@testing-library/jest-dom'


const mockedValueChange = jest.fn();

test('element renders correctly approve icon', () => {
    render(<TextInput label={""} type={"text"} valueChange={mockedValueChange} icon={"approve"}/>)
    const inputIcon = screen.getByAltText("Approve");
    expect(inputIcon).toBeInTheDocument();
});

test('element renders correctly deny icon', () => {
    render(<TextInput label={""} type={"text"} valueChange={mockedValueChange} icon={"deny"}/>)
    const inputIcon = screen.getByAltText("Deny");
    expect(inputIcon).toBeInTheDocument();
});

test('element has correct label', () => {
    render(<TextInput label={"Input"} type={"text"} valueChange={mockedValueChange}/>)
    const labelElement = screen.getByTestId("label");
    expect(labelElement).toHaveTextContent("Input");
});

test('should be able to type into input', () => {
    render(<TextInput label={"Input"} type={"text"} valueChange={mockedValueChange}/>)
    const inputElement = screen.getByLabelText("Input");
    fireEvent.change(inputElement, {target: {value: "new input value"}})
    expect(inputElement.value).toBe("new input value");
});
