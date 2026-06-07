/** Copy derived from app naming, routes, and domain logic (proposal → evaluation → committee). */

export const PRODUCT_NAME = "Evaluate It Easily";
export const PRODUCT_SUBTITLE =
  "Graduation-project evaluation—from team setup to similarity checks and committee decisions—in one workspace.";

export const ROUTES = {
  auth: "/auth",
  dashboard: "/dashboard",
  proposal: "/dashboard/proposal",
  similarity: "/dashboard/similarity",
  admin: "/admin",
};

export const STATS = [
  { label: "Student workspace", hint: "Groups, invitations, uploads" },
  { label: "PDF proposals", hint: "Title, abstract & presigned uploads" },
  { label: "Status pipeline", hint: "Pending → review → outcomes" },
];
