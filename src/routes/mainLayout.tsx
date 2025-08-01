import { Outlet } from "react-router";
// import { Outlet, useLocation, Navigate } from "react-router";
// import { useState, useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useLocalStorage } from "../hooks/localStorage";
import ShareProvider from "../components/shareContext";
import { Share } from "../types/share";
// import { checkAuth } from "../utils/auth";
// import { useUserInfo } from "../hooks/useUserInfo";
import StandardLayoutTemplate from "../components/standardLayoutTemplate";
// import { useEffect } from "react";

// const queryClient = new QueryClient();
const initialShare: Share = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    exp: 0,
  },
  posts: { posts: [], after: 0, hasMore: true },
  catalogues: { catalogues: [], after: 0, hasMore: true, searchTerm: "" },
};

export default function MainLayout() {
  // const userInfo = useUserInfo();
  // const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  // const location = useLocation();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     setLoading(true);
  //     const auth = await checkAuth();
  //     setAuthenticated(auth);
  //     setLoading(false);
  //   };
  //   verifyAuth();
  // }, []);

  // if (loading)
  //   return <StandardLayoutTemplate>Loading...</StandardLayoutTemplate>;
  // if (authenticated === false)
  //   return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    // <QueryClientProvider client={queryClient}>
    // <ShareProvider share={userInfo as Share}>
    <ShareProvider share={initialShare}>
      <StandardLayoutTemplate>
        <Outlet />
      </StandardLayoutTemplate>
    </ShareProvider>
    // </QueryClientProvider>
  );
}
