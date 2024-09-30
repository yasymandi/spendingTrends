import { render, fireEvent, screen } from '@testing-library/react';
import FileUploadComponent from './FileUploadComponent';

// Mock file creation function
const createFile = (name: string, size: number, type: string) => {
  const file = new File(['a'.repeat(size)], name, { type });
  return file;
};

describe('FileUploadComponent', () => {
  test('uploads and displays selected files', () => {
    // Render the component
    render(<FileUploadComponent />);

    const file1 = createFile('file1.csv', 1000, 'csv');
    const file2 = createFile('file2.pdf', 2000, 'pdf');
    const fileInput = screen.getByLabelText(/select files/i);

    fireEvent.change(fileInput, {
      target: { files: [file1, file2] },
    });

    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    expect(screen.getByText('file2.pdf')).toBeInTheDocument();
  });

  test('does not add duplicate files', () => {
    render(<FileUploadComponent />);

    const file1 = createFile('file1.csv', 1000, 'csv');
    const fileInput = screen.getByLabelText(/select files/i);

    fireEvent.change(fileInput, {
      target: { files: [file1] },
    });

    fireEvent.change(fileInput, {
      target: { files: [file1] },
    });

    // Verify that only one instance of the file is displayed
    expect(screen.queryAllByText('file1.csv')).toHaveLength(1);
  });

  test('deletes files from selected uploads', () => {
    render(<FileUploadComponent />);

    const file1 = createFile('file1.csv', 1000, 'csv');
    const file2 = createFile('file2.pdf', 200, 'pdf');
    const fileInput = screen.getByLabelText(/select files/i);

    fireEvent.change(fileInput, {
      target: { files: [file1, file2] },
    });

    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    expect(screen.getByText('file2.pdf')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    expect(screen.queryByText('file2.pdf')).not.toBeInTheDocument();  
  });
});
