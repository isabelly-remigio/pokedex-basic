// jest.d.ts
import '@testing-library/jest-native';
import '@types/jest';

declare global {
  namespace Jest {
    interface Matchers<R> {
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toBeOnTheScreen(): R;
      toBeVisible(): R;
      toContainElement(element: React.ReactElement | null): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveProp(attr: string, value?: any): R;
      toHaveStyle(style: object): R;
    }
  }
}