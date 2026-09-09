import { useReducer } from 'react';

type State<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type Action<T> = { type: 'LOADING' } | { type: 'SUCCESS'; payload: T } | { type: 'ERROR'; payload: string };

function dataReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useDataReducer<T>(initialData?: T) {
  const [state, dispatch] = useReducer(dataReducer<T>, {
    data: initialData ?? null,
    loading: false,
    error: null
  });
  return { state, dispatch };
}
