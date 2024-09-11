import Main from "./pages/MainPage.vue";
import NotFound from "./pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/create-recipe",
    name: "create-recipe",
    component: () => import("./pages/CreateNewRecipe"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/Favorites"),
  },
  {
    path: "/private",
    name: "private",
    component: () => import("./pages/Private"),
  },
  {
    path: "/recipe/:recipeId",
    name: "RecipeFullView",
    component: () => import("./pages/FamilyRecipeViewPage")
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/Family"),
  },
  {
    path: "   ",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
