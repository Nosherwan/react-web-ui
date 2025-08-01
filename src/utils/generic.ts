import { FieldErrors } from "react-hook-form";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// // Get all unique error messages for the error summary
export const errorMessages = (errors: FieldErrors) =>
  Object.values(errors)
    .map((err) => err?.message as string | undefined)
    .filter((message): message is string => Boolean(message));

export function getCookie(name: string) {
  const cookieString = document.cookie;
  if (!cookieString) return null;

  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(name + "=")) {
      const value = decodeURIComponent(
        trimmedCookie.substring(name.length + 1),
      );
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON from cookie:", error);
        return value; // Return unparsed value as fallback
      }
    }
  }
  return null;
}

export function getDateFromUnixTime(stamp: number) {
  return new Date(stamp * 1000);
}

export const colorOptions = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-slate-100", text: "text-slate-700" },
  { bg: "bg-stone-100", text: "text-stone-700" },
  { bg: "bg-neutral-100", text: "text-neutral-700" },
];
