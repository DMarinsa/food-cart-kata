export interface ICounterDomain {
  value: number;
  loading: boolean;
  error: boolean;
}

export const initialState: ICounterDomain = {
  value: 1,
  loading: false,
  error: false
};
