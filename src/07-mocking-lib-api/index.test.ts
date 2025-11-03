import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => {
    return (...args: unknown[]) => {
      return fn(...args);
    };
  }),
}));

describe('throttledGetDataFromApi', () => {
  const mockData = { id: 1, title: 'test' };
  const relativePath = '/posts/1';
  let mockGet: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGet = jest.fn().mockResolvedValue({ data: mockData });

    const mockInstance = {
      get: mockGet,
    };

    mockedAxios.create.mockReturnValue(
      mockInstance as unknown as AxiosInstance,
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
