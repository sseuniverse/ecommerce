import { useNavigate } from "react-router-dom";

interface UseGoBackData {
  goBack: () => void;
  refresh: () => void;
  navigator: (path: string) => void;
}

export function useRoutes(): UseGoBackData {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const navigator = (path: string) => navigate(path);
  const refresh = () => window.location.reload();

  return { goBack, refresh, navigator };
}
