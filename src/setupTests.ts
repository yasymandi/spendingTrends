// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
import '@testing-library/jest-dom/extend-expect'; 

// Mock CSS Modules
jest.mock('./FileUploadComponent/FileUploadComponent.css', () => ({}));
jest.mock('./FileUploadComponent.css', () => ({}));
jest.mock('./App.css', () => ({}));
