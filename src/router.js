import Vue from "vue";
import Router from "vue-router";
import RecipeList from "./views/RecipeList.vue";
import RecipeSingle from "./components/RecipeSingle/RecipeSingle.vue";
Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "recipe-list",
			component: RecipeList
		},
		{
			path: "/recipe/:id",
			name: "recipe",
			component: RecipeSingle,
			props: true
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "./views/About.vue")
		}
	]
});
