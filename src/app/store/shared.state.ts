export interface SharedState {
  showLoader: boolean;
  errorMessage: string;
}

export const initialLoaderState: SharedState = {
  showLoader: false,
  errorMessage: '',
};
