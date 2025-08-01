// import { Share } from "../types/share";
// import { useEffect, useRef, useState } from "react";

// function getCookie(name: string) {
//   const cookieString = document.cookie;
//   if (!cookieString) return null;

//   const cookies = cookieString.split(";");

//   for (const cookie of cookies) {
//     const trimmedCookie = cookie.trim();
//     if (trimmedCookie.startsWith(name + "=")) {
//       const value = decodeURIComponent(
//         trimmedCookie.substring(name.length + 1),
//       );
//       try {
//         return JSON.parse(value);
//       } catch (error) {
//         console.error("Error parsing JSON from cookie:", error);
//         return value; // Return unparsed value as fallback
//       }
//     }
//   }
//   return null;
// }

// export const useUserInfo = () => {
//   const timeOutID = useRef<number | undefined>();
//   const [userInfo, setUserInfo] = useState<Share>({
//     profile: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       roles: [],
//       exp: 0,
//     },
//   });

//   const readCookie = () => {
//     const userInfo = getCookie("user_info");
//     console.log("♻️ User Info:", userInfo);
//     if (userInfo) {
//       setUserInfo({ profile: userInfo });
//     }
//   };

//   useEffect(() => {
//     readCookie();
//     timeOutID.current = setInterval(() => readCookie(), 3000);

//     return () => {
//       if (timeOutID.current !== undefined) clearInterval(timeOutID.current);
//     };
//   }, []);
//   return userInfo;
// };
